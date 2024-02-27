from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Role
        fields = '__all__'

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','username','email')

#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password','first_name')
        extra_kwargs = {"password":{"write_only":True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        role=Role.objects.get(role_id=2)
        employee=Employee(validated_data['username'],validated_data['first_name'],validated_data['email'],2)
        employee.save()
        return user
    
class CustomerSerializer(serializers.ModelSerializer):
    customer_id= serializers.ReadOnlyField()
    class Meta:
        model = Customer
        fields = '__all__'
    