import datetime
from django.test import TestCase
from django.urls import reverse
from training_log.models import Exercise, MuscleGroup
from .models import (Macrocycle, Mesocycle, Phase,
                     Microcycle, TrainingSession, ExerciseInSession)
from django.contrib.auth import get_user_model


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

        self.phase = Phase.objects.create(
            type='Hypertrophy', mesocycle=self.mesocycle1)

        self.phase2 = Phase.objects.create(
            type='Strength', mesocycle=self.mesocycle2)

        self.training_session = TrainingSession.objects.create(
            phase=self.phase, order=1)

        muscle_group = MuscleGroup.objects.create(name="Pectorals")

        bench_press = Exercise.objects.create(
            name='Bench Press')

        bench_press.muscle_group.add(muscle_group)

        self.exercise_in_session = ExerciseInSession.objects.create(
            exercise=bench_press, training_session=self.training_session)

        self.microcycle = Microcycle.objects.create(
            exercise_in_session=self.exercise_in_session, order=1, weight=100, repetitions=10, sets=3)

        self.token = self.obtain_login_token()

    def obtain_login_token(self):
        # Obtain a JWT for the test user
        response = self.client.post(reverse('token_obtain_pair'), data={
            'email': 'testuser@example.com',
            'password': 'testpass',
        })
        self.assertEqual(response.status_code, 200)
        return response.data['access']

