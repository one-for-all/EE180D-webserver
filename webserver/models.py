from django.db import models


class IpAddress(models.Model):
    name = models.TextField(unique=True)
    ip = models.GenericIPAddressField()

    def __str__(self):
        return "{} ip: {}".format(self.name, self.ip)
