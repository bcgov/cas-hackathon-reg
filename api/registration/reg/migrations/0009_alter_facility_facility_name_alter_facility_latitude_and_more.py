# Generated by Django 4.2.4 on 2023-08-24 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reg', '0008_alter_facility_facility_name_alter_facility_latitude_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facility',
            name='facility_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='facility',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='facility',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='business_legal_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='cra_business_number',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='english_trade_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='french_trade_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
