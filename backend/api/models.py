from django.db import models

# Create your models here.
class Basic(models.Model):

    name = models.CharField(max_length=255)
    image = models.TextField(default="")
    address = models.TextField(default="")

class Restaurant(Basic):
    def __str__(self):
        return self.name
    
    summary = models.TextField(default="")

class Cafe(Basic):
    def __str__(self):
        return self.name

class Hotel(Basic):
    def __str__(self):
        return self.name

class Tour(Basic):
    def __str__(self):
        return self.name
