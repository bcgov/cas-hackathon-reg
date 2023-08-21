
from .serializers import RequestAccessSerializer, UserSerializer, OrganizationSerializer, ApproveOrDenySerializer
from .models import User, UserOrganization
from rest_framework import viewsets
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponse
from rest_framework import status
from .models import Organization
from rest_framework import generics
from rest_framework.decorators import api_view
from itertools import chain

def operator(request, operator_id):
    operator = Operator.objects.get(id=operator_id)
    context = {
        "operator": operator,
    }
    return render(request, "operator/index.html", context)

@api_view(['GET', 'PUT'])
def organization(request, organization_id):
    try:
        organization = Organization.objects.get(id=organization_id)
    except:
        return JsonResponse({'message': 'Organization does not exist.'})

    if request.method == 'GET':

        # context = {
        #     "organization": organization,
        # }
        # return render(request, "organization/index.html", context)
        organization_serializer = OrganizationSerializer(organization)
        return JsonResponse(organization_serializer.data)
    elif request.method == 'PUT':
        organization_data = JSONParser().parse(request)
        organization_serializer = OrganizationSerializer(organization, data=organization_data)
        if organization_serializer.is_valid():
            organization_serializer.save()
            return JsonResponse(organization_serializer.data)
        return JsonResponse(organization_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
def organizations(request):
    all_organizations_list = Organization.objects.order_by("business_legal_name")
    context = {
        "all_organizations_list": all_organizations_list,
    }
    return render(request, "organizations/index.html", context)

def user_organizations(request):
    all_user_organizations_list = UserOrganization.objects.order_by("id")
    context = {
        "all_user_organizations_list": all_user_organizations_list,
    }
    return render(request, "user_organizations/index.html", context)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class UserOrganizationViewSet(viewsets.ModelViewSet):
    queryset = UserOrganization.objects.all()
    serializer_class = RequestAccessSerializer

class ApproveOrDenyViewset(viewsets.ModelViewSet):
    queryset = UserOrganization.objects.all()
    serializer_class = ApproveOrDenySerializer
    # def put(self, request, *args, **kwargs):
    #     result = super().partial_update(request, *args, **kwargs)
    # def put(self, request, *args, **kwargs):
    #     result = self.partial_update(request, *args, **kwargs)
    #     breakpoint()
        # UserOrganization.objects.get(pk=kwargs.get('pk'))

        

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

class OrganizationUpdateView(generics.UpdateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

class OrganizationPartialUpdateView(generics.UpdateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

