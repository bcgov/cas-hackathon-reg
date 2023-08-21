from rest_framework.routers import APIRootView
from rest_framework.routers import DefaultRouter
from reg.views import UserViewSet, UserOrganizationViewSet, OrganizationViewSet, ApproveOrDenyViewset


class RegistrationAPIRootView(APIRootView):
    """
    Registration API root view.
    TODO: Add a description.
    """
    
router = DefaultRouter()
router.APIRootView = RegistrationAPIRootView
router.register('users', UserViewSet, basename='user')
router.register('user_organizations', ApproveOrDenyViewset, basename='user-organization')
router.register('organizations', OrganizationViewSet, basename='organization')
urlpatterns = router.urls