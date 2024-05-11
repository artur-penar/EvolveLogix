from django.db import models

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
