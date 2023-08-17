from django.contrib import admin
from .models import Facility, Organization, User, UserOrganization

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('swrs_org_id', 'business_legal_name', 'english_trade_name', 'french_trade_name', 'cra_business_number')


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('organization_id','swrs_facility_id', 'facility_name', 'facility_type', 'status', 'latitude', 'longitude')
    

@admin.register(UserOrganization)
class UserOrganizationAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'organization_id', 'role', 'status')


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'user_guid')
    
