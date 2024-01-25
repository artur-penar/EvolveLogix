from django.contrib import admin
from users import models

# Register your models here.
admin.site.register(models.UserProfile)
admin.site.register(models.UserDetail)
admin.site.register(models.StrengthRecord)
