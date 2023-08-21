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
    user_id = UserSerializer()
    
    class Meta:
        model = UserOrganization
        fields = ['status','organization_id', 'user_id']


    # def update(self, instance, validated_data):
    #     # result = super().update(request, *args, **kwargs)
    #     breakpoint()
    #     # instance.status = validated_data.get(
    #     #     'status', instance.status)
    #     instance.save()
    #     return instance



    # def update(self, instance, validated_data):
    #     # breakpoint()
    #     result = super().update(instance, validated_data)
    #     breakpoint()
        

    #     # org_data = validated_data.pop('org')
    #     # user_org = UserOrganization.objects.update(**validated_data)
    #     # Organization.objects.update(user_org=user_org, **org_data)
    #     return user_org





