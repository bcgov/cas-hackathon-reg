"""
URL configuration for registration project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from reg import views

router = routers.DefaultRouter()
router.register(r'organizations', views.OrganizationsView, 'organizations')

urlpatterns = [
    path('s/administration/raw/', admin.site.urls),
    path('api/', include(router.urls)),
    # path("organizations/", views.organizations, name="organizations"),
    # path("organizations/<int:organization_id>/", views.organization, name="organizations"),
    # path("organizations/approve/<int:pk>/", views.OrganizationPartialUpdateView.as_view(), name="approve_org")
]
