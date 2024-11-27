from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import createTokenSerializer
# Create your views here.

class CustomToken(TokenObtainPairView):
    serializer_class = createTokenSerializer