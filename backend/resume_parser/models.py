from django.db import models
from django.contrib.auth.models import User

class Skill(models.Model):
    name = models.CharField(max_length=255, unique=True)

class Experience(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)  # Allow null for current positions
    description = models.TextField()

class Education(models.Model):
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)  # Allow null for ongoing education

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    skills = models.ManyToManyField(Skill)
    experience = models.ManyToManyField(Experience)
    education = models.ManyToManyField(Education)

class JobPosting(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    required_skills = models.ManyToManyField(Skill)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)  # Assuming a User model exists

