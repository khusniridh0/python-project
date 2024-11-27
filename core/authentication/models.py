from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    
    groups = models.ManyToManyField(
        'auth.Group', 
        related_name='authentication_user_set', 
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', 
        related_name='authentication_user_permissions', 
        blank=True
    )
    
    def __str__(self):
        return self.username