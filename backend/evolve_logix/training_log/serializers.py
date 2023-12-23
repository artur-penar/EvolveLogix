from rest_framework import serializers
from .models import Exercise, TrainingLog

from rest_framework import serializers
from .models import TrainingLog, TrainingSession, ExerciseInSession, Set, Exercise, MuscleGroup
from django.db.models import Max


class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ['name', 'description']


class ExerciseSerializer(serializers.ModelSerializer):
    muscle_group = MuscleGroupSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ['name', 'description', 'muscle_group']


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ['set_number', 'weight', 'repetitions', 'comment']


class ExerciseInSessionSerializer(serializers.ModelSerializer):
    exercise = serializers.SlugRelatedField(
        slug_field='name', queryset=Exercise.objects.all())
    sets = SetSerializer(many=True)  # Change this line

    class Meta:
        model = ExerciseInSession
        fields = ['exercise', 'order', 'comment', 'sets']

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

    class Meta:
        model = TrainingSession
        fields = ['id', 'date', 'comment', 'exercises', 'is_completed']

    def update(self, instance, validated_data):
        self._delete_existing_exercises(instance)
        self._update_exercises(instance, validated_data.pop('exercises'))
        self._update_instance_fields(instance, validated_data)
        instance.save()
        return instance

    def _delete_existing_exercises(self, instance):
        instance.exercises.all().delete()

    def _update_exercises(self, instance, exercises_data):
        for exercise_data in exercises_data:
            sets_data = exercise_data.pop('sets')
            exercise_data['order'] = exercise_data.get('order', self._get_next_order(instance))
            exercise_in_session, created = ExerciseInSession.objects.update_or_create(
                order=exercise_data['order'], 
                training_session=instance, 
                defaults=exercise_data)
            if created:
                instance.exercises.add(exercise_in_session)
            self._update_sets(exercise_in_session, sets_data)

    def _get_next_order(self, instance):
        max_order = ExerciseInSession.objects.filter(
            training_session=instance).aggregate(Max('order'))['order__max']
        return (max_order or 0) + 1

    def _update_sets(self, exercise_in_session, sets_data):
        for set_data in sets_data:
            set_data['set_number'] = set_data.get('set_number', self._get_next_set_number(exercise_in_session))
            Set.objects.update_or_create(
                set_number=set_data['set_number'], 
                exercise_in_session=exercise_in_session, 
                defaults=set_data)

    def _get_next_set_number(self, exercise_in_session):
        max_set_number = Set.objects.filter(
            exercise_in_session=exercise_in_session).aggregate(
            Max('set_number'))['set_number__max']
        return (max_set_number or 0) + 1

    def _update_instance_fields(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)


class TrainingLogSerializer(serializers.ModelSerializer):
    training_sessions = TrainingSessionSerializer(many=True)

    class Meta:
        model = TrainingLog
        fields = ['name', 'training_sessions']

    def create(self, validated_data):
        """
        Create a new TrainingLog instance with the given validated data.

        Args:
            validated_data (dict): The validated data to create the TrainingLog instance with.

        Returns:
            The created TrainingLog instance.
        """
        # Get the training sessions data and remove it from the validated data
        training_sessions_data = validated_data.pop('training_sessions')
        # Get or create a TrainingLog instance with the remaining validated data
        training_log, created = TrainingLog.objects.get_or_create(
            name=validated_data['name'], user=validated_data['user'], defaults=validated_data)
        # Loop through the training sessions data and create a TrainingSession instance for each one
        for training_session_data in training_sessions_data:
            # Get the exercises data and remove it from the training session data
            exercises_data = training_session_data.pop('exercises')
            # Create a TrainingSession instance with the remaining training session data
            training_session = TrainingSession.objects.create(
                training_log=training_log, **training_session_data)
            # Loop through the exercises data and create an ExerciseInSession instance for each one
            for exercise_data in exercises_data:
                # Get the sets data and remove it from the exercise data
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

    def update(self, instance, validated_data):
        """
        Updates the TrainingLog instance and its related TrainingSessions, ExercisesInSession, and Sets.

        Args:
            instance (TrainingLog): The TrainingLog instance to update.
            validated_data (dict): The validated data to update the instance with.

        Returns:
            instance (TrainingLog): The updated TrainingLog instance.
        """
        # Update the TrainingLog fields
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        # Update the TrainingSessions
        training_sessions_data = validated_data.pop('training_sessions')
        for training_session_data in training_sessions_data:
            training_session = TrainingSession.objects.get(
                id=training_session_data['id'])
            training_session.date = training_session_data.get(
                'date', training_session.date)
            training_session.comment = training_session_data.get(
                'comment', training_session.comment)
            training_session.isCompleted = training_session_data.get(
                'isCompleted', training_session.isCompleted)  # Add this line
            training_session.save()

            # Update the ExercisesInSession
            exercises_data = training_session_data.pop('exercises')
            for exercise_data in exercises_data:
                exercise_in_session = ExerciseInSession.objects.get(
                    id=exercise_data['id'])
                exercise_in_session.order = exercise_data.get(
                    'order', exercise_in_session.order)
                exercise_in_session.comment = exercise_data.get(
                    'comment', exercise_in_session.comment)
                exercise_in_session.save()

                # Update the Sets
                sets_data = exercise_data.pop('sets')
                for set_data in sets_data:
                    set = Set.objects.get(id=set_data['id'])
                    set.set_number = set_data.get('set_number', set.set_number)
                    set.weight = set_data.get('weight', set.weight)
                    set.repetitions = set_data.get(
                        'repetitions', set.repetitions)
                    set.comment = set_data.get('comment', set.comment)
                    set.save()

        return instance
