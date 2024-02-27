from rest_framework.permissions import BasePermission
from .serializers import *

class CanViewCustomerData(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            employee = Employee.objects.filter(username=request.user).values()[0]
            if employee:
                role_id = employee["role_id"]
                if role_id == 2:
                    # Staff users can only view their own entered data
                    return True
                else:
                    # Admin users can view all staff users' entered data
                    return True
        return False