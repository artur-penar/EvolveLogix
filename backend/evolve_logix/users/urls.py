from django.urls import path

from .views import RegisterView, RetrieveUserView, ListUserView, UserDetailRetrieveUpdateView, ListUserDetailsView, CreateUserDetailView, ListStrengthRecordsView, CreateStrengthRecordView


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieveUserView.as_view()),
    path('list', ListUserView.as_view()),
    path('detail/<int:pk>', UserDetailRetrieveUpdateView.as_view()),
    path('detail/all', ListUserDetailsView.as_view()),
    path('detail/create', CreateUserDetailView.as_view()),
    path('strength-records/all', ListStrengthRecordsView.as_view()),
    path('strength-records/create', CreateStrengthRecordView.as_view()),
]
