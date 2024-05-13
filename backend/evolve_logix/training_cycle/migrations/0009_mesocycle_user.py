# Generated by Django 4.2.5 on 2024-05-13 12:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('training_cycle', '0008_remove_phase_name_phase_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='mesocycle',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
