from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST
from .models import Painting, Message
import json

# Create your views here.

def home(request):
    id=Painting.objects.get(title="Luchadora").id

    return render(request, 'home.html',{'id':id})

# All work page

def all_work(request):
    paintings = Painting.objects.all()
    return render(request, 'all_work.html',{'paintings':paintings})

def individual_work(request,id):
    painting=Painting.objects.get(id=id)
    return render(request, 'individual_work.html', {'painting': painting})

# ADD a message

@require_POST
def add_message(request):
    try:
        # parse python object from JSON returned from decoding data
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except (ValueError, TypeError):
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON.'}, status=400)

    name = (payload.get('name') or 'Anonymous').strip()
    message_text = (payload.get('message') or '').strip()

    if not message_text:
        return JsonResponse({'status': 'error', 'message': 'Message cannot be empty.'}, status=400)

    # Basic server-side validation (length limit example)
    if len(message_text) > 2000:
        return JsonResponse({'status': 'error', 'message': 'Message too long.'}, status=400)

    try:
        Message.objects.create(name=name, message=message_text)
    except Exception as e:
        # Log e in real app; return generic error to client
        return JsonResponse({'status': 'error', 'message': 'Could not save message.'}, status=500)

    return JsonResponse({'status': 'success', 'message': 'Message sent successfully!'}, status=201)
