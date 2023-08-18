# Generated by Django 4.2.4 on 2023-08-17 20:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reg', '0004_alter_useroperator_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserOrganization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('admin', 'Admin'), ('superadmin', 'SuperAdmin')], max_length=100)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending', max_length=1000)),
            ],
        ),
        migrations.RenameField(
            model_name='facility',
            old_name='operator_id',
            new_name='organization_id',
        ),
        migrations.RenameModel(
            old_name='Operator',
            new_name='Organization',
        ),
        migrations.DeleteModel(
            name='UserOperator',
        ),
        migrations.AddField(
            model_name='userorganization',
            name='organization_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_organizations', to='reg.organization'),
        ),
        migrations.AddField(
            model_name='userorganization',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_organizations', to='reg.user'),
        ),
    ]