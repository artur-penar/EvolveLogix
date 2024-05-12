from rest_framework import generics
from .models import Mesocycle
from .serializers import MesocycleSerializer

# Create your views here.


class MesocycleListCreateView(generics.ListCreateAPIView):
    serializer_class = MesocycleSerializer

    def get_queryset(self):
        return Mesocycle.objects.filter(user=self.request.user)
