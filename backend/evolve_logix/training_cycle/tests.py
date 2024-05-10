from django.test import TestCase
from .models import Mesocycle
from datetime import date

# Create your tests here.


class MesocycleModelTest(TestCase):
    def setUp(self):
        self.mesocycle = Mesocycle.objects.create(
            name='Test Mesocycle', start_date=date.today())

    def test_mesocycle_creation(self):
        self.assertEqual(self.mesocycle.name, 'Test Mesocycle')
        self.assertEqual(self.mesocycle.start_date, date.today())
        self.assertEqual(self.mesocycle.end_date, None)
