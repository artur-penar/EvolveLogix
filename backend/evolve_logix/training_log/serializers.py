from rest_framework import serializers
from .models import TrainingLog, TrainingSession, ExerciseInSession, Set, Exercise, MuscleGroup


class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ['name', 'description']


class ExerciseSerializer(serializers.ModelSerializer):
    muscle_group = MuscleGroupSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ['name', 'description', 'muscle_group']


class ExerciseNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['name']


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ['set_number', 'weight', 'repetitions', 'comment']


class ExerciseInSessionSerializer(serializers.ModelSerializer):
    exercise = serializers.SlugRelatedField(
        slug_field='name', queryset=Exercise.objects.all())
    muscle_group = serializers.SerializerMethodField()
    sets = SetSerializer(many=True)

    class Meta:
        model = ExerciseInSession
        fields = ['exercise', 'muscle_group', 'order', 'comment', 'sets']

    def get_muscle_group(self, obj):
        return MuscleGroupSerializer(obj.exercise.muscle_group, many=True).data

    def create(self, validated_data):
        sets_data = validated_data.pop('sets', [])  # Add default value for pop
        exercise_in_session = ExerciseInSession.objects.create(
            **validated_data)
        for set_data in sets_data:
            Set.objects.create(
                exercise_in_session=exercise_in_session, **set_data)
        return exercise_in_session

    def get_sets(self, obj):
        sets = Set.objects.filter(exercise_in_session=obj)
        return SetSerializer(sets, many=True).data


class TrainingSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseInSessionSerializer(many=True)
    training_log = serializers.PrimaryKeyRelatedField(
        queryset=TrainingLog.objects.all(), required=False)

    class Meta:
        model = TrainingSession
        fields = '__all__'

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises', )
        training_log_data = validated_data.pop('training_log', None)
        training_session = TrainingSession.objects.create(
            training_log=training_log_data, **validated_data)
        for exercise_data in exercises_data:
            sets_data = exercise_data.pop('sets', [])
            exercise_in_session = ExerciseInSession.objects.create(
                training_session=training_session, **exercise_data)
            for set_data in sets_data:
                Set.objects.create(
                    exercise_in_session=exercise_in_session, **set_data)
        return training_session

    def update(self, instance, validated_data):
        print("Training Session serializer!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
        exercises_data = validated_data.pop('exercises', [])
        instance = super().update(instance, validated_data)

        instance.exercises.all().delete()
        for exercise_data in exercises_data:
            sets_data = exercise_data.pop('sets', [])
            exercise_in_session = ExerciseInSession.objects.create(
                training_session=instance, **exercise_data)
            for set_data in sets_data:
                Set.objects.create(
                    exercise_in_session=exercise_in_session, **set_data)

        return instance


class TrainingLogSerializer(serializers.ModelSerializer):
    training_sessions = TrainingSessionSerializer(many=True, required=False)

    class Meta:
        model = TrainingLog
        fields = ['id', 'name', 'training_sessions']

    def create(self, validated_data):
        print("Create training log serializer !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ")
        """
        Create a new TrainingLog instance with the given validated data.

        Args:
            validated_data (dict): The validated data to create the TrainingLog instance with.

        Returns:
            The created TrainingLog instance.
        """
        # Get the training sessions data if it exists, otherwise use an empty list
        training_sessions_data = validated_data.pop('training_sessions', [])
        # Get or create a TrainingLog instance with the remaining validated data
        training_log, created = TrainingLog.objects.get_or_create(
            name=validated_data['name'], user=validated_data['user'], defaults=validated_data)
        # Loop through the training sessions data and create a TrainingSession instance for each one
        for training_session_data in training_sessions_data:
            # Get the exercises data if it exists, otherwise use an empty list
            exercises_data = training_session_data.pop('exercises', [])
            # Create a TrainingSession instance with the remaining training session data
            training_session = TrainingSession.objects.create(
                training_log=training_log, **training_session_data)
            # Loop through the exercises data and create an ExerciseInSession instance for each one
            for exercise_data in exercises_data:
                # Get the sets data if it exists, otherwise use an empty list
                sets_data = exercise_data.pop('sets', [])
                # Create an ExerciseInSession instance with the remaining exercise data
                exercise_in_session = ExerciseInSession.objects.create(
                    training_session=training_session, **exercise_data)
                # Loop through the sets data and create a Set instance for each one
                for set_data in sets_data:
                    Set.objects.create(
                        exercise_in_session=exercise_in_session, **set_data)
        # Return the created TrainingLog instance
        return training_log
