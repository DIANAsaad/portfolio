from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Painting, Message

# Create your views here.

def home(request):
    paintings= Painting.objects.all()
    return render(request, 'home.html', {'paintings': paintings})

def add_message(request):
    if request.method=="POST":
        name= request.POST.get('name')
        message= request.POST.get('message')
        Message.objects.create(name=name, message=message)
        return JsonResponse({"message": "Message added successfully!"})
