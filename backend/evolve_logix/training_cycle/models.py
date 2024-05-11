from django.db import models
from training_log.models import Exercise

# Create your models here.


class Mesocycle(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Macrocycle(models.Model):
    mesocycle = models.ForeignKey(Mesocycle, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Phase(models.Model):
    macrocycle = models.ForeignKey(Macrocycle, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Microcycle(models.Model):
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('phase', 'order')
    
    def __str__(self):
        return f"Macrocycle {self.order}"

class TrainingSession(models.Model):
    """
    A model representing a training session.

    Attributes:
        training_log (ForeignKey): The training log associated with the training session.
        date (DateField): The date of the training session.
        comment (TextField, optional): A comment about the training session (default is None).
    """
    microcycle = models.ForeignKey(Microcycle, on_delete=models.CASCADE, related_name='training_sessions')
    order = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('microcycle', 'order')

    def __str__(self):
        return f"Training Session {self.order}"
