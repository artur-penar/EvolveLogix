from rest_framework import serializers

from .models import Macrocycle, Mesocycle, Phase, Microcycle, TrainingSession, ExerciseInSession
from training_log.models import Exercise


class MicrocycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Microcycle
        fields = ['id', 'order',  'exercise_in_session', 'weight',
                  'repetitions', 'sets']
        read_only_fields = ['exercise_in_session', 'order']


class ExerciseInSessionSerializer(serializers.ModelSerializer):
    microcycles = MicrocycleSerializer(many=True)
    exercise = serializers.SlugRelatedField(
        slug_field='name', queryset=Exercise.objects.all())

    class Meta:
        model = ExerciseInSession
        fields = ['id', 'training_session', 'exercise', 'microcycles']
        extra_kwargs = {
            'training_session': {'required': False}
        }


class TrainingSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseInSessionSerializer(many=True)

    class Meta:
        model = TrainingSession
        fields = ['id', 'phase', 'order', 'exercises']


class PhaseSerializer(serializers.ModelSerializer):
    training_sessions = TrainingSessionSerializer(many=True)

    class Meta:
        model = Phase
        fields = ['id', 'mesocycle', 'type', 'duration', 'start_date',
                  'end_date', 'training_sessions']

    def create(self, validated_data):
        training_sessions_data = validated_data.pop('training_sessions')
        phase = Phase.objects.create(**validated_data)
        for training_session_order, training_session_data in enumerate(training_sessions_data, start=1):
            exercises_data = training_session_data.pop('exercises')
            training_session_data['phase'] = phase
            training_session_data['order'] = training_session_order
            training_session = TrainingSession.objects.create(
                **training_session_data)
            for exercise_data in exercises_data:
                microcycles_data = exercise_data.pop('microcycles')
                exercise_data['training_session'] = training_session
                exercise = ExerciseInSession.objects.create(**exercise_data)
                for microcycle_order, microcycle_data in enumerate(microcycles_data, start=1):
                    microcycle_data['exercise_in_session'] = exercise
                    microcycle_data['order'] = microcycle_order
                    microcycle = Microcycle.objects.create(**microcycle_data)

        return phase

    def update(self, instance, validated_data):
        training_sessions_data = validated_data.pop('training_sessions')
        # instance = super().update(instance, validated_data)

        updated_training_sessions_ids = []
        for training_session_order, training_session_data in enumerate(training_sessions_data, start=1):
            exercises_data = training_session_data.pop('exercises')
            training_session_data['phase'] = instance
            training_session_data['order'] = training_session_order
            training_session, created = TrainingSession.objects.update_or_create(
                defaults=training_session_data, phase=instance, order=training_session_order)
            updated_training_sessions_ids.append(training_session.id)
            updated_exercises_ids = []
            for exercise_data in exercises_data:
                print(exercise_data)
                microcycles_data = exercise_data.pop('microcycles')
                exercise_data['training_session'] = training_session
                exercise_data['exercise'] = exercise_data['exercise']
                exercise, created = ExerciseInSession.objects.update_or_create(
                    defaults=exercise_data, training_session=training_session, exercise=exercise_data['exercise'])
                updated_exercises_ids.append(exercise.id)
                updated_microcycles_ids = []
                for microcycle_order, microcycle_data in enumerate(microcycles_data, start=1):
                    microcycle_data['exercise_in_session'] = exercise
                    microcycle_data['order'] = microcycle_order
                    microcycle, created = Microcycle.objects.update_or_create(
                        defaults=microcycle_data, exercise_in_session=exercise, order=microcycle_order)

                    updated_microcycles_ids.append(microcycle.id)
                Microcycle.objects.filter(exercise_in_session__training_session=training_session).exclude(
                    id__in=updated_microcycles_ids).delete()
            ExerciseInSession.objects.filter(training_session=training_session).exclude(
                id__in=updated_exercises_ids).delete()
        TrainingSession.objects.filter(phase=instance).exclude(
            id__in=updated_training_sessions_ids).delete()

        instance = super().update(instance, validated_data)

        return instance


class MesocycleSerializer(serializers.ModelSerializer):
    phases = PhaseSerializer(many=True, read_only=True)

    class Meta:
        model = Mesocycle
        fields = ['id', 'macrocycle', 'name', 'duration',
                  'start_date', 'end_date', 'phases']


class MacrocycleSerializer(serializers.ModelSerializer):
    mesocycles = MesocycleSerializer(many=True, read_only=True)

    class Meta:
        model = Macrocycle
        fields = ['id',
                  'name', 'start_date', 'end_date', 'mesocycles']
