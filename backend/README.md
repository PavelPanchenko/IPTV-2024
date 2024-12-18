# StreamVerse Backend

Backend service for StreamVerse IPTV platform built with FastAPI and SQLAlchemy.

## Setup

1. Install Poetry:
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. Install dependencies:
```bash
poetry install
```

3. Create and activate virtual environment:
```bash
poetry shell
```

4. Set up the database:
```bash
# Create database
createdb streamverse

# Run migrations
poetry run alembic upgrade head
```

5. Run the development server:
```bash
poetry run uvicorn main:app --reload
```

## Development

- Format code:
```bash
poetry run black .
poetry run isort .
```

- Run linting:
```bash
poetry run flake8
poetry run mypy .
```

- Run tests:
```bash
poetry run pytest
```

## API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc