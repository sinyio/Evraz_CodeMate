FROM python:3.7-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt update -y && \
    apt install -y python3-dev gcc musl-dev libpq-dev nmap \
                   libgdk-pixbuf2.0-0 libffi-dev libcairo2 libpango-1.0-0 \
                   libpango1.0-dev libpangocairo-1.0-0 && \
    apt autoremove -y && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
COPY backend/requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app/
COPY backend/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
