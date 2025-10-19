from django.contrib import admin
from .models import Painting, Message
# Register your models here.


class PaintingAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'medium', 'material', 'availability', 'created_at', 'image')
    search_fields = ('title', 'description', 'medium', 'material', 'availability')
    list_filter = ('medium', 'material', 'availability', 'created_at')
    ordering = ('-created_at',)


class MessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'message', 'sent_at')
    search_fields = ('name', 'message')
    list_filter = ('sent_at',)
    ordering = ('-sent_at',)

admin.site.register(Painting, PaintingAdmin)
admin.site.register(Message, MessageAdmin)