from rest_framework import generics
from .models import Mesocycle, Macrocycle
from .serializers import MesocycleSerializer, MacrocycleSerializer

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
