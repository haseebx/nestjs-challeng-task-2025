# NestJS Project Setup Guide

This document provides a step-by-step guide to setting up a NestJS project, configuring environment variables, and running Redis server for the Bull package.

## 1. Project Initialization

```bash
# Install the NestJS CLI
npm install -g @nestjs/cli

# Create a new project
nest new my-nestjs-app

# Navigate into the project directory
cd my-nestjs-app

# Install project dependencies
npm install
```

## 2. Environment Variable Configuration

Create a `.env` file in the root directory of your project and add the following variables:

```plaintext
PORT=8000
DB_TYPE=postgres
DB_HOST=localhost
DB_USER_NAME=postgres
DB_PASSWORD=
DATABASE=challange-task
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 3. Running Redis Server for Bull Package

Ensure Redis is installed. To start the Redis server, use the command:

```bash
redis-server
```

### If Redis is not installed:

Follow these steps to install Redis:

- On macOS (using Homebrew):
  ```bash
  brew install redis
  ```
- On Ubuntu:
  ```bash
  sudo apt update
  sudo apt install redis-server
  ```
- On Windows (using Chocolatey):
  ```bash
  choco install redis
  ```

### If Chocolatey (Choco) is not installed on Windows:

To install Chocolatey, run the following command in an administrative PowerShell:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; \
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; \
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

After installation, restart your terminal and verify by running:
```bash
choco -v
```

## 4. Integrating Bull Package in NestJS

```bash
# Install Bull and dependencies
npm install @nestjs/bull bull redis
```

## 5. Running the Project

```bash
# Start Redis server
redis-server

# Run your NestJS project
npm run start:dev
```

Your NestJS application should now be running on `http://localhost:8000`.

Your NestJS application swegger should now be running on `http://localhost:8000/docs`.
