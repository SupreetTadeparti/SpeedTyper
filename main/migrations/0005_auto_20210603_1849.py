# Generated by Django 3.1.3 on 2021-06-03 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20210603_1803'),
    ]

    operations = [
        migrations.AddField(
            model_name='typing',
            name='tests_taken',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='typing',
            name='average_wpm',
            field=models.IntegerField(),
        ),
    ]
