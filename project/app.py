from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from project import settings

App = Flask(__name__)

App.config["SQLALCHEMY_DATABASE_URI"] = settings.SQLALCHEMY_DATABASE_URI
App.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = settings.SQLALCHEMY_TRACK_MODIFICATIONS

DB = SQLAlchemy(App)

