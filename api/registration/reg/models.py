from django.db import models

class Organization (models.Model):
class Operator (models.Model):
    class Statuses(models.TextChoices):
        PENDING = 'pending', 'Pending'
        APPROVED = 'approved', 'Approved'
        DENIED = 'denied', 'Denied'

    swrs_org_id = models.IntegerField()
    business_legal_name = models.CharField(max_length=1000)      
    english_trade_name = models.CharField(max_length=1000)
    french_trade_name = models.CharField(max_length=1000)
    cra_business_number = models.CharField(max_length=1000)
    def __str__(self):
        return self.business_legal_name
    status = models.CharField(max_length=50, choices=Statuses.choices, default=Statuses.PENDING)

class Facility(models.Model):
    organization_id = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='facilities')
    swrs_facility_id = models.IntegerField()
    facility_name = models.CharField(max_length=1000)
    facility_type = models.CharField(max_length=1000)
    status = models.CharField(max_length=1000)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    class Meta:
        verbose_name_plural = "Facilities"

class User(models.Model):
    first_name = models.CharField(max_length=1000)
    last_name = models.CharField(max_length=1000)
    email = models.CharField(max_length=1000)
    user_guid = models.CharField(max_length=1000)
    
    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name

class UserOrganization(models.Model):
    
    class Roles(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        SUPERADMIN = 'superadmin', 'SuperAdmin'
    
    class Statuses(models.TextChoices):
        PENDING = 'pending', 'Pending'
        APPROVED = 'approved', 'Approved'
        REJECTED = 'rejected', 'Rejected'
    
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='user_organizations')
    organization_id = models.ForeignKey(Organization, on_delete=models.DO_NOTHING, related_name='user_organizations')
    role = models.CharField(max_length=100, choices=Roles.choices)
    status = models.CharField(max_length=1000, choices=Statuses.choices, default=Statuses.PENDING)
