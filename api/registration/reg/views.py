from .serializers import UserOperatorSerializer, UserSerializer
from .models import User, UserOperator
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class UserOperatorViewSet(viewsets.ModelViewSet):
    queryset = UserOperator.objects.all()
    serializer_class = UserOperatorSerializer