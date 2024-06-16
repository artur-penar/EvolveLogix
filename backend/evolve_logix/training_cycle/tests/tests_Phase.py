from ..models import Macrocycle, Mesocycle, Phase, Microcycle, TrainingSession, ExerciseInSession
from training_log.models import Exercise
from django.test import TestCase
from datetime import date
from django.contrib.auth import get_user_model


class BaseTest(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpassword')
        self.macrocycle = Macrocycle.objects.create(
            user=self.user, name='Test Macrocycle', start_date=date(2020, 1, 1))

        self.mesocycle = Mesocycle.objects.create(
            macrocycle=self.macrocycle, name='Test Mesocycle', start_date=date(2024, 6, 3), duration=4)


class PhaseModelTest(BaseTest):
    def test_create_pase(self):
        phase = Phase.objects.create(
            mesocycle=self.mesocycle, type='Strength', duration=2)
        self.assertEqual(Phase.objects.count(), 1)

    def test_phase_end_date(self):
        phase = Phase.objects.create(
            mesocycle=self.mesocycle, type='Strength', duration=2)
        self.assertEqual(phase.end_date, date(2024, 6, 16))

    def test_phase_start_date_consistency(self):
        phase = Phase.objects.create(
            mesocycle=self.mesocycle, type='Hypertrophy',  duration=2)
        phase_2 = Phase.objects.create(
            mesocycle=self.mesocycle, type='Strength', start_date=date(2019, 12, 20), duration=2)

        print("Phase one start: ", phase.start_date)
        print("Phase one end: ", phase.end_date)
        print("Phase two start: ", phase_2.start_date)
        print("Phase two end: ", phase_2.end_date)

    def test_phase_duration_validation(self):
        # Create a phase with a duration greater than the mesocycle duration
        with self.assertRaises(ValueError):
            phase = Phase.objects.create(
                mesocycle=self.mesocycle, type='Strength', start_date=date(2020, 1, 1), duration=5)

    def test_total_phase_duration_validation(self):
        phase = Phase.objects.create(
            mesocycle=self.mesocycle, type='Strength', start_date=date(2020, 1, 1), duration=2)

        with self.assertRaises(ValueError):
            phase_2 = Phase.objects.create(
                mesocycle=self.mesocycle, type='Strength', start_date=date(2020, 1, 1), duration=3)
