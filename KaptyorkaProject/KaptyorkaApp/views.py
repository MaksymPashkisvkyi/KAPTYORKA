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
        
        
# Create your views here.
