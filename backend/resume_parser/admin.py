from django.contrib import admin
from .models import Resume, Skill, Experience, Education, JobPosting
# Register your models here.

admin.site.register(Resume)
admin.site.register(Skill)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(JobPosting)
