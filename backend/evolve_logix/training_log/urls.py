from django.urls import path
from .views import ExerciseListView, TrainingLogView, SetsPerMuscleGroupView, TrainingSessionUpdateDelete, TrainingSessionCreate

urlpatterns = [
    path('exercises/', ExerciseListView.as_view()),
    path('', TrainingLogView.as_view()),
    path('sets-per-muscle-group/', SetsPerMuscleGroupView.as_view()),
    path('training-session/create/', TrainingSessionCreate.as_view()),
    path('training-session/<int:pk>/delete/',
         TrainingSessionUpdateDelete.as_view()),
    path('training-session/<int:pk>/update/',
         TrainingSessionUpdateDelete.as_view())
]
