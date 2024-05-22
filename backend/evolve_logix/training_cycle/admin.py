from django.contrib import admin
from training_cycle import models

# Register your models here.
admin.site.register(models.Mesocycle)
admin.site.register(models.Macrocycle)
admin.site.register(models.Phase)
admin.site.register(models.Microcycle)
admin.site.register(models.TrainingSession)
admin.site.register(models.ExerciseInSession)
