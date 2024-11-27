from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from . import serializers
from . import models

class User(APIView):
    
    def get(self, request):
        if not request.user.is_admin and not request.user.is_manager:
            raise PermissionDenied("Access Denied")
        
        User = get_user_model()
        users = User.objects.all()
        serializer = serializers.UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if not request.user.is_admin and not request.user.is_manager:
            raise PermissionDenied("Access Denied")
        
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        if not request.user.is_admin and not request.user.is_manager:
            raise PermissionDenied("Access Denied")
        
        User = get_user_model()
        user = User.objects.get(pk=pk)
        serializer = serializers.UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if not request.user.is_admin and not request.user.is_manager:
            raise PermissionDenied("Access Denied")
        
        User = get_user_model()
        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Absen(APIView):
    
    def get(self, request):
        if not request.user.is_admin and not request.user.is_manager and not request.user.is_employee:
            raise PermissionDenied("Access Denied")
        
        absens = models.Absen.objects.all()
        serializer = serializers.AbsenSerializer(absens, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if not request.user.is_employee:
            raise PermissionDenied("Access Denied")
        
        serializer = serializers.AbsenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class Salary(APIView):
    
    def get(self, request):
        if not request.user.is_admin and not request.user.is_manager and not request.user.is_employee:
            raise PermissionDenied("Access Denied")
        
        employees = models.Salary.objects.all()
        serializer = serializers.SalarySerializer(employees, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if not request.user.is_admin and not request.user.is_manager:
            raise PermissionDenied("Access Denied")
        
        serializer = serializers.SalarySerializer(data=request.data)
        if serializer.is_valid():
            if models.Salary.objects.filter(user=request.data.get('user')).exists():
                employee = models.Salary.objects.get(user=request.data.get('user'))
                serializer = serializers.SalarySerializer(employee, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()
                return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)