from django.urls import path
from .views import (
    MesocycleListCreateView, MesocycleRetrieveUpdateDestroyView,
    MacrocycleListCreateView, MacrocycleRetrieveUpdateDestroyView,
    PhaseListCreateView, PhaseRetrieveUpdateDestroyView, MicrocycleListCreateView,
    MicrocycleRetrieveUpdateDestroyView, TrainingSessionListCreateView,
    TrainingSessionRetrieveUpdateDestroyView, ExerciseInSessionListCreateView
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
    path('microcycles/', MicrocycleListCreateView.as_view(),
         name='microcycle-list-create'),
    path('microcycles/<int:pk>/', MicrocycleRetrieveUpdateDestroyView.as_view(),
         name='microcycle-detail'),
    path('training-sessions/', TrainingSessionListCreateView.as_view(),
         name='training-session-list-create'),
    path('training-sessions/<int:pk>/', TrainingSessionRetrieveUpdateDestroyView.as_view(),
         name='training-session-detail'),
    path('exercise-in-session/', ExerciseInSessionListCreateView.as_view(),
         name='exercise-in-session-list-create')
]
