from django.contrib import admin
from .models import Painting
# Register your models here.


class PaintingAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'medium', 'material', 'availability', 'created_at', 'image')
    search_fields = ('title', 'description', 'medium', 'material', 'availability')
    list_filter = ('medium', 'material', 'availability', 'created_at')
    ordering = ('-created_at',)

admin.site.register(Painting, PaintingAdmin)