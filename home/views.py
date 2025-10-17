from django.shortcuts import render
from django.http import HttpResponse
from .models import Painting

# Create your views here.

def home(request):
    paintings= Painting.objects.all()
    return render(request, 'home.html', {'paintings': paintings})

