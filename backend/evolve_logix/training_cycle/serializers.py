from rest_framework import serializers
from .models import Macrocycle, Mesocycle, Phase, Microcycle, TrainingSession, ExerciseInSession


class MicrocycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Microcycle
        fields = '__all__'


class ExerciseInSessionSerializer(serializers.ModelSerializer):
    microcycle_set = MicrocycleSerializer(many=True, read_only=True)

    class Meta:
        model = ExerciseInSession
        fields = ['id', 'training_session', 'exercise', 'microcycle_set']


class TrainingSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseInSessionSerializer(
        many=True, read_only=True)

    class Meta:
        model = TrainingSession
        fields = ['id', 'phase', 'order', 'exercises']


class PhaseSerializer(serializers.ModelSerializer):
    trainingsession_set = TrainingSessionSerializer(many=True, read_only=True)

    class Meta:
        model = Phase
        fields = ['id', 'mesocycle', 'type', 'start_date',
                  'end_date', 'trainingsession_set']


class MesocycleSerializer(serializers.ModelSerializer):
    phase_set = PhaseSerializer(many=True, read_only=True)

    class Meta:
        model = Mesocycle
        fields = ['id', 'macrocycle', 'name',
                  'start_date', 'end_date', 'phase_set']


class MacrocycleSerializer(serializers.ModelSerializer):
    mesocycle_set = MesocycleSerializer(many=True, read_only=True)

    class Meta:
        model = Macrocycle
        fields = ['id', 'user',
                  'name', 'start_date', 'end_date', 'mesocycle_set']
