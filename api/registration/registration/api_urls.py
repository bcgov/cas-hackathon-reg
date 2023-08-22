from rest_framework.routers import APIRootView
from rest_framework.routers import DefaultRouter
from reg.views import UserViewSet, OrganizationViewSet, UserOrganizationViewSet, NestedUserOrganizationViewSet, SpecificUserOrganizationViewSet


class RegistrationAPIRootView(APIRootView):
    """
    Registration API root view.
    TODO: Add a description.
    """
    
router = DefaultRouter()
router.APIRootView = RegistrationAPIRootView
router.register('users', UserViewSet, basename='user')
router.register('user_organizations', UserOrganizationViewSet, basename='user-organization')
router.register('nested_user_organizations', NestedUserOrganizationViewSet)
router.register('manage_users', SpecificUserOrganizationViewSet)
router.register('organizations', OrganizationViewSet, basename='organization')
urlpatterns = router.urls