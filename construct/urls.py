from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'page-designs', views.PageDesignViewSet, basename='pagedesign')
router.register(r'content-items', views.ContentItemViewSet, basename='contentitem')

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.constructor_view, name='constructor'),
]