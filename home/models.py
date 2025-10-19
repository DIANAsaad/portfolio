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


class Article(models.Model):
    title= models.CharField(max_length=200)
    content= models.TextField()
    published_at= models.DateTimeField(auto_now_add=True)
    image= models.ImageField(upload_to='articles/', null=True, blank=True)

class Message(models.Model):
    name=models.CharField(max_length=100, blank=True, null=True)
    message=models.TextField()
    sent_at=models.DateTimeField(auto_now_add=True)

