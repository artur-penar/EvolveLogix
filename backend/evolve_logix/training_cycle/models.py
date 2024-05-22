from django.db import models
from evolve_logix import settings
from training_log.models import Exercise

# Create your models here.


class Macrocycle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Mesocycle(models.Model):
    macrocycle = models.ForeignKey(Macrocycle, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Phase(models.Model):
    PHASE_TYPES = (
        ('Hypertrophy', 'Hypertrophy'),
        ('Strength', 'Strength'),
        ('Peak', 'Peak'),
        ('Deload', 'Deload'),
        ('Conditioning', 'Conditioning')
    )

    mesocycle = models.ForeignKey(Mesocycle, on_delete=models.CASCADE)
    type = models.CharField(
        max_length=200, choices=PHASE_TYPES, default='Hypertrophy')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.mesocycle.name} - {self.type}"


class Microcycle(models.Model):
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('phase', 'order')

    def __str__(self):
        return f"Microcycle {self.order}"


class TrainingSession(models.Model):
    """
    A model representing a training session.

    Attributes:
        training_log (ForeignKey): The training log associated with the training session.
        date (DateField): The date of the training session.
        comment (TextField, optional): A comment about the training session (default is None).
    """
    microcycle = models.ForeignKey(
        Microcycle, on_delete=models.CASCADE, related_name='training_sessions')
    order = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('microcycle', 'order')

    def __str__(self):
        return f"Training Session {self.order}"


class ExerciseInSession(models.Model):
    training_session = models.ForeignKey(
        TrainingSession, on_delete=models.CASCADE, related_name='exercises')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    weight = models.FloatField(null=True, blank=True)
    repetitions = models.PositiveIntegerField(null=True, blank=True)
    sets = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.exercise.name} x {self.weight} x {self.repetitions} x {self.sets}"
