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
