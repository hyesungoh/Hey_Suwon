from django.urls import path
from . import views

urlpatterns = [
    path('restaurant', views.RestaurantList.as_view()),
    path('cafe', views.CafeList.as_view()),
    path('hotel', views.HotelList.as_view()),
    path('tour', views.TourList.as_view()),
]