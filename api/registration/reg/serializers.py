from rest_framework import serializers
from .models import User, UserOrganization

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        fields = '__all__'
from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['swrs_org_id', 'business_legal_name', 'english_trade_name', 'french_trade_name', 'cra_business_number', 'status']
