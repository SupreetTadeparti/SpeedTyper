# Om Vighneswaraya Namaha

from django.shortcuts import render,  redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from .forms import RegisterForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from .models import Typing
import os
import random

typing_words = []
module_dir = os.path.dirname(__file__)  
file_path = os.path.join(module_dir, 'popular.txt')
with open(file_path,'r') as file:
    for line in file:
        for word in line.split():
            typing_words.append(word)

def error_404(request, exception, *args, **kwargs):
    data = {}
    return render(request, "main/404.html", data)

def home(request):
    return render(request, "main/home.html")

def register(request):
    if request.method == "POST":
        form = RegisterForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            messages.success(request, 'Your account has successfully been registered!')
            return redirect('home')
        print(form.is_valid())
        messages.error(request, 'Username or Email is already taken. Please try again.')
    form = RegisterForm
    return render(request, 'main/register.html', {'form': form})    

def login(request):
    if request.method == 'POST':  
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username = username, password = password)
        if user is not None:
            form = auth_login(request, user)
            messages.success(request, 'Successfully logged in!')
            return redirect('home')
        else:
            messages.error(request, 'Account does not exit! Please sign in.')
    form = AuthenticationForm()
    return render(request, "main/login.html", {'form':form})

def logout(request):
    auth_logout(request)
    messages.success(request, 'You have successfully logged out!')
    return redirect('home')

def settings(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user.username)
    else:
        messages.info(request, 'You must be logged in to access this feature!')
        return redirect('home')
    return render(request, "main/settings.html", {
        'user' : user,
        'tests_taken' : user.typing.tests_taken-1
    })

def typing_test(request):
    return render(request, "main/typing.html")

def paragraph(request):
    final_words = random.sample(typing_words, 30)
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user.username)
        tests_taken = user.typing.tests_taken - 1
        return render(request, "main/paragraph.html", {
            'words' : final_words, 
            'all_words' : typing_words,
            'user' : user,
            'tests' : tests_taken
        })
    return render(request, 'main/paragraph.html', {
        'words' : final_words,
        'all_words' : typing_words
    })

def timer(request):
    final_words = random.sample(typing_words, 35)
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user.username)
        tests_taken = user.typing.tests_taken - 1
        return render(request, "main/timer.html", {
            'words' : final_words, 
            'all_words' : typing_words,
            'user' : user,
            'tests' : tests_taken
        })
    return render(request, 'main/timer.html', {
        'words' : final_words,
        'all_words' : typing_words
    })

def wpm(request):
    new_wpm = request.POST.get('wpm', '')
    if request.user.is_authenticated:
        try:
            username = request.user.username
            user = User.objects.get(username=username)
            tests_taken = user.typing.tests_taken
            average_wpm = user.typing.average_wpm
            if (str(tests_taken)[-1] == "5") or (str(tests_taken)[-1] == "0"):
                tests_taken = 3
            new_average = ((average_wpm * (tests_taken-1)) + int(new_wpm)) / tests_taken
            user.typing.average_wpm = new_average
            user.typing.tests_taken += 1
            user.typing.save()
            return redirect(request.POST.get('url', ''))
        except:
            messages.info(request, 'You cant go to this url -_-')
            return redirect('home')
            
def reset(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user.username)
        user.typing.average_wpm = 0
        user.typing.tests_taken = 1
        user.typing.save()
        messages.success(request, 'Successfully reset typing statistics!')
        return redirect('settings')
    else:
        messages.info(request, 'You must be logged in to access this feature')
        return redirect('home')