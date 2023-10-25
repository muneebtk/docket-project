from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import os
import pandas as pd
from rest_framework import status
from . models import Docket
from . serializer import DocketSerializer
from datetime import datetime

# docket form submission and get details from the excel file


class docket(APIView):
    def post(self, request):
        try:
            data = request.data
            name = data.get('name')
            start_time = data.get('startTime')
            end_time = data.get('endTime')
            worked_hours = data.get('workedHours')
            rate_per_hour = data.get('ratePerHour')
            supplier_name = data.get('supplier')
            po = data.get('PO')
            start_time = datetime.strptime(
                start_time, '%I:%M %p').strftime('%H:%M:%S')
            end_time = datetime.strptime(
                end_time, '%I:%M %p').strftime('%H:%M:%S')
            Docket.objects.create(
                name=name,
                start_time=start_time,
                end_time=end_time,
                worked_hours=worked_hours,
                rate_per_hour=rate_per_hour,
                supplier_name=supplier_name,
                po=po,
            )
            response_status = status.HTTP_201_CREATED
            message = 'Docket Created successfully!.'
        except Exception as e:
            response_status = status.HTTP_202_ACCEPTED
            message = 'Something went wrong!.'
        return Response({'message': message}, status=response_status)

    def get(self, request):
        dockets = Docket.objects.all()
        serializer = DocketSerializer(dockets, many=True)
        path = os.path.join(settings.BASE_DIR, 'files\export29913.xlsx')
        df = None
        if 'supplier' in request.GET:
            supplier = request.GET.get('supplier')
            path = os.path.join(settings.BASE_DIR, 'files\export29913.xlsx')
            df = pd.read_excel(path)
            filtered_df = df[df['Supplier'] == supplier]['PO Number'].dropna()
            return Response({'df': filtered_df})
        try:
            df = pd.read_excel(path)['Supplier']
            df = df.dropna().drop_duplicates()
        except Exception as e:
            pass
        data = {
            'df': df,
            'dockets': serializer.data
        }
        return Response({'data': data}, status=status.HTTP_200_OK)
