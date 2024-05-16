from rest_framework import generics, status
from rest_framework.response import Response
from .models import Mesocycle, Macrocycle, Phase, Microcycle, TrainingSession, ExerciseInSession
from .serializers import (
    MesocycleSerializer, MacrocycleSerializer, PhaseSerializer,
    MicrocycleSerializer, TrainingSessionSerializer, ExerciseInSessionSerializer
)

# Create your views here.


class MesocycleListCreateView(generics.ListCreateAPIView):
    serializer_class = MesocycleSerializer

    def get_queryset(self):
        return Mesocycle.objects.filter(user=self.request.user)


class MesocycleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mesocycle.objects.all()
    serializer_class = MesocycleSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class MacrocycleListCreateView(generics.ListCreateAPIView):
    serializer_class = MacrocycleSerializer

    def get_queryset(self):
        return Macrocycle.objects.filter(mesocycle__user=self.request.user)


class MacrocycleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Macrocycle.objects.all()
    serializer_class = MacrocycleSerializer

    def get_queryset(self):
        return self.queryset.filter(mesocycle__user=self.request.user)


class PhaseListCreateView(generics.ListCreateAPIView):
    serializer_class = PhaseSerializer

    def get_queryset(self):
        return Phase.objects.filter(macrocycle__mesocycle__user=self.request.user)


class PhaseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer

    def get_queryset(self):
        return self.queryset.filter(macrocycle__mesocycle__user=self.request.user)


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
        return Microcycle.objects.filter(phase__macrocycle__mesocycle__user=self.request.user)


class MicrocycleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Microcycle.objects.all()
    serializer_class = MicrocycleSerializer

    def get_queryset(self):
        return self.queryset.filter(phase__macrocycle__mesocycle__user=self.request.user)


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
        return TrainingSession.objects.filter(microcycle__phase__macrocycle__mesocycle__user=self.request.user)
