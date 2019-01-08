import os

UPLOAD_FOLDER = "/uploads/images"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

SALT = os.environ.get("SALT", None)
SECRET_KEY = os.environ.get("SECRET_KEY", "super secret")

SQLALCHEMY_DATABASE_URI = os.environ.get(
    "DB_URI",
    "postgresql://dndrunner:dndrunner@localhost:5432/dndrunner"
)

SQLALCHEMY_TRACK_MODIFICATIONS = \
    os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS", "false").lower() == "true"

