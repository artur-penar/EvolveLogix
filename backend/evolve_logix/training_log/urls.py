from django.urls import path
from .views import ExerciseListView, TrainingLogView, SetsPerMuscleGroupView, TrainingSessionDelete

urlpatterns = [
    path('exercises/', ExerciseListView.as_view()),
    path('', TrainingLogView.as_view()),
    path('sets-per-muscle-group/', SetsPerMuscleGroupView.as_view()),
    path('training-session/<int:pk>/delete/', TrainingSessionDelete.as_view())
]
