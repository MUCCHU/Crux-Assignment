from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from .views import *
from rest_framework.routers import DefaultRouter
from .views import JobPostingViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'jobs', JobPostingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('signin/', signin, name='signin'),
    path('signup/', signup, name='signup'),
    path('verify/', get_user, name='verify'),
    path('score/', run_task, name='score')
]
