### Disaster Management Backend - README

This is a Node.js backend for a disaster management system. It provides APIs for managing crises, donations, volunteers, inventory, and more.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [PostgreSQL](https://www.postgresql.org/download/) (v12.x or later)
- [NPM](https://www.npmjs.com/get-npm)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RakibulMRH/disaster-management-backend.git
   cd disaster-management-backend
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project with the following configuration:

   ```
   PORT=3000
   JWT_SECRET=default_secret
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=disaster_management
   ```

   Adjust the values according to your local PostgreSQL setup.

### Database Setup

Make sure PostgreSQL is installed and running on your machine. The database configuration is provided in `src/config/database.config.ts`. The backend uses TypeORM for database interaction.

To create the database, you can log into PostgreSQL and run:

```sql
CREATE DATABASE disaster_management;
```

### Running the Application

You can run the application in development mode with the following command:

```bash
npm run dev
```

This command starts the server on `http://localhost:3000` and connects to the PostgreSQL database. It will automatically restart on any file changes.

### API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

This will give you detailed information about all available API endpoints.

### Directory Structure

- `src/app.ts`: Main entry point of the backend application.
- `src/config/`: Configuration files for database and Swagger documentation.
- `src/controllers/`: Contains all the controller files that define the business logic.
- `src/models/`: Entity models that map to database tables.
- `src/routes/`: All the API routes defined here.
- `uploads/`: Directory to serve static files (e.g., images).

### Scripts

- **Start:** To start the application:
  ```bash
  npm start
  ```
- **Development:** To run the application in development mode:
  ```bash
  npm run dev
  ```

### Important Configurations

- **Port Configuration**: Defined in the `.env` file under the `PORT` key. The default is set to `3000`.
- **JWT Configuration**: JWT secret is set in the `.env` file under `JWT_SECRET`.
- **Database Configuration**: Defined in `src/config/database.config.ts`. You can change the database host, port, username, and password in the `.env` file.

### License

This project is licensed under the ISC License.

---
