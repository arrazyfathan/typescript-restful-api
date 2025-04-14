# TypeScript RESTful API : Contact Management

[![Node.js](https://img.shields.io/badge/Node.js-23.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey)](https://expressjs.com/)

A robust and scalable RESTful API built with TypeScript, Express, and Prisma ORM. This API demonstrates modern backend
development practices including proper type safety, database management, and RESTful principles.

## ✨ Features

- 🚀 TypeScript support
- 🔐 Authentication (Login/Register)
- 🧩 Modular structure (Controllers, Routes, Services, Middlewares)
- 📦 Environment configuration with `dotenv`
- 📚 Validation using `zod`
- 🧪 Unit testing with `Jest` and `supertest`
- 🔍 Logging with `winston`
- 📁 Organized project architecture for scalability

## Installation

1. **Clone the repository**
   ```shell
      git clone https://github.com/arrazyfathan/typescript-restful-api.git
      cd typescript-restful-api
   ```
2. **Create env files**

   ```dotenv
    DATABASE_URL="mysql://root:rootpass@localhost:3306/contact_db"
   ```

3. **Install dependencies**

   ```shell
   npm install
   ```

4. **Database setup ( Prisma )**

   ```shell
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Build and Run**

   ```shell
   npm run build
   npm run dev / start
   ```

## 🏗️ Tech Stack

- Node.js
- Express.js
- TypeScript
- Zod (validation)
- Jest & Supertest (testing)

## 📂 Project Structure
```
   src/
   ├── application/       
   ├── controller/       
   ├── error/       
   ├── middleware/  
   ├── model/       
   ├── routes/      
   ├── service/     
   ├── type/        
   ├── validation/   
   └── main.ts    
   test/
   ├── all test case   
```

## 📥 Download Postman Collection

You can download the Postman collection for the **Contact Management API** using the link below:

🔗 [Download Contact Management API Postman Collection](https://github.com/arrazyfathan/typescript-restful-api/blob/main/postman/Contact%20Management%20API%20Docs.postman_collection.json)

> Make sure to import this collection into your Postman workspace to test and explore all available endpoints.

If you haven't already, install [Postman](https://www.postman.com/downloads/) to get started.

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License
Distributed under the MIT License. See LICENSE for more information.