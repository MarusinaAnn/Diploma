from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backend.storage.views import FileViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'files', FileViewSet, basename='file')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include('backend.storage.urls')),
    path("api/auth/", include('backend.accounts.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
