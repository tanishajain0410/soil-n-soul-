# SoilNSoul Travels API — PostgreSQL

The API stores admin accounts, inquiries, blogs, and hotels in PostgreSQL. On startup, it creates or updates the required tables and indexes. The MongoDB package is retained only for the one-time import script; the running API does not connect to MongoDB.

## Configure PostgreSQL

Copy `.env.example` to `.env` and set `DATABASE_URL` to the PostgreSQL connection string from your provider. Keep `JWT_SECRET` stable so existing admin sessions remain valid where possible. For local PostgreSQL, set `PGSSL=disable`; hosted database providers usually require SSL.

Set the same `DATABASE_URL` and `JWT_SECRET` in the production server's environment before deploying this version. Configure the application server's persistent `/uploads` storage separately; media files are still stored on disk and are not moved into PostgreSQL.

## Import current MongoDB data

Make a PostgreSQL backup before importing. The import reads MongoDB collections `admins`, `inquiries`, `blogs`, and `hotels`, preserves their IDs and timestamps, and inserts records without duplicating IDs. It is safe to rerun for records already imported by ID. Keep the MongoDB database and its backup until you confirm row counts and the admin UI contents in PostgreSQL.

Set `MONGODB_MIGRATION_URI` to the existing MongoDB URI in your local environment, then run:

```sh
npm run migrate:mongodb-to-postgres
```

The MongoDB URI is used only by this command. Do not put it into the production API configuration once the migration is complete.

## Admin setup

After the schema exists, either use the one-time `/api/auth/setup` endpoint or set `ADMIN_PASSWORD` and run:

```sh
npm run seed
```

The seed command creates `ADMIN_EMAIL` only when no account with that email exists.

## Run

```sh
npm install
npm run dev
```

The health endpoint `/api/health` reports `database: "postgresql"` when connected. If `DATABASE_URL` is absent or invalid, the API still starts for non-database routes, while database-backed routes return errors instead of silently losing submissions.
