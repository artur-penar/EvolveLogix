import datetime
from django.forms import model_to_dict
from django.test import TestCase
from django.urls import reverse
from training_log.models import Exercise, MuscleGroup
from .models import (Macrocycle, Mesocycle, Phase,
                     Microcycle, TrainingSession, ExerciseInSession)
from django.contrib.auth import get_user_model
from .serializers import PhaseSerializer


class BaseTest(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        self.macrocycle1 = Macrocycle.objects.create(
            name='Macrocycle 1', user=self.user)

        self.macrocycle2 = Macrocycle.objects.create(
            name='Macrocycle 2', user=self.user)

        self.mesocycle1 = Mesocycle.objects.create(
            name='Mesocycle 1', macrocycle=self.macrocycle1)
        self.mesocycle2 = Mesocycle.objects.create(
            name='Mesocycle 2', macrocycle=self.macrocycle2)

        # self.phase = Phase.objects.create(
        #     type='Hypertrophy', mesocycle=self.mesocycle1)

        # self.phase2 = Phase.objects.create(
        #     type='Strength', mesocycle=self.mesocycle2)

        # self.training_session = TrainingSession.objects.create(
        #     phase=self.phase, order=1)

        muscle_group = MuscleGroup.objects.create(name="Pectorals")

        self.bench_press = Exercise.objects.create(
            name='Bench Press')

        self.squat = Exercise.objects.create(name='Squat')
        self.deadlift = Exercise.objects.create(name='Deadlift')
        self.ohp = Exercise.objects.create(name='Overhead Press')

        self.bench_press.muscle_group.add(muscle_group)

        # self.exercise_in_session = ExerciseInSession.objects.create(
        # exercise=bench_press, training_session=self.training_session)

        # self.microcycle = Microcycle.objects.create(
        #     exercise_in_session=self.exercise_in_session, order=1, weight=100, repetitions=10, sets=3)

        self.token = self.obtain_login_token()

    def obtain_login_token(self):
        # Obtain a JWT for the test user
        response = self.client.post(reverse('token_obtain_pair'), data={
            'email': 'testuser@example.com',
            'password': 'testpass',
        })
        self.assertEqual(response.status_code, 200)
        return response.data['access']


class PhaseSerializerTest(BaseTest):
    def test_create(self):
        data = {
            'mesocycle': self.mesocycle1.id,
            'type': 'Hypertrophy',  # 'Hypertrophy', 'Strength', 'Peak', 'Deload', 'Conditioning
            'start_date': '2022-01-01',
            'end_date': '2022-12-31',
            'training_sessions': [
                {
                    'exercises': [
                        {
                            'exercise': self.bench_press.id,
                            'microcycles': [
                                {
                                    'weight': 100,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                                {
                                    'weight': 120,
                                    'repetitions': 8,
                                    'sets': 3,
                                },
                            ],
                        },
                        {
                            'exercise': self.squat.id,
                            'microcycles': [
                                {
                                    'weight': 140,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                                {
                                    'weight': 160,
                                    'repetitions': 8,
                                    'sets': 3,
                                },
                            ],
                        },
                    ],
                },
                {
                    'exercises': [
                        {
                            'exercise': self.deadlift.id,
                            'microcycles': [
                                {
                                    'weight': 180,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                                {
                                    'weight': 200,
                                    'repetitions': 8,
                                    'sets': 3,
                                },
                            ],
                        },
                        {
                            'exercise': self.ohp.id,
                            'microcycles': [
                                {
                                    'weight': 60,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                                {
                                    'weight': 80,
                                    'repetitions': 8,
                                    'sets': 3,
                                },
                            ],
                        },
                    ],
                },
            ],
        }

        updated_data = {
            'mesocycle': self.mesocycle1.id,
            'type': 'Hypertrophy',  # 'Hypertrophy', 'Strength', 'Peak', 'Deload', 'Conditioning
            'start_date': '2022-01-01',
            'end_date': '2022-12-31',
            'training_sessions': [
                {
                    'exercises': [
                        {
                            'exercise': self.bench_press.id,
                            'microcycles': [
                                {
                                    'weight': 100,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                                {
                                    'weight': 120,
                                    'repetitions': 8,
                                    'sets': 3,
                                },
                            ],
                        },
                        {
                            'exercise': self.squat.id,
                            'microcycles': [
                                {
                                    'weight': 140,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                                {
                                    'weight': 160,
                                    'repetitions': 8,
                                    'sets': 3,
                                },
                            ],
                        },
                    ],
                },
                {
                    'exercises': [
                        {
                            'exercise': self.deadlift.id,
                            'microcycles': [
                                {
                                    'weight': 180,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                                {
                                    'weight': 200,
                                    'repetitions': 8,
                                    'sets': 3,
                                },
                            ],
                        },
                        {
                            'exercise': self.ohp.id,
                            'microcycles': [
                                {
                                    'weight': 60,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                                {
                                    'weight': 80,
                                    'repetitions': 8,
                                    'sets': 3,
                                },
                            ],
                        },
                    ],
                },
            ],
        }

        serializer = PhaseSerializer(data=data)

        if not serializer.is_valid():
            print(serializer.errors)

        phase = serializer.save()

        serializer = PhaseSerializer(instance=phase, data=updated_data)
        if not serializer.is_valid():
            print(serializer.errors)

        updated_phase = serializer.save()

        print(f"Phase ID: {phase.id}")
        self.assertEqual(phase.training_sessions.count(),
                         len(data['training_sessions']))
        for i, training_session in enumerate(phase.training_sessions.all(), start=1):
            print(f"\nTraining Session {i} ID: {training_session.id}")

            # Iterate over all exercises in the training session
            for j, exercise_in_session in enumerate(training_session.exercises.all(), start=1):
                print(f"\n\tExercise {j}: {exercise_in_session.exercise}")

                # Iterate over all microcycles of the exercise
                for k, microcycle in enumerate(exercise_in_session.microcycles.all(), start=1):
                    print(f"\n\t\tMicrocycle {k} ID: {microcycle.id}")
                    print(f"\t\tWeight: {microcycle.weight}")
                    print(f"\t\tRepetitions: {microcycle.repetitions}")
                    print(f"\t\tSets: {microcycle.sets}")
