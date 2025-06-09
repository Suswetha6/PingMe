# PingMe - University Notification Hub

A Dockerized event management system with a Spring Boot backend, React frontend, and PostgreSQL database.

## Prerequisites

- Docker
- Docker Compose
- Git

## Project Structure

```
pingme/
├── docker-compose.yml
├── Dockerfile.backend
├── pingme-frontend/
│   ├── Dockerfile
│   └── src/
├── src/
│   └── main/
│       ├── java/
│       └── resources/
└── .env
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# PostgreSQL
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password

# Spring Boot
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password
```

## Docker Services

### 1. PostgreSQL Database
- Image: `postgres:13`
- Port: `5432`
- Database: `pingme`
- Data Persistence: Uses named volume `postgres_data`

### 2. Spring Boot Backend
- Port: `8080`
- Built from: `Dockerfile.backend`
- Environment: Connects to PostgreSQL database
- API Base URL: `http://localhost:8080`

### 3. React Frontend
- Port: `3000`
- Built from: `pingme-frontend/Dockerfile`
- Environment: Connects to backend service
- API Base URL: `http://localhost:3000`

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pingme
   ```

2. Create `.env` file with required environment variables

3. Build and start all services:
   ```bash
   docker compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080





### Database Management
```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U your_postgres_user -d pingme

# Backup database
docker compose exec postgres pg_dump -U your_postgres_user pingme > backup.sql

# Restore database
cat backup.sql | docker compose exec -T postgres psql -U your_postgres_user -d pingme
```



