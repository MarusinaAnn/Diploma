FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
COPY deps/ deps/
COPY . .

RUN pip install --no-index --find-links=deps -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
