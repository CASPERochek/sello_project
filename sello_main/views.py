from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser  # Импортируем нашу модель

@api_view(['GET'])
@permission_classes([AllowAny])
def test_view(request):
    return Response({"message": "Django is working!"})

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    try:
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        
        # Проверка обязательных полей
        if not username or not email or not password:
            return Response(
                {"error": "Все поля обязательны для заполнения"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if CustomUser.objects.filter(username=username).exists():
            return Response(
                {"error": "Пользователь с таким логином уже существует"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if CustomUser.objects.filter(email=email).exists():
            return Response(
                {"error": "Пользователь с таким email уже существует"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Создаем пользователя через нашу кастомную модель
        user = CustomUser.objects.create_user(
            email=email,
            username=username,
            password=password,
            first_name=first_name or '',
            last_name=last_name or ''
        )
        
        return Response({
            "message": "Пользователь успешно зарегистрирован",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    try:
        username_or_email = request.data.get('username')
        password = request.data.get('password')
        
        if not username_or_email or not password:
            return Response(
                {"error": "Логин/email и пароль обязательны"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Пробуем найти пользователя по username
        user = authenticate(username=username_or_email, password=password)
        
        # Если не нашли по username, пробуем по email
        if user is None:
            try:
                user_obj = CustomUser.objects.get(email=username_or_email)
                user = authenticate(username=user_obj.username, password=password)
            except CustomUser.DoesNotExist:
                user = None
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Вход выполнен успешно',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                } 
            })
        else:
            return Response(
                {"error": "Неверный логин/email или пароль"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )