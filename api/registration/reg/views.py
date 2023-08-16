from django.shortcuts import render
from django.http import HttpResponse
from .models import Operator

def operator(request, operator_id):
    return HttpResponse("You're looking at operator {}".format(operator_id))

def operators(request):
    all_operators_list = Operator.objects.order_by("business_legal_name")
    context = {
        "all_operators_list": all_operators_list,
    }
    return render(request, "operators/index.html", context)
