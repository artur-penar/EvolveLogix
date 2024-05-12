from rest_framework import serializers
from .models import Mesocycle, Macrocycle, Phase, Microcycle, TrainingSession, ExerciseInSession


class MesocycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mesocycle
        fields = ['id', 'name', 'start_date', 'end_date']
