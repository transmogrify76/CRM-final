# custom_middleware.py

from django.http import HttpResponseForbidden

class AllowOnlyCertainIPsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

        self.allowed_ips = ['110.227.203.185']

    def __call__(self, request):
        server_ip = request.META.get('REMOTE_ADDR')
        client_ip = request.META.get('HTTP_X_FORWARDED_FOR')
        
        print("Server Ip:",server_ip)
        print("Client IP:", client_ip)  
        
        if client_ip is not None and client_ip not in self.allowed_ips:
            return HttpResponseForbidden("You are not allowed to access this resource.")
        
        response = self.get_response(request)
        return response
    




