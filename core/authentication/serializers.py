from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User

class AtuhSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'is_admin', 'is_employee', 'is_manager']

class createTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Tambahkan klaim tambahan ke token
        token['username'] = user.username
        token['name'] = user.first_name + ' ' + user.last_name
        token['email'] = user.email
        token['is_admin'] = user.is_admin
        token['is_manager'] = user.is_manager
        token['is_employee'] = user.is_employee

        return token
    
