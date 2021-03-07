# go-elastic-django-react
         
        ********** DJANGO Hepler ******
         
Elastic Config(elastic server host url):
setting.py
ELASTICSEARCH_DSL={
    'default': {
        'hosts': 'localhost:9200'
    },
}

ELASTICSEARCH_INDEX_NAME = "order"

React server domain cros origen:
setting.py 

CORS_ORIGIN_WHITELIST = [
     'http://localhost:3000'
]

Run Django Server(pip3 env):

python3 GoElastic/manage.py runserver 8000

add orders using /admin dashboard


               ********     React Server helper *********
                    
django server conf in index.js
axios.defaults.baseURL = 'http://127.0.0.1:8000'; # API url

installation
cd frontend
npm install

RUN react server 
cd frontend
npm start



