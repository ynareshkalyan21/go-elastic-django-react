from elasticsearch_dsl.query import MultiMatch
from rest_framework.response import Response
from rest_framework.views import APIView

from orderManagement.documents import OrderDocument
from elasticsearch_dsl import Q

from orderManagement.models import Order
from orderManagement.qm import QM


class GetOrders(APIView):
    def get(self, request):
        q = request.GET
        search = q.get("search", "")
        purchase_type = q.get("purchaseType","")
        price_range = q.get("priceRange","")
        order_submitted_range = q.get("orderSubmittedRange")
        asset_class = q.get("assetClass")

        # s = OrderDocument.search().filter("match", **search_q)[:30]
        # s = OrderDocument.search().filter("range", tradeData__price={'gt': 1, 'lte': 100})[:30]

        multi_search_fields =['orderId', 'instrumentName',"counterParty.name"]
        # s = MultiMatch(query=search_q, fields=, fuzziness='AUTO')
        # s = OrderDocument.search().query("multi_match", query={}, fields=multi_search_fields)
        # qs = s.to_queryset()
        qm = QM(OrderDocument.search())
        if search:
            qm.multi_fields_or("wildSearch", search, multi_search_fields)
        if purchase_type:
            qm.add_and("match", purchase_type, "purchaseType")
        if asset_class:
            qm.add_and("match", asset_class, "assetClass")
        if price_range:
            q = {}
            if ":" in price_range:
                price_range = price_range.split(":")
                if price_range[0]:
                    q["min"] = int(price_range[0])
                if price_range[1]:
                    q["max"] = int(price_range[1])
            elif price_range:
                q["min"] = int(price_range)
            if q.get("min") or q.get("max"):
                qm.add_and("range", None, ["tradeData.price"], **q)
        if order_submitted_range:
            q = {}
            if ":" in order_submitted_range:
                order_submitted_range = order_submitted_range.split(":")
                if order_submitted_range[0]:
                    q["min"] = order_submitted_range[0]
                if price_range[1]:
                    q["max"] = order_submitted_range[1]
            elif order_submitted_range:
                q["min"] = order_submitted_range
            if q.get("min") or q.get("max"):
                qm.add_and("range", None, ["timestamps.orderSubmitted"], **q)
        s = qm.query()

        # s = qm.multi_fields_or("range", None, ["tradeData.price"], min=2)
        return Response([p.to_orders_view_dict() for p in s])


class OrderView(APIView):
    def put(self, request, orderId):
        order = Order.objects.get(orderId=orderId)
        counter_party = request.data.get("counterParty")
        if counter_party:
            order.counterParty = counter_party
        dataSource = request.data.get("dataSource")
        if dataSource:
            order.dataSource = dataSource
        if counter_party or dataSource:
            order.save()
        return Response(dict(status="success"))

    def get(self, request, orderId):
        r = OrderDocument.search().filter("match",orderId=orderId)[0]
        return Response([p.to_order_view_dict() for p in r][0])

