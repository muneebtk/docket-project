from rest_framework import serializers
from . models import Docket
class DocketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docket
        fields = '__all__'