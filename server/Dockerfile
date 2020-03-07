FROM python:3.8.0 as development
MAINTAINER "Anthony Re"

ENV FLASK_ENV=development

WORKDIR /app/world-data-viewer

COPY requirements.txt /app/world-data-viewer
RUN pip install --no-cache-dir -r ./requirements.txt

COPY src /app/world-data-viewer/src

CMD [ "python", "/app/world-data-viewer/src/main.py" ]

# Run tests to prevent production build on failure
FROM python:3.8.0 as test
WORKDIR /app/world-data-viewer

COPY requirements.txt .

RUN pip install --no-cache-dir -r ./requirements.txt

COPY src ./src

RUN python -m unittest discover .

FROM python:3.8.0-alpine

ENV FLASK_APP=production

WORKDIR /usr/local/src/world-data-viewer

# Create non-root user to run service
RUN addgroup processor --system \
    && adduser --system --no-create-home --disabled-password api api \
    && chown -R api:api /usr/local/src/world-data-viewer

USER api

COPY --chown=api:api requirements.txt .

RUN pip install --no-cache-dir -r ./requirements.txt

COPY src ./src

CMD [ "python", "/usr/local/src/world-data-viewer/src/main.py" ]
