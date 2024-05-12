from rest_framework.test import APITestCase
from .models import Mesocycle, Macrocycle, Phase, Microcycle, TrainingSession, ExerciseInSession
from training_log.models import Exercise
from .serializers import MesocycleSerializer, MacrocycleSerializer, PhaseSerializer
from datetime import date

# Create your tests here.


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


class PhaseSerializerTest(APITestCase):
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
