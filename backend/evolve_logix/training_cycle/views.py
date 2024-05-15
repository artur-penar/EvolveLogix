from rest_framework import generics
from .models import Mesocycle, Macrocycle, Phase
from .serializers import MesocycleSerializer, MacrocycleSerializer, PhaseSerializer

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
