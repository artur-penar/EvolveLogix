from .models import Mesocycle, Macrocycle, Phase, Microcycle, TrainingSession, ExerciseInSession
from training_log.models import Exercise
from django.test import TestCase
from datetime import date
from django.contrib.auth import get_user_model


class MesocycleModelTest(TestCase):
    def setUp(self):
        # Create a User object
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        self.mesocycle = Mesocycle.objects.create(user=user,
                                                  name='Test Mesocycle', start_date=date.today())

    def test_mesocycle_creation(self):
        self.assertEqual(self.mesocycle.name, 'Test Mesocycle')
        self.assertEqual(self.mesocycle.start_date, date.today())
        self.assertEqual(self.mesocycle.end_date, None)


class MacrocycleModelTest(TestCase):
    def setUp(self):
        # Create a User object
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        self.mesocycle = Mesocycle.objects.create(user=user,
                                                  name='Test Mesocycle', start_date=date.today())

        self.macrocycle = Macrocycle.objects.create(
            mesocycle=self.mesocycle, name='Macrocycle')

    def test_macrocycle_creation(self):
        self.assertEqual(self.macrocycle.name, 'Macrocycle')
        self.assertEqual(self.macrocycle.mesocycle, self.mesocycle)


class PhaseModelTest(TestCase):
    def setUp(self):
        # Create a User object
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        self.mesocycle = Mesocycle.objects.create(user=user,
                                                  name='Test Mesocycle', start_date=date.today())

        self.macrocycle = Macrocycle.objects.create(
            mesocycle=self.mesocycle, name='Macrocycle')
        self.phase = Phase.objects.create(
            macrocycle=self.macrocycle, type='Hypertrophy')

    def test_phase_creation(self):
        self.assertEqual(self.phase.type, 'Hypertrophy')
        self.assertEqual(self.phase.macrocycle, self.macrocycle)


class MicrocycleModelTest(TestCase):
    def setUp(self):
        # Create a User object
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        self.mesocycle = Mesocycle.objects.create(user=user,
                                                  name='Test Mesocycle', start_date=date.today())

        self.macrocycle = Macrocycle.objects.create(
            mesocycle=self.mesocycle, name='Macrocycle')
        self.phase = Phase.objects.create(
            macrocycle=self.macrocycle, type='Hypertrophy')
        self.microcycle = Microcycle.objects.create(
            phase=self.phase, order=1)
        self.microcycle_2 = Microcycle.objects.create(
            phase=self.phase, order=3)

    def test_microcycle_creation(self):
        self.assertEqual(self.microcycle.order, 1)
        self.assertEqual(self.microcycle.phase, self.phase)
        self.assertEqual(self.microcycle_2.order, 3)
        self.assertEqual(self.microcycle_2.phase, self.phase)


class TrainingSessionModelTest(TestCase):
    def setUp(self):
        # Create a User object
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        mesocycle = Mesocycle.objects.create(user=user,
                                             name='Test Mesocycle', start_date=date.today())

        macrocycle = Macrocycle.objects.create(
            mesocycle=mesocycle, name='Macrocycle')
        phase = Phase.objects.create(
            macrocycle=macrocycle, type='Hypertrophy')
        self.microcycle = Microcycle.objects.create(
            phase=phase, order=1)
        self.training_session = TrainingSession.objects.create(
            microcycle=self.microcycle, order=1)
        self.training_session_2 = TrainingSession.objects.create(
            microcycle=self.microcycle, order=2)

    def test_training_session_creation(self):
        self.assertEqual(self.training_session.order, 1)
        self.assertEqual(self.training_session.microcycle, self.microcycle)


class ExerciseInSessionModelTest(TestCase):
    def setUp(self):

        self.session_1 = self.create_session(order=1, email='testuser')
        self.session_2 = self.create_session(order=2, email='testuser2')

        self.squat_in_session_1 = self.create_exercise_in_session(
            session=self.session_1, exercise_name='Squat', weight=100)
        self.bench_press_in_session_1 = self.create_exercise_in_session(
            session=self.session_1, exercise_name='Bench press', weight=100)
        self.squat_in_session_2 = self.create_exercise_in_session(
            session=self.session_2, exercise_name='Squat', weight=200)

    def create_session(self, order, email):
        # Create a User object
        User = get_user_model()
        user = User.objects.create_user(
            email=f'{email}@example.com', user_name='Test User', password='testpass')

        mesocycle = Mesocycle.objects.create(user=user,
                                             name='Test Mesocycle', start_date=date.today())

        macrocycle = Macrocycle.objects.create(
            mesocycle=mesocycle, name='Comp prep')
        phase = Phase.objects.create(
            macrocycle=macrocycle, type='Hypertrophy')
        microcycle = Microcycle.objects.create(
            phase=phase, order=1)
        return TrainingSession.objects.create(
            microcycle=microcycle, order=order)

    def create_exercise_in_session(self, session, exercise_name, weight):
        return ExerciseInSession.objects.create(
            training_session=session,
            exercise=Exercise.objects.create(name=exercise_name),
            weight=weight,
            repetitions=10,
            sets=3)

    def test_exercise_in_session_creation(self):
        self.assertExerciseInSession(
            self.squat_in_session_1, self.session_1, 'Squat', 100)
        self.assertExerciseInSession(
            self.bench_press_in_session_1, self.session_1, 'Bench press', 100)

    def assertExerciseInSession(self, exercise_in_session, session, exercise_name, weight):
        self.assertEqual(
            exercise_in_session.training_session.order, session.order)
        self.assertEqual(exercise_in_session.exercise.name, exercise_name)
        self.assertEqual(exercise_in_session.weight, weight)
        self.assertEqual(exercise_in_session.repetitions, 10)
        self.assertEqual(exercise_in_session.sets, 3)
