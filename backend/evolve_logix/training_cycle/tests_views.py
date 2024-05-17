import datetime
from django.test import TestCase
from django.urls import reverse
from training_log.models import Exercise, MuscleGroup
from .models import (Mesocycle, Macrocycle, Phase,
                     Microcycle, TrainingSession, ExerciseInSession)
from django.contrib.auth import get_user_model


class BaseTest(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            email='testuser@example.com', user_name='Test User', password='testpass')

        self.mesocycle1 = Mesocycle.objects.create(
            name='Mesocycle 1', user=self.user)
        self.mesocycle2 = Mesocycle.objects.create(
            name='Mesocycle 2', user=self.user)

        self.macrocycle1 = Macrocycle.objects.create(
            name='Macrocycle 1', mesocycle=self.mesocycle1)

        self.macrocycle2 = Macrocycle.objects.create(
            name='Macrocycle 2', mesocycle=self.mesocycle2
        )

        self.phase = Phase.objects.create(
            type='Hypertrophy', macrocycle=self.macrocycle1)

        self.phase2 = Phase.objects.create(
            type='Strength', macrocycle=self.macrocycle2)

        self.microcycle = Microcycle.objects.create(phase=self.phase, order=1)

        self.microcycle2 = Microcycle.objects.create(phase=self.phase, order=2)

        self.training_session = TrainingSession.objects.create(
            microcycle=self.microcycle, order=1)

        muscle_group = MuscleGroup.objects.create(name="Pectorals")

        bench_press = Exercise.objects.create(
            name='Bench Press')

        bench_press.muscle_group.add(muscle_group)

        self.exercise_in_session = ExerciseInSession.objects.create(
            exercise=bench_press, training_session=self.training_session, weight=100, sets=3, repetitions=10
        )

        self.token = self.obtain_login_token()

    def obtain_login_token(self):
        # Obtain a JWT for the test user
        response = self.client.post(reverse('token_obtain_pair'), data={
            'email': 'testuser@example.com',
            'password': 'testpass',
        })
        self.assertEqual(response.status_code, 200)
        return response.data['access']


class MesocycleListCreateViewTest(BaseTest):
    def test_list_mesocycles(self):
        # Send a GET request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.get(
            reverse('mesocycle-list-create'), HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Check that the response has a status code of 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the response contains the Mesocycle object that belongs to the user
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Mesocycle 1')

    def test_create_mesocycle(self):
        # Send a POST request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.post(reverse('mesocycle-list-create'), data={
            'name': 'Mesocycle 3',
            'user': self.user.pk
        },
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json'
        )

        # Check that the response has a status code of 201 (Created)
        self.assertEqual(response.status_code, 201)

    def test_integration_mesocycle_list_create_view(self):
        # Send a GET request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.get(
            reverse('mesocycle-list-create'), HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Check that the response has a status code of 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the response contains the Mesocycle object that belongs to the user
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Mesocycle 1')

        # Send a POST request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.post(reverse('mesocycle-list-create'), data={
            'name': 'Mesocycle 3',
            'user': self.user.pk,
        },
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json'
        )

        # Check that the response has a status code of 201 (Created)
        self.assertEqual(response.status_code, 201)

        # Send another GET request to the MesocycleListCreateView with the JWT in the Authorization header
        response = self.client.get(
            reverse('mesocycle-list-create'), HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Check that the response has a status code of 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the response contains the two Mesocycle objects that belong to the user
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]['name'], 'Mesocycle 1')
        self.assertEqual(response.data[1]['name'], 'Mesocycle 2')


class MesocycleRetrieveUpdateDestroyViewTest(BaseTest):
    def test_retrieve_mesocycle(self):
        # Send a GET request to the MesocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.get(
            reverse('mesocycle-detail', kwargs={'pk': self.mesocycle2.pk}), HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Mesocycle 2')

    def test_update_mesocycle(self):
        # Send a PUT request to the MesocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.put(
            reverse('mesocycle-detail', kwargs={'pk': self.mesocycle1.pk}),
            data={'name': 'Updated Mesocycle 1', 'user': self.user.pk}, HTTP_AUTHORIZATION=f'Bearer {self.token}', content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Updated Mesocycle 1')

        response = self.client.get(reverse('mesocycle-detail', kwargs={'pk': self.mesocycle1.pk}),
                                   HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Updated Mesocycle 1')

    def test_delete_mesocycle(self):
        # Send a DELETE request to the MesocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.delete(
            reverse('mesocycle-detail', kwargs={'pk': self.mesocycle1.pk}), HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Mesocycle.objects.count(), 1)


class MacrocycleListCreateViewTest(BaseTest):
    def test_list_macrocycles(self):
        # Send a GET request to the MacrocycleListCreateView with the JWT in the Authorization header
        response = self.client.get(reverse('macrocycle-list-create'),
                                   HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)

    def test_create_macrocycle(self):
        # Send a POST request to the MacrocycleListCreateView with the JWT in the Authorization header
        response = self.client.post(reverse('macrocycle-list-create'), data={
            'name': 'Macrocycle 3',
            'mesocycle': self.mesocycle1.pk,
            'start_date': datetime.date.today(),
        },
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json')

        self.assertEqual(response.status_code, 201)


class MacrocycleRetrieveUpdateDestroyViewTest(BaseTest):
    def test_retrieve_macrocycle(self):
        # Send a GET request to the MacrocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.get(
            reverse('macrocycle-detail', kwargs={'pk': self.macrocycle1.pk}), HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)

    def test_update_macrocycle(self):
        # Send a PUT request to the MacrocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.put(
            reverse('macrocycle-detail', kwargs={'pk': self.macrocycle1.pk}),
            data={'name': 'Updated Macrocycle 1', 'mesocycle': self.mesocycle1.pk,
                  'start_date': datetime.date.today()},
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)

    def test_delete_macrocycle(self):
        # Send a DELETE request to the MacrocycleRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.delete(
            reverse('macrocycle-detail', kwargs={'pk': self.macrocycle1.pk}),
            HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Macrocycle.objects.count(), 1)


