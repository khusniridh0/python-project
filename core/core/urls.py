from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('auth/', include('authentication.urls')),
    path('api/v1/', include('app.urls')),
    path('admin/', admin.site.urls),
]
