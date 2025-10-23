from django.urls import path
from .views import home, add_message, all_work, individual_work, all_articles, individual_article


urlpatterns=[
    path('', home, name='home'),
    path('add-message', add_message, name='add_message'),
    path('all_work', all_work, name='all_work'),
    path('individual_work/<int:id>', individual_work, name='individual_work'),
    path('all_articles', all_articles, name='all_articles'),
    path('individual_article/<int:id>', individual_article, name='individual_article'),
]