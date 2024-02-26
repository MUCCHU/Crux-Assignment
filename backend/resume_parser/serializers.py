from rest_framework import serializers
from .models import Resume, JobPosting
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id','file', 'score', 'description']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'type']
    # def validate_password(self, value):
    #     validate_password(value)
    #     return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class JobPostingSerializer(serializers.ModelSerializer):


    class Meta:
        model = JobPosting
        fields = ['id', 'title', 'description']

