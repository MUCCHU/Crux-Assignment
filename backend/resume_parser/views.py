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
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes

class ResumeUploadView(APIView):
    authentication_classes = [Authentication]
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('resume')
        if not file:
            return Response({"error": "No resume file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Call Affinda's API to parse the resume
        # api_key = 'aff_c60e2875907e5d64107e432b51cd6719f1b79e49'
        # headers = {'Authorization': f'Bearer {api_key}'}
        # response = requests.post('https://api.affinda.com/v1/resumes', headers=headers, files={'file': file})
        # json_file_path = settings.BASE_DIR / 'parsed_resumes' / f'{file.name}.json'
        # with open(json_file_path, 'r') as json_file:
        #     parsed_data = json.load(json_file)
        #     return Response(parsed_data, status=status.HTTP_200_OK)
        print(request.user)
        return Response({"Done": "Done something"}, status=status.HTTP_200_OK)

        # if response.status_code == 200:
        #     data = response.json()
        #     json_file_path = settings.BASE_DIR / 'parsed_resumes' / f'{file.name}.json'
            
        #     # Save parsed data to a JSON file
        #     with open(json_file_path, 'w') as json_file:
        #         json.dump(data, json_file)
        #     # Extract data and save to DB (simplified example, adapt based on actual data structure)
        #     resume_data = {
        #         "name": data.get("name"),
        #         "email": data.get("email"),
        #         "phone": data.get("phone"),
        #         "skills": ", ".join(data.get("skills", [])),
        #         "experience": " ".join([exp["companyName"] for exp in data.get("experience", [])]),
        #         "education": " ".join([edu["institutionName"] for edu in data.get("education", [])]),
        #     }
        #     serializer = ResumeSerializer(data=resume_data)
        #     if serializer.is_valid():
        #         serializer.save()
        #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     print(f"Error: {response.status_code}, Message: {response.text}")
        #     return Response({"error": "Failed to parse resume"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
        print(request.data)
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