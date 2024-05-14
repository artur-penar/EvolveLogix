from rest_framework import generics
from .models import Mesocycle
from .serializers import MesocycleSerializer

# Create your views here.


class MesocycleListCreateView(generics.ListCreateAPIView):
    serializer_class = MesocycleSerializer

    def get_queryset(self):
        return Mesocycle.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MesocycleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mesocycle.objects.all()
    serializer_class = MesocycleSerializer
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)