from django.db import models

# Create your models here.

class Painting(models.Model):
    title= models.CharField(max_length=200)
    description= models.TextField()
    image= models.ImageField(upload_to='paintings/')
    created_at= models.DateTimeField(auto_now_add=True)
    medium=models.CharField(max_length=100, choices=[
        ('oil', 'Oil'),
        ('acrylic', 'Acrylic'),
        ('watercolor', 'Watercolor'),
        ('digital', 'Digital'),
        ('mixed_media', 'Mixed Media'),
        ('pen', 'Pen')
    ])
    dimensions=models.CharField(max_length=100)
    material=models.CharField(max_length=100, choices=[
        ('canvas', 'Canvas'),
        ('paper', 'Paper'),
        ('wood', 'Wood'),
        ('metal', 'Metal'),
        ('fabric', 'Fabric')
    ])
    availability =  models.CharField(max_length=100, choices=[
        ('original', 'Original'),
        ('print', 'Print'),
        ('both', 'Both'),
        ('not available', 'Not Available')
    ])

