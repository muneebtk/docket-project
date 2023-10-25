from django.db import models

# Docket model
class Docket(models.Model):
    name = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    worked_hours = models.IntegerField()
    rate_per_hour = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    supplier_name = models.CharField(max_length=500)
    po = models.CharField(max_length=100)

