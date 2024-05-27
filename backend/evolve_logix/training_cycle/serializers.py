from rest_framework import serializers
from .models import Macrocycle, Mesocycle, Phase, Microcycle, TrainingSession, ExerciseInSession


class MicrocycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Microcycle
        fields = '__all__'


class ExerciseInSessionSerializer(serializers.ModelSerializer):
    microcycles = MicrocycleSerializer(many=True, read_only=True)

    class Meta:
        model = ExerciseInSession
        fields = ['id', 'training_session', 'exercise', 'microcycles']


class TrainingSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseInSessionSerializer(
        many=True, read_only=True)

    class Meta:
        model = TrainingSession
        fields = ['id', 'phase', 'order', 'exercises']


class PhaseSerializer(serializers.ModelSerializer):
    training_sessions = TrainingSessionSerializer(many=True, read_only=True)

    class Meta:
        model = Phase
        fields = ['id', 'mesocycle', 'type', 'start_date',
                  'end_date', 'training_sessions']
        


class MesocycleSerializer(serializers.ModelSerializer):
    phases = PhaseSerializer(many=True, read_only=True)

    class Meta:
        model = Mesocycle
        fields = ['id', 'macrocycle', 'name',
                  'start_date', 'end_date', 'phases']


class MacrocycleSerializer(serializers.ModelSerializer):
    mesocycles = MesocycleSerializer(many=True, read_only=True)

    class Meta:
        model = Macrocycle
        fields = ['id', 'user',
                  'name', 'start_date', 'end_date', 'mesocycles']
