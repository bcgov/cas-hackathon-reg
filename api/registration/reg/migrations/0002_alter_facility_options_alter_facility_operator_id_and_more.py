# Generated by Django 4.2.4 on 2023-08-15 23:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reg', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='facility',
            options={'verbose_name_plural': 'Facilities'},
        ),
        migrations.AlterField(
            model_name='facility',
            name='operator_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='facilities', to='reg.operator'),
        ),
        migrations.AlterField(
            model_name='useroperator',
            name='operator_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_operators', to='reg.operator'),
        ),
        migrations.AlterField(
            model_name='useroperator',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_operators', to='reg.user'),
        ),
    ]