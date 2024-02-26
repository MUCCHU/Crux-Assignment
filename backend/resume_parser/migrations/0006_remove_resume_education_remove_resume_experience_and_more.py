# Generated by Django 5.0.2 on 2024-02-26 05:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume_parser', '0005_remove_resume_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resume',
            name='education',
        ),
        migrations.RemoveField(
            model_name='resume',
            name='experience',
        ),
        migrations.RemoveField(
            model_name='jobposting',
            name='required_skills',
        ),
        migrations.RemoveField(
            model_name='resume',
            name='skills',
        ),
        migrations.RemoveField(
            model_name='resume',
            name='email',
        ),
        migrations.RemoveField(
            model_name='resume',
            name='name',
        ),
        migrations.RemoveField(
            model_name='resume',
            name='phone',
        ),
        migrations.AddField(
            model_name='resume',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='resume',
            name='job',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='resume_parser.jobposting'),
        ),
        migrations.DeleteModel(
            name='Education',
        ),
        migrations.DeleteModel(
            name='Experience',
        ),
        migrations.DeleteModel(
            name='Skill',
        ),
    ]
