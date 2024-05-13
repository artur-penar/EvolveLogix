from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Mesocycle
from users.models import UserProfile


class MesocycleListCreateViewTest(TestCase):
    def setUp(self):
        # Create a UserProfile object
        self.user = UserProfile.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        # Create a Mesocycle object that belongs to the user
        Mesocycle.objects.create(name='Mesocycle 1', user=self.user)

        # Create a Mesocycle object that belongs to another user
        other_user = UserProfile.objects.create_user(
            email='otheruser@example.com', user_name='Other User', password='otherpass')
        Mesocycle.objects.create(name='Mesocycle 2', user=other_user)

    def test_list_mesocycles(self):
        # Log in as the test user
        self.client.login(username='testuser', password='testpass')

        # Send a GET request to the MesocycleListCreateView
        response = self.client.get(reverse('mesocycle-list-create'))

        # Check that the response has a status code of 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the response contains the Mesocycle object that belongs to the user
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Mesocycle 1')
