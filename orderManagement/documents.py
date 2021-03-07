from django_elasticsearch_dsl import fields
from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
# fromm elasticsearch_dsl import Index
from GoElastic.settings import ELASTICSEARCH_INDEX_NAME
from orderManagement.models import Order

# order_index = Index('order')
#
# order_index.settings(
#     number_of_shards=1,
#     number_of_replicas=0
# )

@registry.register_document
class OrderDocument(Document):
    # name = fields.KeywordField(
    #     attr='name',
    #     fields={
    #         'suggest': fields.Completion(),
    #     }
    # )
    model = fields.KeywordField()
    assetClass = fields.KeywordField()
    counterParty = fields.ObjectField(
        attr='get_counter_party',
        properties={
            'name': fields.KeywordField(attr="counterParty"),
        })
    dataSource = fields.ObjectField(
        attr='get_counter_party',
        properties={
            'name': fields.KeywordField(attr="dataSource"),
        })
    instrumentId = fields.KeywordField()
    instrumentName = fields.KeywordField()
    orderId = fields.KeywordField()
    purchaseType = fields.KeywordField(attr="purchase_to_string")
    timestamps = fields.ObjectField(
        attr='get_counter_party',
        properties={
            'orderSubmitted': fields.DateField(attr="orderSubmitted"),
        })

    tradeData = fields.ObjectField(
        attr='get_counter_party',
        properties={
            'quantity': fields.IntegerField(attr="quantity"),
            "price": fields.IntegerField(attr="price"),
            "trader": fields.KeywordField(attr="trader")
        })

    class Index:
        # Name of the Elasticsearch index
        name = ELASTICSEARCH_INDEX_NAME
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Order


    def to_order_view_dict(self):
        return {
            "assetClass": self.assetClass,
            "instrumentId": self.instrumentId,
            "instrumentName": self.instrumentName,
            "orderId": self.orderId,
            "orderSubmitted": self.timestamps.orderSubmitted,
            "purchaseType": self.purchaseType,
            "tradeQuantity": self.tradeData.quantity,
            "tradePrice": self.tradeData.price,
            "counterpartyName":self.counterParty.name,
            "dataSourceName":self.dataSource.name
        }

    def to_orders_view_dict(self):
        return {
            "assetClass": self.assetClass,
            "instrumentId": self.instrumentId,
            "instrumentName": self.instrumentName,
            "orderId": self.orderId,
            "orderSubmitted": self.timestamps.orderSubmitted,
            "purchaseType": self.purchaseType,
            "tradeQuantity": self.tradeData.quantity,
            "tradePrice": self.tradeData.price,
        }
        # fields = [
        #     'id',
        #     # 'orderId',
        #     # 'name',
        #     # 'type',
        # ]
    #
    # def get_queryset(self):
    #     return super().get_queryset()


    # def get_queryset(self):
    #     return super().get_queryset().select_related(
    #         'manufacturer'
    #     )


