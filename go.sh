#!/bin/sh
source venv/bin/activate
gunicorn manage:app -p manage.pid   -b 127.0.0.1:8000 -D -w 3
