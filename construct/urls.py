# # from django.urls import path, include
# # from rest_framework.routers import DefaultRouter
# # from . import views

# # router = DefaultRouter()
# # router.register(r'designs', views.PageDesignViewSet, basename='design')
# # router.register(r'content', views.ContentItemViewSet, basename='content')

# # urlpatterns = [
# #     # API
# #     path('api/', include(router.urls)),
    
# #     # Страницы
# #     path('constructor/', views.constructor_view, name='constructor'),
    
# #     # API endpoints для фронтенда
# #     path('api/designs/my/', views.PageDesignViewSet.as_view({'get': 'my_designs'}), name='my-designs'),
# # ]









# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from . import views

# router = DefaultRouter()
# router.register(r'designs', views.PageDesignViewSet, basename='design')
# router.register(r'content', views.ContentItemViewSet, basename='content')

# urlpatterns = [
#     # API конструктора
#     path('api/', include(router.urls)),
    
#     # Страницы
#     path('constructor/', views.constructor_view, name='constructor'),
    
#     # API endpoints для фронтенда
#     path('api/designs/my/', views.PageDesignViewSet.as_view({'get': 'my_designs'}), name='my-designs'),
    
#     # =============== НОВЫЕ API ДЛЯ ДАННЫХ ИЗ sello ===============
#     path('api/sello/products/', views.SelloProductsAPI.as_view(), name='sello-products'),
#     path('api/sello/news/', views.SelloNewsAPI.as_view(), name='sello-news'),
#     path('api/sello/search/', views.SelloContentSearchAPI.as_view(), name='sello-search'),
# ]



from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'designs', views.PageDesignViewSet, basename='design')
router.register(r'content', views.ContentItemViewSet, basename='content')

urlpatterns = [
    # API конструктора
    path('api/', include(router.urls)),
    
    # Страницы
    path('constructor/', views.constructor_view, name='constructor'),
    
    # API endpoints для фронтенда
    path('api/designs/my/', views.PageDesignViewSet.as_view({'get': 'my_designs'}), name='my-designs'),
    
    # =============== НОВЫЕ API ДЛЯ ДАННЫХ ИЗ sello ===============
    path('api/sello/products/', views.SelloProductsAPI.as_view(), name='sello-products'),
    path('api/sello/news/', views.SelloNewsAPI.as_view(), name='sello-news'),
    path('api/sello/search/', views.SelloContentSearchAPI.as_view(), name='sello-search'),
    path('api/sello/brands/', views.SelloBrandsAPI.as_view(), name='sello-brands'),
    path('api/sello/all-products/', views.AllUserProductsAPI.as_view(), name='all-products'),
    path('api/sello/brands/<int:brand_id>/', views.SelloBrandDetailAPI.as_view(), name='sello-brand-detail'),
]