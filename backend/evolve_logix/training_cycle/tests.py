from django.test import TestCase
from .models import Mesocycle, Macrocycle, Phase, Microcycle, TrainingSession
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
        print(self.macrocycle.__dict__)
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
        print(self.training_session)
        self.assertEqual(self.training_session.order, 1)
        self.assertEqual(self.training_session.microcycle, self.microcycle)
