from django.urls import path
from .views import home, add_message


urlpatterns=[
    path('', home, name='home'),
    path('add-message', add_message, name='add_message'),
]