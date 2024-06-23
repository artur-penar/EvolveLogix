import datetime
from django.db import models, transaction
from evolve_logix import settings
from training_log.models import Exercise
from operator import attrgetter

# Create your models here.


class Macrocycle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Mesocycle(models.Model):
    macrocycle = models.ForeignKey(
        Macrocycle, on_delete=models.CASCADE, related_name='mesocycles')
    name = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    duration = models.PositiveIntegerField(null=True, blank=True)

    @property
    def end_date(self):
        if self.duration is None or self.start_date is None:
            return None
        return self.start_date + datetime.timedelta(weeks=self.duration)

    def save(self, *args, **kwargs):
        with transaction.atomic():
            super().save(*args, **kwargs)
            self.validate_phase_duration()
            self.validate_overlap()

    def validate_phase_duration(self):
        total_phases_duration = sum(
            phase.duration for phase in self.phases.all())
        if self.duration < total_phases_duration:
            raise ValueError(
                "The mesocycle duration cannot be less than the sum of all phases duration.")

    def validate_overlap(self):
        overlapping_mesocycles = Mesocycle.objects.filter(
            macrocycle=self.macrocycle
        ).exclude(
            id=self.id
        )

        for mesocycle in overlapping_mesocycles:
            print(self.start_date, mesocycle.end_date,
                  self.end_date, mesocycle.start_date)
            if (self.start_date <= mesocycle.end_date) and (self.end_date >= mesocycle.start_date):
                raise ValueError("Mesocycles cannot overlap.")

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

    mesocycle = models.ForeignKey(
        Mesocycle, on_delete=models.CASCADE, related_name='phases')
    type = models.CharField(
        max_length=200, choices=PHASE_TYPES, default='Hypertrophy')
    start_date = models.DateField(null=True, blank=True)
    duration = models.PositiveIntegerField(null=True, blank=True)

    @property
    def end_date(self):
        if self.duration is None or self.start_date is None:
            return None
        return self.start_date + datetime.timedelta(weeks=self.duration) - datetime.timedelta(days=1)

    def save(self, *args, **kwargs):
        if self.duration > self.mesocycle.duration:
            raise ValueError(
                "The phase duration cannot be greater than the mesocycle duration.")
        total_phases_duration = sum(
            phase.duration for phase in self.mesocycle.phases.all())
        total_phases_duration += self.duration
        if total_phases_duration > self.mesocycle.duration:
            raise ValueError(
                "The sum of all phases duration cannot be greater than the mesocycle duration.")

        # Automatically set the start  date of the phase to the end date of the last phase
        phases = sorted(self.mesocycle.phases.all(),
                        key=attrgetter('end_date'), reverse=True)
        last_phase = phases[0] if phases else None
        if last_phase:
            self.start_date = last_phase.end_date + datetime.timedelta(days=1)
        else:
            # This is the first phase. Set start_date same like mesocycle start date.
            self.start_date = self.mesocycle.start_date

        self.validate_start_date()
        super().save(*args, **kwargs)

    def validate_start_date(self):
        phases = sorted(self.mesocycle.phases.all(),
                        key=attrgetter('end_date'), reverse=True)
        last_phase = phases[0] if phases else None
        if last_phase and last_phase.end_date > self.start_date:
            raise ValueError(
                "The start date of the phase must be after the end date of the last phase.")

    def __str__(self):
        return f"{self.mesocycle.name} - {self.type}"


class TrainingSession(models.Model):
    """
    A model representing a training session.

    Attributes:
        training_log (ForeignKey): The training log associated with the training session.
        date (DateField): The date of the training session.
        comment (TextField, optional): A comment about the training session (default is None).
    """
    phase = models.ForeignKey(
        Phase, on_delete=models.CASCADE, default=1, related_name='training_sessions')
    order = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('phase', 'order')

    def __str__(self):
        return f"Training Session {self.order}"


class ExerciseInSession(models.Model):
    training_session = models.ForeignKey(
        TrainingSession, on_delete=models.CASCADE, related_name='exercises')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.training_session} - {self.exercise}"


class Microcycle(models.Model):
    exercise_in_session = models.ForeignKey(
        ExerciseInSession, on_delete=models.CASCADE, related_name='microcycles')
    order = models.PositiveIntegerField(default=1)
    weight = models.FloatField(null=True, blank=True)
    repetitions = models.PositiveIntegerField(null=True, blank=True)
    sets = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('exercise_in_session', 'order')

    def __str__(self):
        return f"Microcycle {self.order} - {self.exercise_in_session.exercise.name}: weight:{self.weight}, reps:{self.repetitions}, sets:{self.sets}"
