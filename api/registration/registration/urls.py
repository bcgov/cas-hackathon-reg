from django.contrib import admin
from django.urls import include, path
from reg import views

urlpatterns = [
    path('', include(('registration.api_urls', 'api'), namespace='api')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('s/administration/raw/', admin.site.urls),
    # path("user_organizations/<int:user_organization_id>/", views.user_organization, name="user_organizations"),
    path("organizations/", views.organizations, name="organizations"),
    path("organizations/<int:organization_id>/", views.organization, name="organizations"),
    path("organizations/approve/<int:pk>/", views.OrganizationPartialUpdateView.as_view(), name="approve_org")
]
