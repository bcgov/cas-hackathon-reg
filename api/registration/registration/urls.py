from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include(('registration.api_urls', 'api'), namespace='api')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('s/administration/raw/', admin.site.urls)
]
