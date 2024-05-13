from django.urls import path
from views import MesocycleListCreateView

urlpatterns = [
    path('mesocycles/', MesocycleListCreateView.as_view(),
         name='mesocycle-list-create'),
]
