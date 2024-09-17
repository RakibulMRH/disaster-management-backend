Dependency Installation
    A. Install Necessary Packages
        npm install express dotenv pg typeorm reflect-metadata class-validator class-transformer bcrypt jsonwebtoken express-validator cors helmet morgan

    B. Install Development Dependencies
        npm install --save-dev typescript ts-node nodemon @types/express @types/node @types/bcrypt @types/jsonwebtoken

    C. Package Explanations
        express: Web framework for Node.js.
        dotenv: Loads environment variables from a .env file.
        pg: PostgreSQL client for Node.js.
        typeorm: ORM for TypeScript and JavaScript.
        reflect-metadata: Required by TypeORM.
        class-validator and class-transformer: For DTO validation.
        bcrypt: Password hashing.
        jsonwebtoken: For JWT authentication.
        express-validator: Validation middleware for Express.
        cors: Middleware for enabling Cross-Origin Resource Sharing.
        helmet: Security middleware.
        morgan: HTTP request logger.
        typescript, ts-node, nodemon, @types/*: Development tools.

Connecting to PostgreSQL
    A. Running Migrations 

        npm install -g typeorm
        typeorm migration:generate -n InitialSchema
        typeorm migration:run

Preparing for Deployment
    A. Set up environment variables for production.
        Update package.json scripts:

            "scripts": {
            "start": "node dist/app.js",
            "dev": "nodemon src/app.ts",
            "build": "tsc"
            }

    B. Build the project: 
        npm run build

    C. Start the server:
        npm start