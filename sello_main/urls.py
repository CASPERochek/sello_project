from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('test/', views.test_view, name='test'),
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', views.login_user, name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]