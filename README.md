# 🍲 Recipe Manager API

Recipe Manager API — bu Node.js, Express va MongoDB yordamida yozilgan backend ilova bo‘lib, foydalanuvchilarga retseptlarni yaratish, tahrirlash, ko‘rish va o‘chirish imkonini beradi.

Ilova JWT authentication yordamida himoyalangan va har bir foydalanuvchi faqat o‘z ma’lumotlari bilan ishlay oladi.

---

# 🚀 Features

- User Registration
- User Login
- Password hashing (bcrypt)
- JWT authentication
- Create / Read / Update / Delete recipes
- Create / Read / Update / Delete categories
- Access control (users only manage their own data)

---

# 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- cors

---

# 📁 Project Structure

```
recipe-app-backend
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   ├── User.js
│   ├── Recipe.js
│   └── Category.js
│
├── routes
│   ├── auth.js
│   ├── RecipeRoutes.js
│   └── CategoryRoutes.js
│
├── main.js
├── package.json
└── .env
```

---

# ⚙️ Installation

Clone repository:

```
git clone https://github.com/yourusername/recipe-manager-api.git
```

Open project folder:

```
cd recipe-manager-api
```

Install dependencies:

```
npm install
```

---

# 🔑 Environment Variables

Create `.env` file in the root folder:

```
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/recipe-app
JWT_SECRET=your_secret_key
```

---

# ▶️ Run Server

Start server:

```
node main.js
```

Server will run at:

```
http://localhost:3000
```

---

# 🔐 Authentication

After login server returns JWT token.

Example:

```
{
 "token": "your_jwt_token"
}
```

Use token in requests:

```
Authorization: Bearer YOUR_TOKEN
```

---

# 📡 API Endpoints

## Auth

Register

```
POST /api/auth/register
```

Login

```
POST /api/auth/login
```

---

## Category

Create Category

```
POST /api/category
```

Get Categories

```
GET /api/category
```

Update Category

```
PUT /api/category/:id
```

Delete Category

```
DELETE /api/category/:id
```

---

## Recipe

Create Recipe

```
POST /api/recipe
```

Get Recipes

```
GET /api/recipe
```

Update Recipe

```
PUT /api/recipe/:id
```

Delete Recipe

```
DELETE /api/recipe/:id
```

---

# 🔒 Security

- Passwords are hashed using bcrypt
- Authentication handled with JWT
- Users can only access their own data

---

# 👨‍💻 Author

Backend developed using Node.js, Express and MongoDB as part of a fullstack learning project.
