from django.conf.urls import url
from . import views

app_name = 'interface'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^auto-complete/$', views.autocomplete, name='autocomplete'),
]
