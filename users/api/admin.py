from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
  list_display = ["role_id", "name"]

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
  list_display = ["name", "username","role"]

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
  list_display = ["customer_id", "name","visiting_date","employee"]