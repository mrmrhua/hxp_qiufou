from flask import Blueprint
from flask_restful import Api,Resource

designers = Blueprint('designers',__name__)

from . import views
