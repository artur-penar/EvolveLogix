from django.urls import path
from .views import (
    MesocycleListCreateView, MesocycleRetrieveUpdateDestroyView,
    MacrocycleListCreateView, MacrocycleRetrieveUpdateDestroyView,
    PhaseListCreateView, PhaseRetrieveUpdateDestroyView,
)

urlpatterns = [
    path('mesocycles/', MesocycleListCreateView.as_view(),
         name='mesocycle-list-create'),
    path('mesocycles/<int:pk>/',
         MesocycleRetrieveUpdateDestroyView.as_view(), name='mesocycle-detail'),
    path('macrocycles/', MacrocycleListCreateView.as_view(),
         name='macrocycle-list-create'),
    path('macrocycles/<int:pk>/',
         MacrocycleRetrieveUpdateDestroyView.as_view(), name='macrocycle-detail'),
    path('phases/', PhaseListCreateView.as_view(), name='phase-list-create'),
    path('phases/<int:pk>/',
         PhaseRetrieveUpdateDestroyView.as_view(), name='phase-detail'),
]
