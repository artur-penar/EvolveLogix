from datetime import timedelta

from django.db.models import Count
from django.utils import timezone

from rest_framework import generics, permissions, status, mixins
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Exercise, ExerciseInSession, Set, TrainingLog, TrainingSession
from .serializers import ExerciseSerializer, TrainingLogSerializer, TrainingSessionSerializer

# Create your views here.


class ExerciseListView(APIView):
    """View to list all exercises."""""

    def get(self, request):
        """Return a list of all exercises."""""
        exercises = Exercise.objects.all()
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)


class SetsPerMuscleGroupView(APIView):
    def get(self, request):
        # Get the date one week ago
        one_week_ago = timezone.now() - timedelta(weeks=1)

        # Filter TrainingSessions for the past week
        training_sessions = TrainingSession.objects.filter(
            training_log__user=request.user, date__gte=one_week_ago)

        # Get the ExercisesInSession for these TrainingSessions
        exercises_in_session = ExerciseInSession.objects.filter(
            training_session__in=training_sessions)

        # Get the Sets for these ExercisesInSession
        sets = Set.objects.filter(exercise_in_session__in=exercises_in_session)

        # Count the sets for each muscle group
        sets_per_muscle_group = sets.values(
            'exercise_in_session__exercise__muscle_group__name').annotate(count=Count('id'))

        return Response(sets_per_muscle_group)


class TrainingLogView(APIView):
    """
    A view that returns a list of all training logs for the authenticated user.

    Methods:
    --------
    get(request):
        Returns a serialized list of all training logs for the authenticated user.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        training_log = TrainingLog.objects.filter(user=request.user)
        serializer = TrainingLogSerializer(training_log, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TrainingLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TrainingSessionCreate(generics.CreateAPIView):
    """
    A view for creating a training session.
    """
    serializer_class = TrainingSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        training_log_id = request.data.get('training_log_id')
        try:
            training_log = TrainingLog.objects.get(
                id=training_log_id, user=request.user)
        except TrainingLog.DoesNotExist:
            return Response({'error': 'Training log not found'}, status=status.HTTP_404_NOT_FOUND)

        # Adjust the data to include the training_log
        data = request.data
        training_session = data['training_session']
        training_session['training_log'] = training_log_id
        print("CREATE TRAINING SESSION VIEW!!!!!!!!!!!!!!1")
        print(training_session)

        serializer = self.get_serializer(data=training_session)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TrainingSessionUpdateDelete(mixins.UpdateModelMixin, generics.DestroyAPIView):
    """
    A view for updating or deleting a training session.

    This view allows the updating or deletion of a specific training session by its ID.
    """
    print("Update method! ")
    queryset = TrainingSession.objects.all()
    lookup_field = 'pk'
    serializer_class = TrainingSessionSerializer

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
