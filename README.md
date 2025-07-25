# AI Recipe Generator 🍳

![Smart Recipe Generator Demo](./demo/demo.gif)

**Full-Stack AI-Powered Recipe Management System** - A complete recipe application with user authentication, AI recipe generation, and comprehensive CRUD operations.

[![Built with React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Built with Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![Built with TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Powered by OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=flat&logo=openai)](https://openai.com/)

## 🌟 Features

### User Experience
- **AI Recipe Generation**: Transform ingredients into personalized recipes using OpenAI GPT
- **User Authentication**: Secure registration and login system with JWT tokens
- **Recipe Management**: Full CRUD operations (Create, Read, Update, Delete) for personal recipes
- **Responsive Design**: Beautiful, mobile-first interface across all devices
- **Real-time Data**: Live database integration with instant updates

### Technical Features
- **Secure Backend API**: RESTful endpoints with authentication middleware
- **Database Relationships**: Normalized PostgreSQL schema with user-recipe associations
- **Password Security**: bcrypt hashing with salt rounds
- **CORS Protection**: Secure cross-origin resource sharing
- **Input Validation**: Comprehensive data validation and sanitization
- **Error Handling**: Graceful error responses with proper HTTP status codes

## 🚀 Live Demo

**Frontend**: [View Live Demo](https://your-app-url.vercel.app) _(Update with your deployment URL)_  
**Backend API**: Coming soon (Phase 3 deployment)

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0 with TypeScript
- **Build Tool**: Vite 5.0.0
- **Styling**: Tailwind CSS 3.3.0
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Authentication**: JWT with bcrypt
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Render (Phase 3)

### Development Tools
- **API Testing**: REST Client (VS Code)
- **Version Control**: Git & GitHub
- **Environment**: Environment variables with dotenv

## 🏗️ Project Structure

```
smart-recipe-generator/
├── src/                    # Frontend React application
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── RecipeDisplay.jsx
│   │   └── RecipeForm.jsx
│   ├── App.jsx
│   └── main.jsx
├── backend/                # Backend API server
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   │   ├── authController.ts
│   │   │   └── recipeController.ts
│   │   ├── middleware/     # Authentication & validation
│   │   │   └── auth.ts
│   │   ├── routes/         # API endpoints
│   │   │   ├── auth.ts
│   │   │   └── recipes.ts
│   │   ├── lib/           # Database connection
│   │   │   └── prisma.ts
│   │   └── server.ts      # Express app configuration
│   ├── prisma/            # Database schema
│   │   └── schema.prisma
│   ├── .env.example       # Environment template
│   └── package.json
├── .env                   # Frontend environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database or Supabase account
- OpenAI API key

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@host:5432/database"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=5000
   OPENAI_API_KEY="sk-your-openai-key"
   CORS_ORIGIN="http://localhost:5173"
   ```

4. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies** (from root directory)
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user and receive JWT token

### Recipes (Protected Routes - Require Authentication)
- `GET /api/recipes` - Get user's recipes
- `POST /api/recipes` - Create new recipe
- `GET /api/recipes/:id` - Get single recipe by ID
- `PUT /api/recipes/:id` - Update existing recipe
- `DELETE /api/recipes/:id` - Delete recipe

### System
- `GET /api/health` - Health check endpoint

## 🔒 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Authentication**: Secure token-based authentication
- **User Authorization**: Users can only access their own data
- **CORS Protection**: Configured for frontend domain
- **Input Validation**: Comprehensive request validation
- **Environment Variables**: Sensitive data stored securely
- **SQL Injection Prevention**: Prisma ORM provides built-in protection

## 🧪 API Testing

The project includes comprehensive API testing setup:

```http
### Example: Create Recipe
POST http://localhost:5000/api/recipes
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Chocolate Chip Cookies",
  "ingredients": "2 cups flour, 1 cup butter, 1/2 cup sugar",
  "instructions": "1. Mix ingredients 2. Bake at 350°F",
  "dietary": "vegetarian"
}
```

## 📊 Database Schema

```sql
-- Users table
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  recipes   Recipe[]
}

-- Recipes table
model Recipe {
  id           String   @id @default(cuid())
  title        String
  ingredients  String
  instructions String
  dietary      String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  userId       String
  user         User     @relation(fields: [userId], references: [id])
}
```

## 🚀 Development Phases

### ✅ Phase 1: Frontend Development (Complete)
- [x] React application with AI recipe generation
- [x] Responsive design with Tailwind CSS
- [x] OpenAI API integration
- [x] Contact form with Formspree
- [x] Deployed to Vercel

### ✅ Phase 2: Backend Development (Complete)
- [x] Express.js API server with TypeScript
- [x] PostgreSQL database with Prisma ORM
- [x] User authentication system (JWT + bcrypt)
- [x] Complete CRUD operations for recipes
- [x] Security middleware and validation
- [x] Comprehensive API testing suite

### 🔄 Phase 3: Integration & Deployment (In Progress)
- [ ] Frontend-Backend integration
- [ ] Replace mock data with real API calls
- [ ] Backend deployment to Render
- [ ] Production environment configuration
- [ ] End-to-end testing

### 🔄 Phase 4: Polish & Portfolio (Planned)
- [ ] UI/UX improvements
- [ ] Error handling refinement
- [ ] Performance optimization
- [ ] Documentation completion
- [ ] Portfolio presentation

## 🎯 Learning Outcomes

This project demonstrates proficiency in:

### Backend Development
- RESTful API design and implementation
- Database schema design and relationships
- Authentication and authorization patterns
- Security best practices
- Error handling and validation
- API testing methodologies

### Frontend Development
- React component architecture
- State management
- API integration
- Responsive design
- User experience design

### DevOps & Tools
- Environment configuration
- Version control with Git
- Database migrations
- API documentation
- Testing strategies

## 🤝 Contributing

This is a portfolio project showcasing full-stack development skills. Feedback and suggestions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Leo Franco** - *Full Stack Developer*

- GitHub: [@leorfernandes](https://github.com/leorfernandes)
- LinkedIn: [Leonardo dos Reis Fernandes](https://linkedin.com/in/leonardodosreisfernandes)

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Supabase for database hosting
- Prisma team for the excellent ORM
- Express.js community
- React and Vite teams
- Tailwind CSS for the styling framework

---

**Built with ❤️ and lots of ☕ by Leo Fernandes**  
*Showcasing modern full-stack development practices*