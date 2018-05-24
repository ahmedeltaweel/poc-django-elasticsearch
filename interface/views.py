from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from elasticsearch import Elasticsearch

es = Elasticsearch(host="localhost", port=9200)


def index(request):
    '''
    index page with the template of the form
    '''
    return render(request, 'interface/index.html', {})


@csrf_exempt
def autocomplete(request):
    if request.method == 'POST':
        # conncet to elasticseach
        search_body = {
            "_source": "name",
            "suggest": {
                "my-suggest-1": {
                    "prefix": request.POST.get('p', None),
                    "completion": {
                        "field": "suggest"
                    }
                }
            }
        }
        response = es.search(index='products', doc_type='product', body=search_body)
        return JsonResponse(response['suggest']['my-suggest-1'][0])
    else:
        return JsonResponse({"nothing to see": "this isn't happening"})
