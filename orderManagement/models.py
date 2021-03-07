# import uuid

# from django.db import models
# Create your models here.
from django.db import models
# from django.utils.translation import ugettext_lazy as _



# class Counterparty(models.Model):
#     name = models.CharField(
#         max_length=100,
#     )
#
# class DataSource(models.Model):
#     name = models.CharField(
#         max_length=100,
#     )

class Order(models.Model):
    # orderId = models.UUIDField(default=uuid.uuid4, unique=True,)
    model = models.CharField(max_length=100)
    assetClass = models.CharField(max_length=100)
    counterParty = models.CharField(max_length=100)
    dataSource = models.CharField(max_length=100)
    # counterParty = models.ForeignKey(Counterparty, on_delete=models.CASCADE)
    # dataSource = models.ForeignKey(DataSource, on_delete=models.CASCADE)
    instrumentId = models.CharField(max_length=100)
    instrumentName = models.CharField(max_length=100)
    orderId = models.CharField(max_length=100)
    TYPES = [
        (1, 'BUY'),
        (2, 'SELL'),
    ]
    purchaseType = models.IntegerField(choices=TYPES)
    orderSubmitted = models.DateTimeField()
    quantity = models.IntegerField()
    price = models.IntegerField()
    trader = models.CharField(max_length=100)
    tradeData = models.DateTimeField()

    def get_counter_party(self):
        return self

    def purchase_to_string(self):
        if self.purchaseType == 1:
            return "BUY"
        else:
            return "SELL"

# class TradeData(object):
#     def __init__(self, quantity, price, trader):
#         self.quantity = quantity
#         self.price = price
#
# class TradeData(models.Model):
#     order = models.ForeignKey(Order, on_delete=models.CASCADE)
#     quantity = models.IntegerField()
#     price = models.IntegerField()
#     trader = models.CharField(max_length=100)
#
#
# class OrderTimeStamp(models.Model):
#     order = models.ForeignKey(Order, on_delete=models.CASCADE)
#     submittedDate = models.DateTimeField()

# class Manufacturer(models.Model):
#     name = models.CharField(
#         _('name'),
#         max_length=100,
#     )
#     country_code = models.CharField(
#         _('country code'),
#         max_length=2,
#     )
#     created = models.DateField(
#         _('created'),
#     )
#
#
# class Car(models.Model):
#     TYPES = [
#         (1, 'Sedan'),
#         (2, 'Truck'),
#         (3, 'SUV'),
#     ]
#
#     class Meta:
#         verbose_name = _('Car')
#         verbose_name_plural = _('Cars')
#
#     name = models.CharField(
#         _('name'),
#         max_length=100,
#     )
#     color = models.CharField(
#         _('color'),
#         max_length=30,
#     )
#     description = models.TextField(
#         _('description'),
#     )
#     type = models.IntegerField(
#         _('type'),
#         choices=TYPES,
#     )
#     manufacturer = models.ForeignKey(
#         Manufacturer,
#         on_delete=models.CASCADE,
#         verbose_name=_('manufacturer'),
#     )
#
#     def __str__(self):
#         return self.name
#
#     def get_auction_title(self):
#         return '{} - {}'.format(self.name, self.color)