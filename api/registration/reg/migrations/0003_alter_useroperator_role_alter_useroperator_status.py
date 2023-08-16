# Generated by Django 4.2.4 on 2023-08-16 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reg', '0002_alter_facility_options_alter_facility_operator_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useroperator',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('superadmin', 'SuperAdmin')], max_length=100),
        ),
        migrations.AlterField(
            model_name='useroperator',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], max_length=1000),
        ),
    ]
