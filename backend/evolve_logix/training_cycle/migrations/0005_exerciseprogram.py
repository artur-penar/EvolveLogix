# Generated by Django 4.2.5 on 2024-05-11 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('training_log', '0008_trainingsession_description'),
        ('training_cycle', '0004_trainingsession'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExerciseProgram',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField(default=0)),
                ('reps', models.PositiveIntegerField(default=1)),
                ('sets', models.PositiveIntegerField(default=1)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training_log.exercise')),
                ('training_session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exercises', to='training_cycle.trainingsession')),
            ],
        ),
    ]
