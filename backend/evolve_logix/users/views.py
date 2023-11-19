from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserCreateSerializer, UserSerializer
from .models import UserProfile


class RegisterView(APIView):
    """Register user."""

    def post(self, request):
        """Handling post data into database."""

        data = request.data
        print(data)

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            # Return detailed error message.
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    """Retrieve user data."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Set for one user.
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)

class ListUserView(APIView):
    """List all users."""

    def get(self, request):
        # Set for many users.
        users = get_user_model().objects.all()
        users = UserSerializer(users, many=True)

        return Response(users.data, status=status.HTTP_200_OK)
