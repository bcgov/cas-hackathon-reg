# cas-hackathon-reg

## Setup for local development of backend

1. Ensure asdf is installed
2. Ensure a recent version of Python (either 3.9 or 3.10) is installed in asdf
3. From the command line in the /api folder, run `pip3 install -r requirements.txt`
4. Confirm libraries have been installed correctly - e.g., `python3 -m django --version` should output the version number of Django as specified in requirements.txt
5. To run the webserver locally, cd in /api/registration, then run `python3 manage.py runserver` - if it's running correctly, the terminal output will say that the development server is running on your local host on a port (default :8000).
    - the first time you run this, you'll get warning messages saying that you have unapplied migrations.


#### Done once, don't need to do again

- For initial setup, I ran `django-admin startproject registration` from within the /api directory. This auto-generated a subfolder called /registration (and a subfolder by the same name), and a default manage.py file. Note that here, `registration` is the name of the project, not the name of the app. In hindsight, something like `obps` would have been a better project name than `registration`...
- From within the /api/registration folder, I ran `python3 manage.py startapp reg` to create a new app called `reg` within the `registration` project. This command auto-generated a subdirectory called `reg` and inserted some default files and a `migrations` subfolder.