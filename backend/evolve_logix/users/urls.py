from django.urls import path

from .views import RegisterView, RetrieveUserView, ListUserView, UserDetailCreateUpdateView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieveUserView.as_view()),
    path('list', ListUserView.as_view()),
    path('detail/<int:pk>', UserDetailCreateUpdateView.as_view()),

]
