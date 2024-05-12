from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Mesocycle, Macrocycle, Phase, Microcycle, TrainingSession, ExerciseInSession
from training_log.models import Exercise
from .serializers import MesocycleSerializer, MacrocycleSerializer
from datetime import date

# Create your tests here.


# class MesocycleModelTest(TestCase):
#     def setUp(self):
#         self.mesocycle = Mesocycle.objects.create(
#             name='Test Mesocycle', start_date=date.today())

#     def test_mesocycle_creation(self):
#         self.assertEqual(self.mesocycle.name, 'Test Mesocycle')
#         self.assertEqual(self.mesocycle.start_date, date.today())
#         self.assertEqual(self.mesocycle.end_date, None)


class MacrocycleModelTest(TestCase):
    def setUp(self):
        self.mesocycle = Mesocycle.objects.create(name='Mesocycle')
        self.macrocycle = Macrocycle.objects.create(
            mesocycle=self.mesocycle, name='Macrocycle')

    def test_macrocycle_creation(self):
        self.assertEqual(self.macrocycle.name, 'Macrocycle')
        self.assertEqual(self.macrocycle.mesocycle, self.mesocycle)


class PhaseModelTest(TestCase):
    def setUp(self):
        self.mesocycle = Mesocycle.objects.create(name='Mesocycle')
        self.macrocycle = Macrocycle.objects.create(
            mesocycle=self.mesocycle, name='Macrocycle')
        self.phase = Phase.objects.create(
            macrocycle=self.macrocycle, name='Phase')

    def test_phase_creation(self):
        self.assertEqual(self.phase.name, 'Phase')
        self.assertEqual(self.phase.macrocycle, self.macrocycle)


class MicrocycleModelTest(TestCase):
    def setUp(self):
        self.mesocycle = Mesocycle.objects.create(name='Mesocycle')
        self.macrocycle = Macrocycle.objects.create(
            mesocycle=self.mesocycle, name='Macrocycle')
        self.phase = Phase.objects.create(
            macrocycle=self.macrocycle, name='Phase')
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
        mesocycle = Mesocycle.objects.create(name='Mesocycle')
        macrocycle = Macrocycle.objects.create(
            mesocycle=mesocycle, name='Macrocycle')
        phase = Phase.objects.create(
            macrocycle=macrocycle, name='Phase')
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
        self.session_1 = self.create_session(order=1)
        self.session_2 = self.create_session(order=2)

        self.squat_in_session_1 = self.create_exercise_in_session(
            session=self.session_1, exercise_name='Squat', weight=100)
        self.bench_press_in_session_1 = self.create_exercise_in_session(
            session=self.session_1, exercise_name='Bench press', weight=100)
        self.squat_in_session_2 = self.create_exercise_in_session(
            session=self.session_2, exercise_name='Squat', weight=200)

    def create_session(self, order):
        mesocycle = Mesocycle.objects.create(name='2024Cycle')
        macrocycle = Macrocycle.objects.create(
            mesocycle=mesocycle, name='Comp prep')
        phase = Phase.objects.create(
            macrocycle=macrocycle, name='Phase')
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


class MesocycleSerializerTest(APITestCase):
    def setUp(self):
        self.mesocycle_attributes = {
            'name': 'Test Mesocycle',
            'start_date': date.today(),
            'end_date': None
        }

        self.mesocycle = Mesocycle.objects.create(**self.mesocycle_attributes)
        self.serializer = MesocycleSerializer(instance=self.mesocycle)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(
            ['id', 'name', 'start_date', 'end_date']))

    def test_content(self):
        data = self.serializer.data
        self.assertEqual(data['name'], self.mesocycle_attributes['name'])
        self.assertEqual(
            data['start_date'], self.mesocycle_attributes['start_date'].isoformat())
        self.assertEqual(data['end_date'],
                         self.mesocycle_attributes['end_date'])


class MacrocycleSerializerTest(APITestCase):
    def setUp(self):
        mesocycle_attributes = {
            'name': 'Mesocycle',
            'start_date': date.today(),
            'end_date': None
        }
        self.mesocycle = Mesocycle.objects.create(**mesocycle_attributes)

        macrocycle_attributes = {
            'mesocycle': self.mesocycle,
            'name': 'Macrocycle',
            'start_date': date.today(),
            'end_date': None
        }
        self.macrocycle = Macrocycle.objects.create(**macrocycle_attributes)

        self.serializer = MacrocycleSerializer(instance=self.macrocycle)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(
            ['id', 'mesocycle', 'name', 'start_date', 'end_date']))

    def test_content(self):
        data = self.serializer.data
        self.assertEqual(data['name'], self.macrocycle.name)
