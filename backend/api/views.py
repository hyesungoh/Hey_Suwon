from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Restaurant, Cafe, Hotel, Tour
from .serializers import RestaurantSerializer, CafeSerializer, HotelSerializer, TourSerializer

# 위도 latitude / y
# 경도 longitude / x
class RestaurantList(APIView):
    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

class CafeList(APIView):
    def get(self, request):
        cafes = Cafe.objects.all()
        serializer = CafeSerializer(cafes, many=True)
        return Response(serializer.data)

class HotelList(APIView):
    def get(self, request):
        hotels = Hotel.objects.all()
        serializer = HotelSerializer(hotels, many=True)
        return Response(serializer.data)

class TourList(APIView):
    def get(self, request):
        tours = Tour.objects.all()
        serializer = TourSerializer(tours, many=True)
        return Response(serializer.data)