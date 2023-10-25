from rest_framework import serializers
from . models import Docket
# docket serializer
class DocketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docket
        fields = '__all__'