from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from . import serializers
from . import models


@api_view(['POST'])
def update_ip(request):
    serializer = serializers.IpUpdateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=HTTP_200_OK)
    else:
        return Response(serializer.errors, HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def request_ip(request):
    try:
        game_host_ip = models.IpAddress.objects.get(name='game host')
    except models.IpAddress.DoesNotExist:
        game_host_ip = None
    try:
        recog_host_ip = models.IpAddress.objects.get(name='recog host')
    except models.IpAddress.DoesNotExist:
        recog_host_ip = None
    return Response({
        'game_host_ip': game_host_ip.ip,
        'recog_host_ip': recog_host_ip.ip
    }, HTTP_200_OK)
