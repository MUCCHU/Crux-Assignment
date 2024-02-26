import requests, json, jwt
from copy import deepcopy
from rest_framework import viewsets
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Resume, JobPosting
import datetime
from django.contrib.auth import authenticate
from middleware.auth import *
from .serializers import ResumeSerializer, UserSerializer, JobPostingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.http import HttpResponse, JsonResponse
from utils.extract_details import extract_details
from utils.get_score import score_resume_details


User = get_user_model()

class ResumeUploadView(APIView):
    authentication_classes = [Authentication]
    def post(self, request, *args, **kwargs):
        files = request.FILES.getlist('resume')
        if len(files) == 0:
            return Response({"error": "No resume file provided"}, status=status.HTTP_400_BAD_REQUEST)
    
        for file in files:
            resume_data = {"file": file}
            serializer = ResumeSerializer(data=resume_data)
            if serializer.is_valid():
                serializer.save()
            else: 
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
                

@api_view(['POST'])
def signin(request):
    try:
        username = request.data['username']
        password = request.data['password']

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response({"error":"Incorrect credentials"}, status=401)
        
        
        payload = {
            "username": user.username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=129600),
            "iat": datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, 'SECRET', algorithm='HS256')

        data = dict()
        data["user"] = UserSerializer(user).data

        return Response({"message": "User Login Sucessful", "token": token, "data": data}, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
@api_view(['POST'])
def signup(request):
    try:
        user = User.objects.filter(username=request.data['username'])
        if user:
            return Response({"error": "User with this username already exists"}, status=400)
        user = User.objects.filter(email=request.data['email'])
        if user:
            return Response({"error": "User with this email already exists"}, status=400)

        user = UserSerializer(data=request.data)
        if user.is_valid():
            user = user.save()
        else:
            return Response({"error": user.errors}, status=400)
        
        data = deepcopy(request.data)
        data["user"] = user.id

        return Response({"message": "Account Created Successfully"}, status=201)
    except Exception as e:
        print(e)
        return Response({"error": str(e)}, status=400)
    
@api_view(['GET'])
@authentication_classes([Authentication])
def get_user(request):
    try:
        data = dict()
        data["user"] = UserSerializer(request.user).data
        return Response({"message": "User details fetched successfully", "data": data}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer

class FileDownloadView(APIView):
    def get(self, request, file_id, *args, **kwargs):
        file_obj = Resume.objects.get(pk=file_id)
        file_path = file_obj.file.path
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type="application/pdf")
            response['Content-Disposition'] = f'inline; filename="{file_obj.file.name}"'
            return response

@api_view(['POST'])
@authentication_classes([Authentication])
def run_task(request):
    try:
        job_id = request.data.get('job_id')
        job = JobPosting.objects.get(id=job_id)
        resume_files = Resume.objects.all()

        for resume_file in resume_files:
            if not resume_file.description:
                details = extract_details(resume_file.file.path)
                resume_file.description = json.dumps(details)
            else:
                details = json.loads(resume_file.description)
            
            resume_details = score_resume_details(job.title, job.description, details)
            resume_file.score = json.loads(resume_details)['relevance_score']
            resume_file.description = resume_details
            resume_file.save()

        serialized_files = ResumeSerializer(resume_files, many=True)
        return JsonResponse(serialized_files.data, safe=False, status=200)
    except JobPosting.DoesNotExist:
        return JsonResponse({'error': 'Task does not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)