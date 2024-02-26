from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.models import User
from .managers import CustomUserManager


class User(AbstractUser):
    type = models.CharField(max_length=255, default='candidate') # candidate or recruiter
    objects = CustomUserManager()

class JobPosting(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

class Resume(models.Model):
    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    score = models.FloatField(null=True, blank=True)
    file = models.FileField(null=True, blank=True, upload_to='uploads/')


