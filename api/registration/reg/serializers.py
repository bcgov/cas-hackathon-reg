from rest_framework import serializers
from .models import User, UserOperator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        

class UserOperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOperator
        fields = '__all__'