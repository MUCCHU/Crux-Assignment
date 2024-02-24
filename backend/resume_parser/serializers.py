from rest_framework import serializers
from .models import Resume, Skill, JobPosting
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
    # def validate_password(self, value):
    #     validate_password(value)
    #     return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class JobPostingSerializer(serializers.ModelSerializer):
    required_skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = JobPosting
        fields = ['id', 'title', 'description', 'required_skills', 'posted_by']