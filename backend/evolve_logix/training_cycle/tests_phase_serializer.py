import datetime
from django.forms import model_to_dict
from django.test import TestCase
from django.urls import reverse
from training_log.models import Exercise, MuscleGroup
from .models import (Macrocycle, Mesocycle, Phase,
                     Microcycle, TrainingSession, ExerciseInSession)
from django.contrib.auth import get_user_model
from .serializers import PhaseSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class BaseTest(TestCase):
    def setUp(self):
        self.setup_user()
        self.setup_macros_and_mesos()
        self.setup_exercises()
        self.setup_phase()
        self.token = self.obtain_login_token()

    def setup_user(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

    def setup_macros_and_mesos(self):
        self.macrocycle1 = Macrocycle.objects.create(
            name='Macrocycle 1', user=self.user)
        self.macrocycle2 = Macrocycle.objects.create(
            name='Macrocycle 2', user=self.user)
        self.mesocycle1 = Mesocycle.objects.create(
            name='Mesocycle 1', macrocycle=self.macrocycle1)
        self.mesocycle2 = Mesocycle.objects.create(
            name='Mesocycle 2', macrocycle=self.macrocycle2)

    def setup_exercises(self):
        muscle_group = MuscleGroup.objects.create(name="Pectorals")
        self.bench_press = Exercise.objects.create(name='Bench Press')
        self.squat = Exercise.objects.create(name='Squat')
        self.deadlift = Exercise.objects.create(name='Deadlift')
        self.ohp = Exercise.objects.create(name='Overhead Press')
        self.bench_press.muscle_group.add(muscle_group)

    def setup_phase(self):
        self.phase = None
        self.data = self.get_data(self.bench_press.id)
        self.data2 = self.get_data(self.bench_press.id, self.squat.id)

    def get_data(self, bench_press_id, squat_id=None):
        data = {
            'mesocycle': self.mesocycle1.id,
            'type': 'Hypertrophy',  # 'Hypertrophy', 'Strength', 'Peak', 'Deload', 'Conditioning
            'start_date': '2022-01-01',
            'end_date': '2022-12-31',
            'training_sessions': [
                {
                    'exercises': [
                        {
                            'exercise': bench_press_id,
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

                    ],
                },
            ],
        }
        if squat_id:
            data['training_sessions'][0]['exercises'].append(
                {
                    'exercise': squat_id,
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
                }
            )
        return data

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
        serializer = PhaseSerializer(data=self.data2)
        self.validate_and_save(serializer)
        self.print_phase_details()

    def validate_and_save(self, serializer):
        if not serializer.is_valid():
            print(serializer.errors)
        self.phase = serializer.save()

    def print_phase_details(self):
        print(f"Phase ID: {self.phase.id}")
        self.assertEqual(self.phase.training_sessions.count(),
                         len(self.data2['training_sessions']))
        for i, training_session in enumerate(self.phase.training_sessions.all(), start=1):
            print(f"\nTraining Session {i} ID: {training_session.id}")
            self.print_exercise_details(training_session)

    def print_exercise_details(self, training_session):
        # Iterate over all exercises in the training session
        for j, exercise_in_session in enumerate(training_session.exercises.all(), start=1):
            print(f"\n\tExercise {j}: {exercise_in_session.exercise}")
            self.print_microcycle_details(exercise_in_session)

    def print_microcycle_details(self, exercise_in_session):
        # Iterate over all microcycles of the exercise
        for k, microcycle in enumerate(exercise_in_session.microcycles.all(), start=1):
            print(f"\n\t\tMicrocycle {k} ID: {microcycle.id}")
            print(f"\t\tWeight: {microcycle.weight}")
            print(f"\t\tRepetitions: {microcycle.repetitions}")
            print(f"\t\tSets: {microcycle.sets}")

    def test_update(self):
        self.validated_data = self.get_validated_data()
        serializer = PhaseSerializer(data=self.data2)
        self.validate_and_save(serializer)
        serializer = PhaseSerializer(instance=self.phase)
        updated_phase = serializer.update(self.phase, self.validated_data)
        print('Updated Phase')
        print(updated_phase)

    def get_validated_data(self):
        return {
            'mesocycle': self.mesocycle1,
            'type': 'Peak',  # 'Hypertrophy', 'Strength', 'Peak', 'Deload', 'Conditioning
            'start_date': '2023-01-01',
            'end_date': '2023-12-31',
            'training_sessions': [
                {
                    'exercises': [
                        {
                            'exercise': self.bench_press,
                            'microcycles': [
                                {
                                    'weight': 200,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                            ],
                        },
                    ],
                },
                {
                    'exercises': [
                        {
                            'exercise': self.deadlift,
                            'microcycles': [
                                {
                                    'weight': 300,
                                    'repetitions': 10,
                                    'sets': 3,
                                },
                            ],
                        },
                    ],
                },
            ],
        }


class PhaseViewTest(BaseTest):
    def test_create(self):
        response = self.client.post(reverse('phase-list-create'), data=self.data,
                                    HTTP_AUTHORIZATION=f'Bearer {self.token}',
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
