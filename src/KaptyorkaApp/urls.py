"""KaptyorkaProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
	https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
	1. Add an import:  from my_app import views
	2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
	1. Add an import:  from other_app.views import Home
	2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
	1. Import the include() function: from django.urls import include, path
	2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path
from django.urls import re_path

from .views import *

# from django.conf.urls import url

urlpatterns = [
    path("", HomePage.as_view(), name="home"),
    path("new_contact", CreateUser.as_view(), name="new_contact"),
    path("add_equipment", AddEquipment.as_view(), name="add_equipment"),
    path("group_accounting", AddGroupAccounting.as_view(), name="group_accounting"),
    path("user_accounting", AddUserAccounting.as_view(), name="user_accounting"),
    re_path('add_equipment/', AddNewEquipment.as_view(), name='add_equipment'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()
