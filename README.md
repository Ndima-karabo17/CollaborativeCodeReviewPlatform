# Collaborative Code Review Platform

A collaborative API-driven platform for sharing code and receiving real-time feedback. It streamlines peer reviews with secure user management, project organization, and collaboration features.

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Roadmap](#roadmap)
- [Project Status](#project-status)

---

## Description

The Collaborative Code Review Platform is a RESTful API built with Node.js, Express, and TypeScript. It allows users to register, log in, submit projects for review, and leave comments on projects. All project routes are protected with JWT authentication to ensure only authorized users can interact with the platform.

---

## Features

### Authentication
- Register a new profile with email and picture
- Login and receive a JWT token
- All project routes are protected — token required

### Project Management
- Add a new project for review
- View all submitted projects
- View a specific project by ID
- Update a project's details and status

### Comments
- Add comments to projects
- Comments are linked to projects via foreign key
- Cascading delete — comments are removed when a project is deleted

### JWT Authentication
- Token-based authentication using `jsonwebtoken`
- Tokens expire after 1 hour
- Middleware protects all project and comment routes

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org/) | Runtime environment |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Express](https://expressjs.com/) | Web framework |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [node-postgres (pg)](https://node-postgres.com/) | PostgreSQL client |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password/picture hashing |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [nodemon](https://nodemon.io/) | Auto-restart during development |
| [ts-node](https://typestrong.org/ts-node/) | TypeScript execution for Node.js |

---

## Requirements

Before installing, make sure you have the following:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
- npm (comes with Node.js)

---

## Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd CollaborativeCodeReviewPlatform

# 2. Install dependencies
npm install

# 3. Install required packages
npm install express pg jsonwebtoken bcryptjs dotenv
npm install --save-dev typescript ts-node nodemon @types/node @types/express @types/pg @types/jsonwebtoken @types/bcryptjs

# 4. Start the development server
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root of your project with the following:

```env
JWT_SECRET=your_jwt_secret_here
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=collaborative-code
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

> Never commit your `.env` file to version control. Add it to `.gitignore`.

---

## Database Setup

Run the following SQL to set up your PostgreSQL database:

```sql
CREATE TABLE Profile (
 id SERIAL PRIMARY KEY,
 email VARCHAR(100) NOT NULL,
 pictureDispl VARCHAR(100) NOT NULL
);

CREATE TYPE TrackSubmissionStatus AS ENUM (
 'Pending',
 'In_review',
 'Approved',
 'Changes_requested'
);

CREATE TABLE Projects (
 id SERIAL PRIMARY KEY,
 projectName VARCHAR(255) NOT NULL,
 status TrackSubmissionStatus NOT NULL DEFAULT 'Pending',
 reviewed BOOLEAN NOT NULL,
 feedbackDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Comments (
 id SERIAL PRIMARY KEY,
 project_id INTEGER NOT NULL,
 comment VARCHAR(255) NOT NULL,
 commentDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE
);
```

---

## Usage

Once the server is running, test the API using Thunder Client, Postman, or curl.

### Register
- Method: `POST`
- URL: `http://localhost:3000/api/auth/register`
- Body:
```json
{
 "email": "john@example.com",
 "pictureDispl": "https://example.com/photo.jpg"
}
```

### Login
- Method: `POST`
- URL: `http://localhost:3000/api/auth/login`
- Body:
```json
{
 "email": "john@example.com",
 "pictureDispl": "https://example.com/photo.jpg"
}
```
> Copy the token from the response and add it to the `Authorization` header for all project routes: `Bearer <token>`

---

## API Routes

### Auth Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new profile | |
| POST | `/api/auth/login` | Login and receive token | |

### Project Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/projects` | Add a new project | |
| GET | `/api/projects` | Get all projects | |
| GET | `/api/projects/:id` | Get a project by ID | |
| PUT | `/api/projects/:id` | Update a project by ID | |

---

## Roadmap

- [ ] Add comments endpoints (POST, GET, DELETE)
- [ ] Attach profile to projects via foreign key
- [ ] Add pagination for project listings
- [ ] Role-based access control (reviewer vs. submitter)
- [ ] Email notifications on status change
- [ ] Swagger/OpenAPI documentation

---

## Project Status

This project is currently **in active development**. Core authentication and project management features are functional. Comments and advanced collaboration features are planned for upcoming updates.
