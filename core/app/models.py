from django.contrib.auth.models import User
from django.conf import settings
from django.db import models
from django.utils import timezone

# Create your models here.
class Absen(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    checkin = models.DateTimeField(default=timezone.now)
    checkout = models.DateTimeField(auto_now=False, blank=True, null=True)

    def __str__(self):
        return self.user.username

class Salary(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    salary = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.user.username