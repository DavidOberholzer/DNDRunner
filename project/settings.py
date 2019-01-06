import os

UPLOAD_FOLDER = "/uploads"
ALLOWED_EXTENSIONS = {"txt", "pdf", "png", "jpg", "jpeg", "gif"}

SQLALCHEMY_DATABASE_URI = os.environ.get(
    "DB_URI",
    "postgresql://dndrunner:dndrunner@localhost:5432/dndrunner"
)

SQLALCHEMY_TRACK_MODIFICATIONS = \
    os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS", "false").lower() == "true"

