# 🎓 Course Marketplace REST API

> A secure and scalable backend API for an online course marketplace built with modern technologies.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

## ✨ Features

🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing  
👥 **Role-Based Access** - Separate admin and user authentication flows  
✅ **Input Validation** - Comprehensive validation using Zod schemas  
📚 **Course Management** - Full CRUD operations for courses  
🛒 **Purchase System** - Track user course purchases  
🚀 **Production Ready** - Environment variables, error handling, security best practices  

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Security** | bcrypt for password hashing |
| **Validation** | Zod for input validation |
| **Environment** | dotenv for configuration |

## 📁 Project Structure

```
course-marketplace-api/
├── 📄 db.js                 # Database connection and schemas
├── 📄 index.js              # Main server file
├── 📄 package.json          # Dependencies and scripts
├── 📄 .env                  # Environment variables
├── 📄 .gitignore            # Git ignore rules
├── 📂 middleware/
│   ├── 🔐 admin.js          # Admin authentication middleware
│   └── 🔐 user.js           # User authentication middleware
└── 📂 routes/
    ├── 👨‍💼 admin.js          # Admin routes (signup, signin, course management)
    ├── 📚 course.js         # Course routes (preview, purchase)
    └── 👤 user.js           # User routes (signup, signin, purchases)
```

## 🚦 API Endpoints

<table>
<tr><th>Category</th><th>Method</th><th>Endpoint</th><th>Description</th><th>Auth Required</th></tr>

<tr><td rowspan="3"><b>👤 User</b></td><td><code>POST</code></td><td><code>/user/signup</code></td><td>User registration</td><td>❌</td></tr>
<tr><td><code>POST</code></td><td><code>/user/signin</code></td><td>User login</td><td>❌</td></tr>
<tr><td><code>GET</code></td><td><code>/user/purchases</code></td><td>Get purchased courses</td><td>✅</td></tr>

<tr><td rowspan="4"><b>👨‍💼 Admin</b></td><td><code>POST</code></td><td><code>/admin/signup</code></td><td>Admin registration</td><td>❌</td></tr>
<tr><td><code>POST</code></td><td><code>/admin/signin</code></td><td>Admin login</td><td>❌</td></tr>
<tr><td><code>POST</code></td><td><code>/admin/course</code></td><td>Create new course</td><td>✅</td></tr>
<tr><td><code>GET</code></td><td><code>/admin/courses</code></td><td>Get created courses</td><td>✅</td></tr>

<tr><td rowspan="2"><b>📚 Course</b></td><td><code>GET</code></td><td><code>/course/preview</code></td><td>Get all courses</td><td>❌</td></tr>
<tr><td><code>POST</code></td><td><code>/course/purchase</code></td><td>Purchase a course</td><td>✅</td></tr>

</table>

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud)
- npm or yarn

### 🚀 Installation

1. **Clone & Navigate**
   ```bash
   git clone https://github.com/Arunraddi/-Course-Marketplace-REST-API.git
   cd -Course-Marketplace-REST-API
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_USER_SECRET=your-user-jwt-secret
   JWT_ADMIN_SECRET=your-admin-jwt-secret
   PORT=3000
   ```

4. **Start Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

   🎉 Server runs on `http://localhost:3000`

## 📝 API Usage Examples

<details>
<summary><b>👤 User Registration</b></summary>

```bash
curl -X POST http://localhost:3000/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```
</details>

<details>
<summary><b>🔑 User Login</b></summary>

```bash
curl -X POST http://localhost:3000/user/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```
</details>

<details>
<summary><b>📚 Create Course (Admin)</b></summary>

```bash
curl -X POST http://localhost:3000/admin/course \
  -H "Content-Type: application/json" \
  -H "token: your-admin-jwt-token" \
  -d '{
    "title": "Complete Web Development",
    "description": "Learn full-stack web development",
    "price": 99.99,
    "image": "https://example.com/course-image.jpg"
  }'
```
</details>

<details>
<summary><b>🛒 Purchase Course</b></summary>

```bash
curl -X POST http://localhost:3000/course/purchase \
  -H "Content-Type: application/json" \
  -H "token: your-user-jwt-token" \
  -d '{
    "courseId": "course-id-here"
  }'
```
</details>

## 🔒 Security Features

| Feature | Description |
|---------|-------------|
| 🔐 **Password Hashing** | bcrypt with salt rounds for secure password storage |
| 🎫 **JWT Authentication** | Stateless token-based authentication |
| ✅ **Input Validation** | Zod schemas prevent malformed data injection |
| 🌍 **Environment Variables** | Sensitive data stored securely |
| 🛡️ **Error Handling** | Comprehensive error responses without data leaks |

## 🗃️ Database Schema

<details>
<summary><b>📊 View Database Schemas</b></summary>

### User Schema
```javascript
{
  email: String (unique),
  password: String (hashed with bcrypt),
  firstName: String,
  lastName: String
}
```

### Admin Schema
```javascript
{
  email: String (unique),
  password: String (hashed with bcrypt),
  firstName: String,
  lastName: String
}
```

### Course Schema
```javascript
{
  title: String,
  description: String,
  price: Number,
  image: String (URL),
  creatorId: ObjectId (references Admin)
}
```

### Purchase Schema
```javascript
{
  userId: ObjectId (references User),
  courseId: ObjectId (references Course)
}
```
</details>

## 🧪 Testing

Test the API using your favorite tools:

| Tool | Description |
|------|-------------|
| 🟢 **Postman** | Import endpoints and test manually |
| 💻 **cURL** | Use command line examples above |
| ⚡ **Thunder Client** | VS Code extension for API testing |
| 🔥 **Insomnia** | Modern REST client |

## 🚀 Deployment

### 🌍 Environment Setup
1. Set up [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or preferred MongoDB hosting
2. Configure environment variables for production
3. Deploy to platforms like:
   - [Heroku](https://heroku.com)
   - [Vercel](https://vercel.com)
   - [Railway](https://railway.app)
   - [DigitalOcean](https://digitalocean.com)

### ⚙️ Production Considerations
- ✅ Use strong JWT secrets
- ✅ Enable CORS for frontend integration
- ✅ Set up proper logging
- ✅ Implement rate limiting
- ✅ Add API documentation with Swagger

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## � Contact

**Arun Raddi** - [GitHub](https://github.com/Arunraddi)

**Project Link:** [Course Marketplace REST API](https://github.com/Arunraddi/-Course-Marketplace-REST-API)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Arun Raddi](https://github.com/Arunraddi)

</div>
#   - C o u r s e - M a r k e t p l a c e - R E S T - A P I 
 
 