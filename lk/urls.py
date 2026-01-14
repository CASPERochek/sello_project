# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from . import views

# router = DefaultRouter()
# router.register(r'brands', views.BrandViewSet, basename='brand')
# router.register(r'products', views.ProductViewSet, basename='product')
# router.register(r'cart', views.CartViewSet, basename='cart')
# router.register(r'connections', views.UserBrandConnectionViewSet, basename='connection')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
# ]



# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from . import views
# from .views import AvailableProjectsView

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
#     path('api/available-projects/', AvailableProjectsView.as_view(), name='available-projects'),
# ]










# lk/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'brands', views.BrandViewSet, basename='brand')
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'cart', views.CartViewSet, basename='cart')
router.register(r'connections', views.UserBrandConnectionViewSet, basename='connection')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
    path('projects/available/', views.AvailableProjectsView.as_view(), name='available-projects'),
]

