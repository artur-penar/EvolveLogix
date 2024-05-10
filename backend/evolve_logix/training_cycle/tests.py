from django.test import TestCase
from .models import Mesocycle
from datetime import date

# Create your tests here.


class MesocycleModelTest(TestCase):
    def setUp(self):
        self.mesocycle = Mesocycle.objects.create(
            name='Test Mesocycle', start_date=date.today(), end_date=date.today())
