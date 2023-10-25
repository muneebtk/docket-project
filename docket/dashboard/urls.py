from django.urls import path
from . import views

urlpatterns = [
    path('add_docket/', views.docket.as_view(), name='add_docket'),
]

