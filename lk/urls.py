

# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from . import views

# router = DefaultRouter()
# router.register(r'brands', views.BrandViewSet, basename='brand')
# router.register(r'products', views.ProductViewSet, basename='product')
# router.register(r'cart', views.CartViewSet, basename='cart')
# router.register(r'connections', views.UserBrandConnectionViewSet, basename='connection')
# router.register(r'projects', views.PublishedProjectViewSet, basename='project')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
#     path('projects/available/', views.AvailableProjectsView.as_view(), name='available-projects'),
# ]













# lk/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Прямой доступ к construct_pagedesign
    path('construct-projects/', views.ConstructProjectsAPI.as_view(), name='construct-projects'),
    
    # Публичные проекты
    path('public-construct-projects/', views.PublicConstructProjectsAPI.as_view(), name='public-construct-projects'),
]