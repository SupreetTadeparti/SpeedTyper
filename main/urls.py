from django.urls import path
from django.conf.urls import handler404
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('settings/', views.settings, name='settings'),
    path('typing-test/', views.typing_test, name='typing_test'),
    path('typing-test/paragraph', views.paragraph, name='paragraph'),
    path('typing-test/timer', views.timer, name='timer'),
    path('wpm', views.wpm, name='wpm'),
    path('reset/', views.reset, name='reset')
]

handler404 = 'main.views.error_404'