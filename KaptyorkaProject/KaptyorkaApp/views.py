from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View, TemplateView


def base_context(request, **args):
    context = {}
    user = request.user

    context['title'] = 'none'
    context['header'] = 'none'
    context['error'] = 0

    if args != None:
        for arg in args:
            context[arg] = args[arg]
    return context


class HomePage(View):
    def get(self, request):
        context = base_context(request, title='Home')
        return render(request, "home.html", context)


class CreateUser(View):
    def get(self, request):
        context = base_context(request, title='Новый контакт', header='Добавить нового пользователя')
        return render(request, "add_contact.html", context)


class AddEquipment(View):
    def get(self, request):
        context = base_context(request, title='Добавить снаряжение', header='Добавить снаряжение')
        return render(request, "add_equpment.html", context)


class AddGroupAccounting(View):
    def get(self, request):
        context = base_context(request, title='Записать снар на группу', header='Запись снаряжения на группу')
        return render(request, "new_group_accounting.html", context)


class AddUserAccounting(View):
    def get(self, request):
        context = base_context(request, title='Записать снар на человека', header='Запись снаряжения на человека')
        return render(request, "new_user_accounting.html", context)		

# Create your views here.
