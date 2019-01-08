from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from project import settings

App = Flask(__name__)
CORS(App)

App.config["UPLOAD_FOLDER"] = settings.UPLOAD_FOLDER
App.config["SECRET_KEY"] = settings.SECRET_KEY
App.config["SQLALCHEMY_DATABASE_URI"] = settings.SQLALCHEMY_DATABASE_URI
App.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = settings.SQLALCHEMY_TRACK_MODIFICATIONS

DB = SQLAlchemy(App)

