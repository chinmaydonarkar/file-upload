# 📁 File Upload Service (NestJS + PostgreSQL + Redis + BullMQ)

A secure and modular backend microservice built using **NestJS**, supporting:
- 🔐 JWT-based authentication
- 📤 File uploads with metadata
- ⚙️ Background processing using BullMQ (Redis)
- 🗃️ PostgreSQL with Prisma ORM
- ✅ Secure file status API with user access controls

---

## 🚀 Features

- **Login with JWT**
- **Upload any file (with title & description)**
- **Save file to local disk & metadata to PostgreSQL**
- **Background job for processing (checksum)**
- **Get status & extracted data of uploaded file**
- **Fully secured with authentication guards**

---

## 🧱 Tech Stack

- NestJS
- PostgreSQL + Prisma
- Redis + BullMQ
- Multer (for file uploads)
- Docker Compose (for Redis & Postgres)
- JWT Authentication

---

## ⚙️ Setup Instructions (Run Locally)

### 1️⃣ Clone the repo

2️⃣ Install Node dependencies
bash
Copy
Edit
npm install
3️⃣ Start Redis & PostgreSQL using Docker
bash
Copy
Edit
docker-compose up -d
This runs:

PostgreSQL on localhost:5432

Redis on localhost:6379

4️⃣ Setup Environment Variables
Create a .env file in the root:

env
Copy
Edit
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fileupload"
JWT_SECRET="supersecret"
REDIS_HOST=localhost
REDIS_PORT=6379
UPLOAD_DIR=./uploads
5️⃣ Run Prisma migration & generate client
bash
Copy
Edit
npx prisma generate
npx prisma migrate dev --name init
6️⃣ Seed a test user
bash
Copy
Edit
npm run seed
Creates:

json
Copy
Edit
{
  "email": "test@example.com",
  "password": "password123"
}
7️⃣ Start the NestJS app
bash
Copy
Edit
npm run start:dev
App will run at:
👉 http://localhost:3000

📮 API Endpoints
🔐 Login - POST /auth/login
Body:

json
Copy
Edit
{
  "email": "test@example.com",
  "password": "password123"
}
Response:

json
Copy
Edit
{
  "access_token": "<JWT_TOKEN>"
}
📤 Upload File - POST /upload
Headers:

makefile
Copy
Edit
Authorization: Bearer <JWT_TOKEN>
Body (form-data):

Key	Type	Example
file	File	any file
title	Text	"My File"
description	Text	"Uploading test file"

📦 Get File Status - GET /files/:id
Headers:

makefile
Copy
Edit
Authorization: Bearer <JWT_TOKEN>
Response:

json
Copy
Edit
{
  "id": 1,
  "originalName": "abc.pdf",
  "title": "My File",
  "description": "Uploading test file",
  "status": "processed",
  "extractedData": "sha256:abcdef...",
  "uploadedAt": "2025-05-17T12:00:00.000Z"
}
🧪 Testing Steps (via Postman)
POST /auth/login → Get token

POST /upload (form-data + token)

Wait 2-3 sec

GET /files/:id → Status & checksum

📁 Folder Structure
bash
Copy
Edit
src/
├── auth/             # Login + JWT setup
├── files/            # Upload controller + service
├── jobs/             # BullMQ job processor
├── common/guards/    # JwtAuthGuard
├── prisma.service.ts # Prisma DB client
uploads/              # Where files are saved
✍️ Author
Chinmay Donarkar
💼 Backend Developer
📧 chinmay@example.com
🔗 GitHub



```bash
git clone https://github.com/your-username/file-upload-service.git
cd file-upload-service
