from django.db import models
from evolve_logix import settings
from django.db.models import Max
# Create your models here.


class MuscleGroup(models.Model):
    """Model representing a muscle group."""
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Exercise(models.Model):
    """Model representing an exercise."""
    name = models.CharField(max_length=100)
    description = models.TextField()
    muscle_group = models.ManyToManyField(MuscleGroup)

    def __str__(self):
        return self.name


class Set(models.Model):
    """
    A set performed during an exercise session.

    Attributes:
        set_number (int): The number of the set within the exercise session.
        exercise_in_session (ExerciseInSession): The exercise performed during the session.
        weight (float): The weight lifted during the set.
        repetitions (int): The number of repetitions performed during the set.
        comment (str, optional): A comment about the set (default is None).
    """
    set_number = models.PositiveIntegerField(default=1)
    exercise_in_session = models.ForeignKey(
        'ExerciseInSession', related_name='sets', on_delete=models.CASCADE)
    weight = models.FloatField()
    repetitions = models.PositiveIntegerField()
    is_completed = models.BooleanField(default=True)
    comment = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # This is a new object, so it doesn't have a primary key yet
            max_set_number = Set.objects.filter(exercise_in_session=self.exercise_in_session).aggregate(
                Max('set_number'))['set_number__max']
            self.set_number = (max_set_number or 0) + 1
        super(Set, self).save(*args, **kwargs)

    def __str__(self):
        return f"Nr: {self.set_number} | Weight: {self.weight} | Reps: {self.repetitions}|Comment: {self.comment}"


class TrainingLog(models.Model):
    """
    A model representing a training log for a user.

    Attributes:
        user (ForeignKey): The user associated with the training log.
        name (CharField): The name of the training log.
    """

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(default='Log', max_length=100)

    def __str__(self):
        return f"{self.user.user_name} - {self.name}"


class TrainingSession(models.Model):
    """
    A model representing a training session.

    Attributes:
        training_log (ForeignKey): The training log associated with the training session.
        date (DateField): The date of the training session.
        comment (TextField, optional): A comment about the training session (default is None).
    """
    training_log = models.ForeignKey(
        TrainingLog, on_delete=models.CASCADE, related_name='training_sessions')
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    comment = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.training_log.user.user_name} - {self.training_log.name} - {self.description}: {self.date}"


class ExerciseInSession(models.Model):
    """
    A model representing an exercise performed during a training session.

    Attributes:
        training_session (ForeignKey): The training session associated with the exercise.
        exercise (ForeignKey): The exercise associated with the exercise.
        order (PositiveIntegerField): The order of the exercise within the training session.
        comment (TextField, optional): A comment about the exercise (default is None).
    """
    training_session = models.ForeignKey(
        TrainingSession, on_delete=models.CASCADE, related_name='exercises')
    exercise = models.ForeignKey(
        Exercise, on_delete=models.CASCADE, related_name='exercises_in_session')
    order = models.PositiveIntegerField(default=1)
    comment = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            max_order = ExerciseInSession.objects.filter(
                training_session=self.training_session).aggregate(Max('order'))['order__max']
            self.order = (max_order or 0) + 1
        super(ExerciseInSession, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.order} | {self.exercise.name} | {self.training_session.date}"
