# Generated by Django 2.2.4 on 2020-12-15 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20201215_1434'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='basic',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='basic',
            name='longitude',
        ),
        migrations.AddField(
            model_name='basic',
            name='address',
            field=models.TextField(default=''),
        ),
    ]
