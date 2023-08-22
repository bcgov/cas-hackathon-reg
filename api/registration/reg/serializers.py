from rest_framework import serializers
from .models import User, UserOrganization, Organization

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'


class RequestAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        fields = '__all__'
  

class ApproveOrDenySerializer(serializers.ModelSerializer):
    organization_id = OrganizationSerializer()
    user_id = UserSerializer(read_only=True)
    
    class Meta:
        model = UserOrganization
        fields = ['id','status','organization_id', 'user_id']


    def update(self, instance, validated_data):
        # user organization info
        instance.status = validated_data.get(
            'status', instance.status)
        instance.save()

        # organization info
        organization = instance.organization_id
        organization.status = validated_data.get(
            'status', instance.status)
        organization.save()
        return instance







