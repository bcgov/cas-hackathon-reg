# cas-hackathon-reg

## Setup for local development of backend

1. Ensure asdf is installed
2. Ensure a recent version of Python (either 3.9 or 3.10) is installed in asdf
3. From the command line in the /api folder, run `pip3 install -r requirements.txt`
4. Confirm libraries have been installed correctly - e.g., `python3 -m django --version` should output the version number of Django as specified in requirements.txt
5. To run the webserver locally, cd in /api/registration, then run `python3 manage.py runserver` - if it's running correctly, the terminal output will say that the development server is running on your local host on a port (default :8000).
   - the first time you run this, you'll get warning messages saying that you have unapplied migrations.
6. To run the database migration locally, execute `python3 manage.py migrate`
   - the first time you run this, you'll get warning messages saying that you have unapplied migrations.
7. To run the database migration locally, execute `python3 manage.py migrate`
8. To access the Django admin panel locally, execute `python3 manage.py createsuperuser` to create a superuser in your local database. You'll need to remember the credentials you create in order to access the admin panel when running the Django server locally.
9. Log in to the admin panel by navigating to the '/s/administration/raw' endpoint (at the address your server is running on)

## Setup for local database development

1. Ensure your Postgres server is running locally
2. Create a new database
3. Make a copy of the api/registration/registration/settings.py file and name it local_settings.py. Update the values in `DATABASES {}` with the values specific to your local database.

## Steps for locally updating the project after pulling changes

1. In `/cas-hackathon-reg/api/registration`:

   1. run `make migrate` if there are new migrations
   2. run `make loadfixtures` if there are new fixtures
   3. update `local_settings` with any new changes from the main `settings` folder

2. If you hit a migration conflict:
   (TBC, but for now)
   1. Delete the newly pulled migrations
   2. Run `make makemigrations` to recreate them relative to your existing migrations (mainly to update dependencies, I think?)

#### Done once, don't need to do again

- For initial setup, I ran `django-admin startproject registration` from within the /api directory. This auto-generated a subfolder called /registration (and a subfolder by the same name), and a default manage.py file. Note that here, `registration` is the name of the project, not the name of the app. In hindsight, something like `obps` would have been a better project name than `registration`...
- From within the /api/registration folder, I ran `python3 manage.py startapp reg` to create a new app called `reg` within the `registration` project. This command auto-generated a subdirectory called `reg` and inserted some default files and a `migrations` subfolder.
- After defining the classes in reg/models.py, I ran `python3 manage.py makemigrations reg`, which auto-generated a new file called 0001_initial.py in the /migrations subfolder. Then I ran `python3 manage.py sqlmigrate reg 0001`, which outputs to the terminal the SQL commands that will be executed (outgenerated by Django) when the migration is performed.
