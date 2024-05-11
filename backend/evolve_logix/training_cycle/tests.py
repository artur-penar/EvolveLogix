from django.test import TestCase
from .models import Mesocycle, Macrocycle
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
