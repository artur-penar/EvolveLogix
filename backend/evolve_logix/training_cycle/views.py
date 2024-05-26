from rest_framework import generics, status
from rest_framework.response import Response
from training_log.models import Exercise
from .models import Macrocycle, Mesocycle, Phase, Microcycle, TrainingSession, ExerciseInSession
from .serializers import (
    MesocycleSerializer, MacrocycleSerializer, PhaseSerializer,
    MicrocycleSerializer, TrainingSessionSerializer, ExerciseInSessionSerializer
)

# Create your views here.


class MacrocycleListCreateView(generics.ListCreateAPIView):
    serializer_class = MacrocycleSerializer

    def get_queryset(self):
        return Macrocycle.objects.filter(user=self.request.user)


class MacrocycleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Macrocycle.objects.all()
    serializer_class = MacrocycleSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class MesocycleListCreateView(generics.ListCreateAPIView):
    serializer_class = MesocycleSerializer

    def get_queryset(self):
        return Mesocycle.objects.filter(macrocycle__user=self.request.user)


class MesocycleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mesocycle.objects.all()
    serializer_class = MesocycleSerializer

    def get_queryset(self):
        return self.queryset.filter(macrocycle__user=self.request.user)


class PhaseListCreateView(generics.ListCreateAPIView):
    serializer_class = PhaseSerializer

    def get_queryset(self):
        return Phase.objects.filter(mesocycle__macrocycle__user=self.request.user)


class PhaseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer

    def get_queryset(self):
        return self.queryset.filter(mesocycle__macrocycle__user=self.request.user)


class MicrocycleListCreateView(generics.ListCreateAPIView):
    serializer_class = MicrocycleSerializer

    def create(self, request, *args, **kwargs):
        try:
            phase = Phase.objects.get(pk=request.data['phase'])
        except Phase.DoesNotExist:
            return Response({'error': 'Phase not found'}, status=status.HTTP_404_NOT_FOUND)

        order = Microcycle.objects.filter(phase=phase).count() + 1

        microcycle = Microcycle.objects.create(
            phase=phase,
            order=order,
        )

        serializer = self.get_serializer(microcycle)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return Microcycle.objects.filter(exercise_in_session__training_session__phase__mesocycle__macrocycle__user=self.request.user)


class MicrocycleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Microcycle.objects.all()
    serializer_class = MicrocycleSerializer

    def get_queryset(self):
        return self.queryset.filter(exercise_in_session__training_session__phase__mesocycle__macrocycle__user=self.request.user)


class TrainingSessionListCreateView(generics.ListCreateAPIView):
    serializer_class = TrainingSessionSerializer

    def create(self, request, *args, **kwargs):
        try:
            microcycle = Microcycle.objects.get(pk=request.data['microcycle'])
        except Microcycle.DoesNotExist:
            return Response({'error': 'Microcycle not found'}, status=status.HTTP_404_NOT_FOUND)

        order = TrainingSession.objects.filter(
            microcycle=microcycle).count() + 1

        training_session = TrainingSession.objects.create(
            microcycle=microcycle,
            order=order,
        )

        serializer = self.get_serializer(training_session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return TrainingSession.objects.filter(phase__mesocycle__macrocycle__user=self.request.user)


class TrainingSessionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrainingSession.objects.all()
    serializer_class = TrainingSessionSerializer

    def get_queryset(self):
        return self.queryset.filter(phase__mesocycle__macrocycle__user=self.request.user)


class ExerciseInSessionListCreateView(generics.ListCreateAPIView):
    serializer_class = ExerciseInSessionSerializer

    def create(self, request, *args, **kwargs):
        try:
            training_session = TrainingSession.objects.get(
                pk=request.data['training_session'])
        except TrainingSession.DoesNotExist:
            return Response({'error': 'Training session not found'}, status=status.HTTP_404_NOT_FOUND)

        exercise = Exercise.objects.get(pk=request.data['exercise'])
        weight = request.data.get('weight')
        repetitions = request.data.get('repetitions')
        sets = request.data.get('sets')

        exercise_in_session = ExerciseInSession.objects.create(
            training_session=training_session,
            exercise=exercise,
            weight=weight,
            repetitions=repetitions,
            sets=sets
        )

        serializer = self.get_serializer(exercise_in_session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return ExerciseInSession.objects.filter(training_session__phase__mesocycle__macrocycle__user=self.request.user)


class ExerciseInSessionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExerciseInSession.objects.all()
    serializer_class = ExerciseInSessionSerializer

    def get_queryset(self):
        return self.queryset.filter(training_session__phase__mesocycle__macrocycle__user=self.request.user)
