from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from training_log.models import Exercise


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
        user = self.create_user(
            email=email, user_name=user_name, password=password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system."""
    email = models.EmailField(max_length=155, unique=True)
    user_name = models.CharField(max_length=155, default="user_name")
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


class UserDetail(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    height = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    weight = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    calves = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    thigh = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    hips = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    waist = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    chest = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    neck = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    arm = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)
    forearm = models.DecimalField(max_digits=4, decimal_places=1, default=0.00)


class StrengthRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    record_date = models.DateTimeField(auto_now_add=True)
    percent_increase = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f'{self.user.user_name} {self.record_date} - {self.exercise.name} - {self.weight}kg'

    def save(self, *args, **kwargs):
        # Get the previous record for the same exercise and user
        previous_record = StrengthRecord.objects.filter(
            user=self.user,
            exercise=self.exercise,
            record_date__lt=self.record_date
        ).order_by('-record_date').first()

        # If there is a previous record, calculate the percentage increase
        if previous_record is not None:
            increase = self.weight - previous_record.weight
            self.percent_increase = (
                increase / previous_record.weight) * 100
        else:
            self.percent_increase = None
        super().save(*args, **kwargs)
