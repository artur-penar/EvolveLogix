# Generated by Django 4.2.5 on 2024-08-07 07:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('training_log', '0008_trainingsession_description'),
        ('training_cycle', '0004_alter_macrocycle_end_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='macrocycle',
            name='user',
        ),
        migrations.AddField(
            model_name='macrocycle',
            name='training_log',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='macrocycles', to='training_log.traininglog'),
            preserve_default=False,
        ),
    ]
