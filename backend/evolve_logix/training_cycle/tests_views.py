from django.test import TestCase
from django.urls import reverse
from .models import Mesocycle
from django.contrib.auth import get_user_model



class MesocycleListCreateViewTest(TestCase):
    def setUp(self):
        # Create a UserProfile object
        User = get_user_model()
        self.user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')
        # Create a Mesocycle object that belongs to the user
        Mesocycle.objects.create(name='Mesocycle 1', user=self.user)

        # Create a Mesocycle object that belongs to another user
        other_user = User.objects.create_user(
            email='otheruser@example.com', user_name='Other User', password='otherpass')
        Mesocycle.objects.create(name='Mesocycle 2', user=other_user)

    def obtain_login_token(self):
        # Obtain a JWT for the test user
        response = self.client.post(reverse('token_obtain_pair'), data={
            'email': 'testuser@example.com',
            'password': 'testpass',
        })
        self.assertEqual(response.status_code, 200)
        return response.data['access']

    def test_list_mesocycles(self):
        token = self.obtain_login_token()

        # Send a GET request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.get(
            reverse('mesocycle-list-create'), HTTP_AUTHORIZATION=f'Bearer {token}')

        # Check that the response has a status code of 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the response contains the Mesocycle object that belongs to the user
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Mesocycle 1')

    def test_create_mesocycle(self):
        token = self.obtain_login_token()
        print("user id", self.user.id)

        # Send a POST request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.post(reverse('mesocycle-list-create'), data={
            'name': 'Mesocycle 3'},
            HTTP_AUTHORIZATION=f'Bearer {token}',
            content_type='application/json'
        )

        # Check that the response has a status code of 201 (Created)
        self.assertEqual(response.status_code, 201)
        print("Response ", response.data)

    def test_integration_mesocycle_list_create_view(self):
        # Obtain a JWT for the test user
        token = self.obtain_login_token()

        # Send a GET request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.get(
            reverse('mesocycle-list-create'), HTTP_AUTHORIZATION=f'Bearer {token}')

        # Check that the response has a status code of 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the response contains the Mesocycle object that belongs to the user
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Mesocycle 1')

        # Send a POST request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.post(reverse('mesocycle-list-create'), data={
            'name': 'Mesocycle 3'},
            HTTP_AUTHORIZATION=f'Bearer {token}',
            content_type='application/json'
        )

        # Check that the response has a status code of 201 (Created)
        self.assertEqual(response.status_code, 201)

        # Send another GET request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.get(
            reverse('mesocycle-list-create'), HTTP_AUTHORIZATION=f'Bearer {token}')

        # Check that the response has a status code of 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the response contains the two Mesocycle objects that belong to the user
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Mesocycle 1')
        self.assertEqual(response.data[1]['name'], 'Mesocycle 3')


class MesocycleRetrieveUpdateDestroyViewTest(TestCase):
    def setUp(self):
        # Create a UserProfile object
        User = get_user_model()
        self.user = User.objects.create_user(email='testuser2@example.com',
                                             user_name='Test User 2', password='testpass2')
        self.mesocycle1 = Mesocycle.objects.create(
            name='Mesocycle 1', user=self.user)
        self.mesocycle2 = Mesocycle.objects.create(
            name='Mesocycle 2', user=self.user)

    def obtain_login_token(self):
        # Obtain a JWT for the test user
        response = self.client.post(reverse('token_obtain_pair'), data={
            'email': 'testuser2@example.com',
            'password': 'testpass2',
        })
        self.assertEqual(response.status_code, 200)
        return response.data['access']

    def test_retrieve_mesocycle(self):
        token = self.obtain_login_token()

        # Send a GET request to the MesocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.get(
            reverse('mesocycle-detail', kwargs={'pk': self.mesocycle2.pk}), HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Mesocycle 2')

    def test_update_mesocycle(self):
        print("Mesocycle 2 id: ", self.mesocycle2.pk)
        token = self.obtain_login_token()

        # Send a PUT request to the MesocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.put(
            reverse('mesocycle-detail', kwargs={'pk': self.mesocycle1.pk}), data={'name': 'Updated Mesocycle 1'}, HTTP_AUTHORIZATION=f'Bearer {token}', content_type='application/json'
        )
        print("Response ", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Updated Mesocycle 1')

        response = self.client.get(reverse('mesocycle-detail', kwargs={'pk': self.mesocycle1.pk}),
                                   HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Updated Mesocycle 1')

    def test_delete_mesocycle(self):
        token = self.obtain_login_token()

        # Send a DELETE request to the MesocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.delete(
            reverse('mesocycle-detail', kwargs={'pk': self.mesocycle1.pk}), HTTP_AUTHORIZATION=f'Bearer {token}')
        print("Remove response ", response.data)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Mesocycle.objects.count(), 1)
