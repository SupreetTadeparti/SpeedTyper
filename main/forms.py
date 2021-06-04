from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    email = forms.EmailField(max_length=50, widget=(forms.TextInput()))
    class Meta:
        model = User
        fields = ("email")
        fields = UserCreationForm.Meta.fields + ('email',)