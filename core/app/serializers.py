from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'password','first_name', 'last_name', 'email', 'is_admin', 'is_employee', 'is_manager']

class AbsenSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Absen
        fields = ['id', 'checkin', 'checkout', 'user']
        
class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Salary
        fields = ['id', 'salary', 'description', 'user']