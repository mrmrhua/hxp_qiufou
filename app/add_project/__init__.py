from flask import Blueprint
from flask_restful import Api,Resource

add_project = Blueprint('add_project',__name__)

from . import views