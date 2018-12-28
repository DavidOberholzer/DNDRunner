VENV=./ve
PYTHON=$(VENV)/bin/python
PIP=$(VENV)/bin/pip

# Colours.
CLEAR=\033[0m
RED=\033[0;31m
GREEN=\033[0;32m
CYAN=\033[0;36m

run:
	$(PYTHON) main.py

makemigrations: $(VENV)
	@echo "$(CYAN)Creating migrations...$(CLEAR)"
	ALLOWED_API_KEYS="unused" $(VENV)/bin/python manage.py db migrate

migrate: $(VENV)
	@echo "$(CYAN)Applying migrations to DB...$(CLEAR)"
	ALLOWED_API_KEYS="unused" $(VENV)/bin/python manage.py db upgrade