# Generated by Django 4.2.4 on 2023-08-16 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reg', '0003_alter_useroperator_role_alter_useroperator_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useroperator',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending', max_length=1000),
        ),
    ]
