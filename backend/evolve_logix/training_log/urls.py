from django.urls import path
from .views import ExerciseListView, TrainingLogView, SetsPerMuscleGroupView

urlpatterns = [
    path('exercises/', ExerciseListView.as_view()),
    path('', TrainingLogView.as_view()),
    path('sets-per-muscle-group/', SetsPerMuscleGroupView.as_view()),
]