class PhaseListCreateViewTest(BaseTest):
    def test_list_phases(self):
        # Send a GET request to the PhaseListCreateView with the JWT in the Authorization header
        response = self.client.get(reverse('phase-list-create'),
                                   HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_create_phase(self):
        # Send a POST request to the PhaseListCreateView with the JWT in the Authorization header
        response = self.client.post(reverse('phase-list-create'), data={
            'type': 'Peak',
            'macrocycle': self.macrocycle1.pk,
            'start_date': datetime.date.today(),
        },
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Phase.objects.count(), 3)


class PhaseRetrieveUpdateDestroyViewTest(BaseTest):
    def test_retrieve_phase(self):
        # Send a GET request to the PhaseRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.get(
            reverse('phase-detail', kwargs={'pk': self.phase.pk}), HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)

    def test_update_phase(self):
        # Send a PUT request to the PhaseRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.put(
            reverse('phase-detail', kwargs={'pk': self.phase.pk}),
            data={'type': 'Deload', 'macrocycle': self.macrocycle1.pk,
                  'start_date': datetime.date.today()},
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_phase(self):
        # Send a DELETE request to the PhaseRetrieveUpdateDestroyView with the JWT in the Authorization header
        response = self.client.delete(
            reverse('phase-detail', kwargs={'pk': self.phase.pk}),
            HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Phase.objects.count(), 1)


class MicrocycleListCreateViewTest(BaseTest):
    def test_list_microcycles(self):
        response = self.client.get(reverse('microcycle-list-create'),
                                   HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_create_microcycle(self):
        response = self.client.post(reverse('microcycle-list-create'), data={
            'phase': self.phase.pk,
        },
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)


class MicrocycleRetrieveUpdateDestroyViewTest(BaseTest):
    def test_retrieve_microcycle(self):
        response = self.client.get(
            reverse('microcycle-detail', kwargs={'pk': self.microcycle.pk}),
            HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )
        self.assertEqual(response.status_code, 200)

    def test_update_microcycle(self):
        response = self.client.put(
            reverse('microcycle-detail', kwargs={'pk': self.microcycle.pk}),
            data={'phase': self.phase2.pk},
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        print(response.data)

    def test_delete_microcycle(self):
        response = self.client.delete(
            reverse('microcycle-detail', kwargs={'pk': self.microcycle.pk}),
            HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )
        self.assertEqual(response.status_code, 204)


class TrainingSessionListCreateViewTest(BaseTest):
    def test_list_training_sessions(self):
        response = self.client.get(reverse('training-session-list-create'),
                                   HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_create_training_session(self):
        response = self.client.post(reverse('training-session-list-create'),
                                    data={'microcycle': self.microcycle.pk})

        self.assertEqual(response.status_code, 201)
        self.assertEqual(TrainingSession.objects.count(), 2)


class TrainingSessionRetrieveUpdateDestroyViewTest(BaseTest):
    def test_retrieve_training_session(self):
        response = self.client.get(
            reverse('training-session-detail',
                    kwargs={'pk': self.training_session.pk}),
            HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )
        self.assertEqual(response.status_code, 200)

    def test_update_training_session(self):
        response = self.client.put(
            reverse('training-session-detail',
                    kwargs={'pk': self.training_session.pk}),
            data={'microcycle': self.microcycle2.pk},
            HTTP_AUTHORIZATION=f'Bearer {self.token}',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_training_session(self):
        response = self.client.delete(
            reverse('training-session-detail',
                    kwargs={'pk': self.training_session.pk}),
            HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(TrainingSession.objects.count(), 0)


class ExerciseInSessionListCreateViewTest(BaseTest):
    def test_list_exercise_in_session(self):
        response = self.client.get(reverse('exercise-in-session-list-create'),
                                   HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, 200)

    def test_post_valid_data(self):
        # Create a POST request with valid data
        data = {
            'exercise': Exercise.objects.first().pk,
            'training_session': TrainingSession.objects.first().pk,
            'weight': 200,
            'repetitions': 10,
            'sets': 3

        }
        response = self.client.post(reverse('exercise-in-session-list-create'),
                                    data=data,
                                    HTTP_AUTHORIZATION=f'Bearer {self.token}',
                                    content_type='application/json'
                                    )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(ExerciseInSession.objects.count(), 2)

    def post_post_invalid_data(self):
        # Create a POST request with invalid data
        data = {
            'exercise': Exercise.objects.first().pk,
            'training_session': TrainingSession.objects.first().pk,
            'weight': 200,
            'repetitions': 10,
        }
        response = self.client.post(reverse('exercise-in-session-list-create'),
                                    data=data,
                                    HTTP_AUTHORIZATION=f'Bearer {self.token}',
                                    content_type='application/json'
                                    )
        self.assertEqual(response.status_code, 400)
