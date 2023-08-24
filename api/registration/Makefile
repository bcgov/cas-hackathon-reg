# Makefile for common Django commands

# Variables
MANAGE_PY = manage.py

# Commands
runserver:
	python $(MANAGE_PY) runserver

migrate:
	python $(MANAGE_PY) migrate

makemigrations:
	python $(MANAGE_PY) makemigrations

createsuperuser:
	python $(MANAGE_PY) createsuperuser

collectstatic:
	python $(MANAGE_PY) collectstatic

test:
	python $(MANAGE_PY) test

loadfixtures:
	python $(MANAGE_PY) loaddata users.json organizations.json

shell_plus:
	python $(MANAGE_PY) shell_plus

copy_prod_db:
	python copy_db_from_pod_to_local.py

load_prod_db_to_local:
	python copy_csv_data_to_db.py

# Default target
help:
	@echo "Available commands:"
	@echo "  runserver           Run the development server"
	@echo "  migrate             Apply database migrations"
	@echo "  makemigrations      Create new database migrations"
	@echo "  createsuperuser     Create a superuser"
	@echo "  collectstatic       Collect static files"
	@echo "  test                Run tests"
	@echo "  shell_plus          Open a Django shell_plus"
	@echo "  loadfixtures        Load data from fixtures"
	@echo "  help                Show this help message"

.PHONY: runserver migrate makemigrations createsuperuser collectstatic test shell help
