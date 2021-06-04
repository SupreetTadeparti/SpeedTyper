from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Extending django's user model with typing statistics
class Typing(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    average_wpm = models.IntegerField(default=0)
    tests_taken = models.IntegerField(default=1)

# Add typing values to users on creation
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Typing.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.typing.save() 