import os

SQLALCHEMY_DATABASE_URI = os.environ.get(
    "DB_URI",
    "postgres+psycopg2://dndrunner:dndrunner@localhost:5432/dndrunner"
)

SQLALCHEMY_TRACK_MODIFICATIONS = \
    os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS", "false").lower() == "true"

