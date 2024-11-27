from django.urls import path
from . import views

urlpatterns = [
    path('absen', views.Absen.as_view()),
    path('salary', views.Salary.as_view()),
    path('salary/<int:pk>', views.Salary.as_view()),
    path('users', views.User.as_view()),
    path('users/<int:pk>', views.User.as_view()),
]