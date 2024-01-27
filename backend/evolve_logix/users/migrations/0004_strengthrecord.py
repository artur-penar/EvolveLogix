# Generated by Django 4.2.5 on 2024-01-25 07:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('training_log', '0008_trainingsession_description'),
        ('users', '0003_alter_userdetail_arm_alter_userdetail_calves_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='StrengthRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=5)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training_log.exercise')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]