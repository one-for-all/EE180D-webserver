from rest_framework import serializers
from django.core.validators import validate_ipv46_address
from django.core.exceptions import ValidationError

from . import models


class IpUpdateSerializer(serializers.Serializer):
    # class Meta:
    #     model = models.IpAddresses
    #     fields = ["game_host_ip", "recog_host_ip"]

    game_host_ip = serializers.CharField(allow_blank=True)
    recog_host_ip = serializers.CharField(allow_blank=True)

    def validate(self, data):
        if len(data['game_host_ip']) > 0:
            try:
                validate_ipv46_address(data['game_host_ip'])
            except ValidationError:
                raise serializers.ValidationError({
                    'game_host_ip': 'Incorrect format'
            })
        if len(data['recog_host_ip']) > 0:
            try:
                validate_ipv46_address(data['recog_host_ip'])
            except ValidationError:
                raise serializers.ValidationError({
                    'recog_host_ip': 'Incorrect format'
                })
        return data

    def save(self, **kwargs):
        models.IpAddress.objects.update_or_create(
            name='game host',
            defaults={'ip': self.validated_data['game_host_ip']}
        )
        models.IpAddress.objects.update_or_create(
            name='recog host',
            defaults={'ip': self.validated_data['recog_host_ip']}
        )
