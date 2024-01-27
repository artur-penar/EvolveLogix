from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core import exceptions
from .models import UserDetail, StrengthRecord
from training_log.serializers import ExerciseSerializer

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    """Handle data to create user."""

    class Meta:
        """Meta class to define model and fields."""
        model = User
        fields = ['email', 'user_name', 'password']

    def validate(self, data):
        """Handle password extra validation. Triggered automatically after UserCreateSerializer.is_valid() method
        called. Dont apply superuser which has they own validation set in setting files. """
        user = User(**data)
        password = data.get('password')

        try:
            # Using django.contrib.auth built in method.
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializers_error = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializers_error['non_field_errors']}
            )
        return data

    def create(self, validated_data):
        """Handle create user using validated data."""
        user = User.objects.create_user(
            email=validated_data['email'],
            user_name=validated_data['user_name'],
            password=validated_data['password']
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    """Handle to return only two fields email and user_user_name to prevent display password on the scrren."""

    class Meta:
        model = User
        fields = ('id', 'email', 'user_name')


class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserDetail
        fields = ['updated_at',  'weight', 'height', 'chest', 'arm', 'forearm', 'hips', 'calves', 'thigh',
                  'waist',  'neck', ]


class StrengthRecordSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = StrengthRecord
        fields = ['record_date', 'exercise', 'weight']
