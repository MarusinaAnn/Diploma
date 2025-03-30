from django.urls import path
from .views import (
    RegisterView, CustomAuthToken, LogoutView, 
    UserListView, DeleteUserView, toggle_admin_status, 
    get_current_user
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', DeleteUserView.as_view(), name='user-delete'),
    path('users/<int:user_id>/toggle-admin/', toggle_admin_status),
    path('me/', get_current_user, name='get_current_user'),  # ← вот этот путь нужен!
]
