from django.contrib import admin
from training_log import models

# Register your models here.
admin.site.register(models.Exercise)
admin.site.register(models.MuscleGroup)
admin.site.register(models.Set)
admin.site.register(models.TrainingLog)
admin.site.register(models.ExerciseInSession)
admin.site.register(models.TrainingSession)
