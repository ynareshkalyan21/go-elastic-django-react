from elasticsearch_dsl import Q

class Q_KEWORDS:
    RANGE = ["gte","lte", "gt","lt",]
    WILD = ["*"]
class QM:
    def __init__(self, search):
        self._and = []
        self._or = []
        self.min_m = 1
        self.search = search

    def _get_or_q(self):
        if self._or:
            return [Q('bool',
                     should=self._or,
                     )]
        return []

    def q(self):
        return Q('bool',
              must=self._and + self._get_or_q(),
              )

    def add_and(self,name_or_query="match", value="", fields_list=None, min=None,max=None):
        if fields_list is None:
            fields_list = []
        elif not isinstance(fields_list, list):
            fields_list = [fields_list]
        if name_or_query == "match":
            self._and +=[Q(name_or_query, **{e_field: value}) for e_field in fields_list]
        if name_or_query == "range":
            sq = {}
            if min:
                sq["gte"] = min
            if max:
                sq["lte"] = max
                # ** {"tradeData__price": {'gt': 1}
            self._and += [Q(name_or_query, **{e_field: sq}) for e_field in fields_list]
        if name_or_query == "wildSearch":
            if "*" not in value:
                value = "*" + value + "*"
            self._and += [Q("wildcard", ** {e_field: {"value":value, "boost": 1}}) for e_field in fields_list]

    def multi_fields_or(self,name_or_query="match", value="", fields_list=None, min=None,max=None):
        if fields_list is None:
            fields_list = []
        elif not isinstance(fields_list, list):
            fields_list = [fields_list]
        if name_or_query == "match":
            self._or +=[Q(name_or_query, **{e_field: value}) for e_field in fields_list]
        if name_or_query == "range":
            sq = {}
            if min:
                sq["gte"] = min
            if max:
                sq["lte"] = max
                # ** {"tradeData__price": {'gt': 1}
            self._or += [Q(name_or_query, **{e_field: sq}) for e_field in fields_list]
        if name_or_query == "wildSearch":
            if "*" not in value:
                value = "*" + value + "*"
            self._or += [Q("wildcard", ** {e_field: {"value":value, "boost": 1}}) for e_field in fields_list]

    def query(self):
        return self.search.query(self.q())

