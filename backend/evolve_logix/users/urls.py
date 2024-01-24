from django.urls import path

from .views import RegisterView, RetrieveUserView, ListUserView, UserDetailCreateUpdateView, ListUserDetailsView, CreateUserDetailView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieveUserView.as_view()),
    path('list', ListUserView.as_view()),
    path('detail/<int:pk>', UserDetailCreateUpdateView.as_view()),
    path('detail/all', ListUserDetailsView.as_view()),
    path('detail/create', CreateUserDetailView.as_view()),

]
