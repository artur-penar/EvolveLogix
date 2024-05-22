from rest_framework.test import APITestCase
from .models import Mesocycle, Mesocycle, Phase, Microcycle, TrainingSession, ExerciseInSession
from .serializers import MesocycleSerializer, MacrocycleSerializer, PhaseSerializer, MicrocycleSerializer, TrainingSessionSerializer, ExerciseInSessionSerializer
from training_log.models import Exercise, MuscleGroup
from datetime import date
from django.contrib.auth import get_user_model

# Create your tests here.


class MesocycleSerializerTest(APITestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        self.mesocycle_attributes = {
            'user': user,
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
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')
        mesocycle_attributes = {
            'user': user,
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
        self.macrocycle = Mesocycle.objects.create(**macrocycle_attributes)

        self.serializer = MacrocycleSerializer(instance=self.macrocycle)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(
            ['id', 'mesocycle', 'name', 'start_date', 'end_date']))

    def test_content(self):
        data = self.serializer.data
        self.assertEqual(data['name'], self.macrocycle.name)


class PhaseSerializerTest(APITestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        mesocycle_attributes = {
            'user': user,
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
        self.macrocycle = Mesocycle.objects.create(**macrocycle_attributes)

        phase_attributes = {
            'macrocycle': self.macrocycle,
            'type': 'Hypertrophy',
            'start_date': date.today(),
            'end_date': None
        }
        self.phase = Phase.objects.create(**phase_attributes)

        self.serializer = PhaseSerializer(instance=self.phase)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(
            ['id', 'macrocycle', 'type', 'start_date', 'end_date']))

    def test_content(self):
        data = self.serializer.data
        self.assertEqual(data['type'], self.phase.type)
        self.assertEqual(data['start_date'], self.phase.start_date.isoformat())
        self.assertEqual(data['end_date'], self.phase.end_date)

        print("Phase Serializer Test Passed!")
        print(data)


class MicrocycleSerializerTest(APITestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        mesocycle_attributes = {
            'user': user,
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
        self.macrocycle = Mesocycle.objects.create(**macrocycle_attributes)

        phase_attributes = {
            'macrocycle': self.macrocycle,
            'type': 'Hypertrophy',
            'start_date': date.today(),
            'end_date': None
        }
        self.phase = Phase.objects.create(**phase_attributes)

        microcycle_attributes = {
            'phase': self.phase,
            'order': 1
        }
        self.microcycle = Microcycle.objects.create(**microcycle_attributes)

        self.serializer = MicrocycleSerializer(instance=self.microcycle)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(
            ['id', 'phase', 'order']))

    def test_content(self):
        data = self.serializer.data
        self.assertEqual(data['order'], self.microcycle.order)
        self.assertEqual(data['phase'], self.microcycle.phase.id)


class TrainingSessionSerializerTest(APITestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')
        mesocycle_attributes = {
            'user': user,
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
        self.macrocycle = Mesocycle.objects.create(**macrocycle_attributes)

        phase_attributes = {
            'macrocycle': self.macrocycle,
            'type': 'Hypertrophy',
            'start_date': date.today(),
            'end_date': None
        }
        self.phase = Phase.objects.create(**phase_attributes)

        microcycle_attributes = {
            'phase': self.phase,
            'order': 1
        }
        self.microcycle = Microcycle.objects.create(**microcycle_attributes)

        training_session_attributes = {
            'microcycle': self.microcycle,
            'order': 1,
        }
        self.training_session = TrainingSession.objects.create(
            **training_session_attributes)

        self.serializer = TrainingSessionSerializer(
            instance=self.training_session)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(
            ['id', 'microcycle', 'order']))

    def test_content(self):
        data = self.serializer.data
        self.assertEqual(data['microcycle'],
                         self.training_session.microcycle.id)
        print("Training Session Serializer Test Passed!")
        print(data)


class ExerciseInSessionSerializerTest(APITestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        mesocycle_attributes = {
            'user': user,
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
        self.macrocycle = Mesocycle.objects.create(**macrocycle_attributes)

        phase_attributes = {
            'macrocycle': self.macrocycle,
            'type': 'Hypertrophy',
            'start_date': date.today(),
            'end_date': None
        }
        self.phase = Phase.objects.create(**phase_attributes)

        microcycle_attributes = {
            'phase': self.phase,
            'order': 1
        }
        self.microcycle = Microcycle.objects.create(**microcycle_attributes)

        training_session_attributes = {
            'microcycle': self.microcycle,
            'order': 1,
        }
        self.training_session = TrainingSession.objects.create(
            **training_session_attributes)
        muscle_group = MuscleGroup.objects.create(name='Chest')
        bench_press = Exercise.objects.create(name="Bench Press")
        bench_press.muscle_group.add(muscle_group)

        exercise_in_session_attributes = {
            'training_session': self.training_session,
            'exercise': bench_press,
            'sets': 3,
            'repetitions': 10,
            'weight': 100
        }
        self.exercise_in_session = ExerciseInSession.objects.create(
            **exercise_in_session_attributes)

        self.serializer = ExerciseInSessionSerializer(
            instance=self.exercise_in_session)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(
            ['id', 'training_session', 'exercise', 'sets', 'repetitions', 'weight']))

    def test_content(self):
        data = self.serializer.data
        self.assertEqual(data['training_session'],
                         self.exercise_in_session.training_session.id)
        self.assertEqual(data['exercise'],
                         self.exercise_in_session.exercise.id)
        self.assertEqual(data['sets'], self.exercise_in_session.sets)
        self.assertEqual(data['repetitions'],
                         self.exercise_in_session.repetitions)
        self.assertEqual(data['weight'], self.exercise_in_session.weight)
        print("Exercise In Session Serializer Test Passed!")
        print(data)
