from django.contrib import admin
from .models import Resume, JobPosting
from django.contrib.auth.admin import UserAdmin
from .models import User
# Register your models here.

admin.site.register(Resume)
admin.site.register(JobPosting)
admin.site.register(User)
