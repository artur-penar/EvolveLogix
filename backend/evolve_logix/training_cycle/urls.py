from django.urls import path
from .views import MesocycleListCreateView, MesocycleRetrieveUpdateDestroyView, MacrocycleListCreateView

urlpatterns = [
    path('mesocycles/', MesocycleListCreateView.as_view(),
         name='mesocycle-list-create'),
    path('mesocycles/<int:pk>/',
         MesocycleRetrieveUpdateDestroyView.as_view(), name='mesocycle-detail'),
    path('macrocycles/', MacrocycleListCreateView.as_view(),
         name='macrocycle-list-create'),
]
