import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from django.urls import resolve

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.protected_routes = settings.PROTECTED_ROUTES

    def __call__(self, request):
        if any(request.path.startswith(route) for route in self.protected_routes):
            token = request.headers.get('Authorization')
            
            if token is None:
                raise AuthenticationFailed("Token not provided")

            try:
                token = token.split(' ')[1]
                decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                request.user = decoded_token
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed("Token expired")
            except jwt.InvalidTokenError:
                raise AuthenticationFailed("Invalid token")

        response = self.get_response(request)
        return response