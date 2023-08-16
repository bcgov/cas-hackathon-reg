from django.shortcuts import render
from django.http import HttpResponse
from .models import Operator

def operator(request, operator_id):
    operator = Operator.objects.get(id=operator_id)
    context = {
        "operator": operator,
    }
    return render(request, "operator/index.html", context)

def operators(request):
    all_operators_list = Operator.objects.order_by("business_legal_name")
    context = {
        "all_operators_list": all_operators_list,
    }
    return render(request, "operators/index.html", context)
