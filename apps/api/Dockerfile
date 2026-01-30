FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY apps/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY apps/api/ .

# Expose port
ENV PORT=8000
EXPOSE $PORT

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "$PORT"]
