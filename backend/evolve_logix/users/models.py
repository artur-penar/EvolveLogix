from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# Create your models here.
class UserProfileManager(BaseUserManager):
    """Manger for user profiles."""

    def create_user(self, user_name, email,  password=None):
        """Create new user profile."""
        if not email:
            raise ValueError("User must have an email address.")

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, user_name,  password):
        """Create superuser profile."""
        # Remember to provide correct attributes in accurate place.
        # If not you will get trouble when you create superuser, and try to login to admin page.
        user = self.create_user(email=email, user_name=user_name, password=password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system."""
    email = models.EmailField(max_length=255, unique=True)
    user_name = models.CharField(max_length=255, default="user_name")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name']

    def get_full_name(self):
        """Retrieve full name."""
        return self.user_name

    def __str__(self):
        """Retrieve string representation."""
        return self.email
