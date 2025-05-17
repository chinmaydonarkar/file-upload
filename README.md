# 📁 File Upload Service (NestJS + PostgreSQL + Redis + BullMQ)

A secure backend service built with **NestJS** that supports:

- 🔐 JWT-based authentication
- 📤 File uploads with metadata
- ⚙️ Background processing (checksum calculation)
- 🗃️ PostgreSQL using Prisma ORM
- 📩 Redis + BullMQ for background jobs

---

## 🚀 Features

- ✅ Login with JWT
- ✅ File upload with metadata (title + description)
- ✅ Store files locally (`./uploads`)
- ✅ Save metadata to PostgreSQL
- ✅ Background file processing via BullMQ
- ✅ Only uploader can view file status

---

## 🧱 Tech Stack

- NestJS
- PostgreSQL + Prisma
- Redis + BullMQ
- Multer (for file uploads)
- Docker Compose
- JWT Authentication

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/file-upload-service.git
cd file-upload-service
```

---

### 2️⃣ Install Node dependencies

```bash
npm install
```

---

### 3️⃣ Start Redis & PostgreSQL using Docker

```bash
docker-compose up -d
```

This runs:

- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

---

### 4️⃣ Setup Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fileupload"
JWT_SECRET="supersecret"
REDIS_HOST=localhost
REDIS_PORT=6379
UPLOAD_DIR=./uploads
```

---

### 5️⃣ Run Prisma migration & generate client

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

### 6️⃣ Seed a test user

```bash
npm run seed
```

Creates test user:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

### 7️⃣ Start the NestJS app

```bash
npm run start:dev
```

App will run at:  
👉 `http://localhost:3000`

---

## 📮 API Endpoints

### 🔐 Login - `POST /auth/login`

**Body:**

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "<JWT_TOKEN>"
}
```

---

### 📤 Upload File - `POST /upload`

**Headers:**

```makefile
Authorization: Bearer <JWT_TOKEN>
```

**Body (form-data):**

| Key         | Type | Example              |
|-------------|------|----------------------|
| file        | File | any file             |
| title       | Text | "My File"            |
| description | Text | "Uploading test file"|

---

### 📦 Get File Status - `GET /files/:id`

**Headers:**

```makefile
Authorization: Bearer <JWT_TOKEN>
```

**Response:**

```json
{
  "id": 1,
  "originalName": "abc.pdf",
  "title": "My File",
  "description": "Uploading test file",
  "status": "processed",
  "extractedData": "sha256:abcdef...",
  "uploadedAt": "2025-05-17T12:00:00.000Z"
}
```

---

## 🧪 Testing Steps (via Postman)

1. `POST /auth/login` → Get token  
2. `POST /upload` → Upload file using form-data + token  
3. Wait 2–3 seconds (background job will process it)  
4. `GET /files/:id` → View processing status & checksum  

---

## 📁 Folder Structure

```bash
src/
├── auth/             # Login + JWT setup
├── files/            # Upload controller + service
├── jobs/             # BullMQ job processor
├── common/guards/    # JwtAuthGuard
├── prisma.service.ts # Prisma DB client
uploads/              # Where files are saved
```

---

## ✍️ Author

**Chinmay Donarkar**  
💼 Backend Developer  
📧 chinmay@example.com  
🔗 [GitHub](https://github.com/yourusername)

---

## ✅ Project is Ready!

Clone → Install → Seed → Upload → ✅ Done!
