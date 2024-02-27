from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse



class Register(APIView):
    @transaction.atomic
    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)

            if serializer.is_valid():
                user = serializer.save()
                token = Token.objects.create(user=user)

                return Response({
                    "message": f"User {serializer.data['username']} is created",
                    "token": token.key
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    "error": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                "message": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    
    def post(self,request):
        try:
            username=request.data['username']
            password=request.data['password']
            if not User.objects.filter(username=username).exists():
                return Response({"no user found!"},status=status.HTTP_401_UNAUTHORIZED)
            
            user=User.objects.get(username=username)

            if not user.check_password(password):
                return Response({"wrong password!"},status=status.HTTP_401_UNAUTHORIZED)
            
            token,created=Token.objects.get_or_create(user=user)
            
            serializer=UserSerializer(user)
            return Response({
                "message":"logged in successfully!",
                "user":serializer.data,
                "token":token.key
            },status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    def post(self, request):
        try:
            token_key = request.headers.get('Authorization').split()[1]
            token = Token.objects.get(key=token_key)
            token.delete()
            
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
            
        except Token.DoesNotExist:
            return Response({"message": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
        
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class CustomerViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

    def create(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Sending email
            customer_email = serializer.validated_data['email']
            customer_name = serializer.validated_data['name']
            subject = "Welcome to Transmogrify - Powering Your Journey with EV Chargers!"
            message = f"""Dear {customer_name},
            We are thrilled to extend a warm welcome to you as the newest member of the Transmogrify family! We're passionate about revolutionizing the way we power our vehicles, and we're delighted that you've chosen to embark on this journey with us. As an advocate for sustainability and innovation, you're not just a customer to us – you're a partner in driving positive change for the planet.
            With our cutting-edge EV chargers, you're now equipped with the latest technology designed to make your electric vehicle ownership experience seamless and enjoyable. Whether you're at home, at work, or on the road, our chargers are engineered to deliver reliability, efficiency, and convenience.  
            
           
           
           
           
           
        
        
           This email is generated automatically. Please refrain from replying directly; instead, kindly rephrase its content."""            
            from_email = settings.EMAIL_HOST_USER
            send_mail(subject , message , from_email , [customer_email])
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


    def get_queryset(self):
        if self.request.user.is_authenticated:
            employee_inst = Employee.objects.filter(username=self.request.user)[0]
            employee = Employee.objects.filter(username=self.request.user).values()[0]
            if employee["role_id"] == 2:
                # Retrieve only the data entered by the requesting staff user
                return Customer.objects.filter(employee=employee_inst)
            else:
                # Retrieve all customer data
                return Customer.objects.all()
        return Customer.objects.none()
    
class RoleViewset(viewsets.ModelViewSet):
    queryset= Role.objects.all()
    serializer_class = RoleSerializer
