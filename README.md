# Peworld API v2

Backend API for Peworld, a platform for worker and recruiter profiles, work experiences, and portfolios. The API is built with Node.js and Express and uses PostgreSQL for data storage.

## Requirements

- Node.js and npm
- PostgreSQL
- Cloudinary credentials for portfolio image uploads

## Getting started

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and set the variables listed below.

3. Create the database and tables using the SQL statements in [`query.sql`](./query.sql). The script creates a database named `hirejob`; connect to PostgreSQL as a user with permission to create databases before running it.

4. Start the API:

   ```bash
   npm run dev
   ```

   For a regular start without automatic restarts:

   ```bash
   npm start
   ```

The server listens on port `3001` by default. Set `PORT` to use another port. The root endpoint (`/`) returns a simple status message.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Optional server port; defaults to `3001`. |
| `PGUSER` | PostgreSQL user. |
| `PGHOST` | PostgreSQL host. |
| `PGDATABASE` | PostgreSQL database name; use `hirejob` with the provided schema script. |
| `PGPASSWORD` | PostgreSQL password. |
| `PGPORT` | PostgreSQL port. |
| `DATABASE_URL` | Optional PostgreSQL connection string. |
| `SECRETE_KEY_JWT` | Secret used to sign and verify JWTs. |
| `CLOUD_NAME` | Cloudinary cloud name. |
| `API_KEY` | Cloudinary API key. |
| `API_SECRET` | Cloudinary API secret. |
| `SMTP_EMAIL_USER` | Gmail account used to send confirmation email. |
| `SMTP_EMAIL_PASS` | Password or app password for that Gmail account. |

Keep credentials in `.env`; do not commit them. The repository ignores `.env` files.

## API routes

All routes are mounted at the root URL. For example, the authentication registration endpoint is `POST /auth/register`.

| Prefix | Endpoint | Description |
| --- | --- | --- |
| `/auth` | `POST /register` | Register an account. |
| `/auth` | `POST /login` | Log in. |
| `/auth` | `POST /refresh-token` | Refresh authentication tokens. |
| `/user` | `GET /profile/:id` | Get a profile by user ID. |
| `/user` | `GET /profile` | Get the authenticated user's profile. |
| `/user` | `GET /allworker` | List workers. |
| `/user` | `PATCH /profile/:id` | Update a user profile. |
| `/user` | `PATCH /worker-profile/:id` | Update a worker profile. |
| `/user` | `PATCH /company-profile/:id` | Update a company profile. |
| `/user` | `PUT /skills/:id` | Update a worker's skills. |
| `/experience` | `GET /user/:id` | List a user's experiences. |
| `/experience` | `GET /:id` | Get an experience by ID. |
| `/experience` | `POST /` | Create an experience. |
| `/experience` | `PUT /:id` | Update an experience. |
| `/experience` | `DELETE /:id` | Delete an experience. |
| `/portfolio` | `GET /user/:id` | List a user's portfolios. |
| `/portfolio` | `GET /:id` | Get a portfolio by ID. |
| `/portfolio` | `POST /` | Create a portfolio, with optional image upload. |
| `/portfolio` | `PUT /:id` | Update a portfolio, with optional image upload. |
| `/portfolio` | `DELETE /:id` | Delete a portfolio. |

Protected routes require a valid access token in the `Authorization: Bearer <token>` header. JSON request bodies should use `Content-Type: application/json`; portfolio uploads use multipart form data.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the server with Nodemon. |
| `npm start` | Start the server with Node.js. |
