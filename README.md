# E-Commerce Inventory API

A RESTful API for managing products and categories in an e-commerce system, built with **NestJS**, **TypeScript**, and **PostgreSQL**.  
It features **JWT authentication**, **CRUD operations**, **search & filters**, and optional **product image uploads**.

Live Backend: [https://ecommerce-inventory-api-51fs.onrender.com](https://ecommerce-inventory-api-51fs.onrender.com)

Swagger Docs: [https://ecommerce-inventory-api-51fs.onrender.com/api/docs](https://ecommerce-inventory-api-51fs.onrender.com/api/docs)

---

## Features

- **User Authentication**

  - Register (`POST /api/auth/register`)
  - Login (`POST /api/auth/login`)
  - JWT-based authorization for all endpoints
  - Optional refresh token mechanism

- **Product Management**

  - Create, Read, Update, Delete products
  - Filters: by category, price range, and pagination
  - Search products by name or description
  - Optional product image upload (base64 stored)

- **Category Management**

  - Create, Read, Update, Delete categories
  - Includes product counts in category listing
  - Prevent deletion if category has linked products

- **Additional Features**
  - Swagger API documentation
  - Clean error handling (404, 403, etc.)
  - SOLID architecture using NestJS modules

---

## Tech Stack

- **Backend**: Node.js, NestJS, TypeScript
- **Database**: PostgreSQL (hosted on Neon)
- **ORM**: Prisma
- **Authentication**: JWT
- **File Uploads**: Multer (base64 storage)
- **Documentation**: Swagger (`@nestjs/swagger`)
- **Hosting**: Render (backend), Neon (database)

---

## API Documentation

Swagger UI is available at:  
[https://ecommerce-inventory-api-51fs.onrender.com/api/docs](https://ecommerce-inventory-api-51fs.onrender.com/api/docs)

Endpoints include:

- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Products**: `/api/products`, `/api/products/:id`, `/api/products/search`
- **Categories**: `/api/categories`, `/api/categories/:id`

---

## Setup Instructions

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/SopnilSwapon/ecommerce-inventory-api.git
cd ecommerce-inventory-api
```

echo "Cloning repository..."
git clone https://github.com/SopnilSwapon/ecommerce-inventory-api
cd ecommerce-inventory-api

# 2️⃣ Install dependencies (force)

npm install --force

# 3️⃣ Install Prisma locally (if not installed)

npm install prisma --save-dev

# 4️⃣ Generate Prisma client

npx prisma generate

# 5️⃣ Create .env file (placeholder)

cat <<EOL > .env

# Replace the following values with your own credentials

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
PORT=3000
EOL

echo ".env file created. Please update it with your database credentials."

# 6️⃣ Run database migrations

npx prisma migrate dev --name init

# 7️⃣ Start development server

npm run start:dev

echo "Setup complete!"
echo "Local API: http://localhost:3000"
echo "Swagger Docs: http://localhost:3000/api/docs"
