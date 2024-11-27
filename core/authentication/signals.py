# signals.py
from django.db.models.signals import post_migrate
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from django.dispatch import receiver

@receiver(post_migrate)
def create_default_user(sender, **kwargs):
    User = get_user_model()
    try:
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser(
                username="husni",
                first_name="Husni",
                last_name="Ridho",
                email="husni@mail.com",
                password="husni123",
                is_admin=True,
                is_manager=False,
                is_employee=False
            )
            print("Default admin user created!")
        else:
            print("Admin user already exists.")
    except IntegrityError as e:
        print(f"Error: {e}. Admin user creation skipped.")
