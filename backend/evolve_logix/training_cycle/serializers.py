from rest_framework import serializers
from .models import Macrocycle, Mesocycle, Phase, Microcycle, TrainingSession, ExerciseInSession


class MacrocycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Macrocycle
        fields = ['id', 'user', 'name', 'start_date', 'end_date']


class MesocycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mesocycle
        fields = ['id', 'macrocycle', 'name', 'start_date', 'end_date']


class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = ['id', 'mesocycle', 'type', 'start_date', 'end_date']


class MicrocycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Microcycle
        fields = '__all__'


class TrainingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingSession
        fields = '__all__'


class ExerciseInSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseInSession
        fields = '__all__'
