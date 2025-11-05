# Sagar Sajwan - Portfolio Website

A full-stack portfolio website built with React and Node.js showcasing projects, skills, and professional experience.

## 🚀 Features

- **Dynamic Portfolio**: Showcase projects, skills, and work experience
- **Admin Panel**: Manage portfolio content through admin interface
- **Project Management**: Add, update, delete projects with image galleries
- **Skills Management**: Organize skills by categories with proficiency levels
- **Contact System**: Contact form with email notifications
- **Image Upload**: Cloudinary integration for image management
- **Responsive Design**: Mobile-first responsive design
- **Authentication**: JWT-based admin authentication

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- GSAP (Animations)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Multer (File Upload)
- Joi (Validation)

## 📁 Project Structure

```
PORTFOLIO/
├── client/                           # React Frontend
│   ├── src/
│   │   ├── Components/               # Reusable UI components
│   │   │   ├── Card/                 # ProjectCard component
│   │   │   └── input/                # Button, Input components
│   │   ├── pages/                    # Main page components
│   │   │   ├── Portfolio/            # Portfolio pages
│   │   │   │   ├── components/       # Portfolio sub-components
│   │   │   │   │   ├── Contact/      # Contact page components
│   │   │   │   │   ├── Project/      # Project-related components
│   │   │   │   │   │   ├── SingleProjectsComp/  # Single project view
│   │   │   │   │   │   ├── PortfolioProjects.jsx
│   │   │   │   │   │   ├── PortfolioProjectsList.jsx
│   │   │   │   │   │   └── PortfolioSingleProject.jsx
│   │   │   │   │   ├── PortfolioAboutMe.jsx
│   │   │   │   │   ├── PortfolioName.jsx
│   │   │   │   │   ├── PortfolioSkillAndExpertiese.jsx
│   │   │   │   │   ├── PortfolioWorkExperience.jsx
│   │   │   │   │   └── PortfolioQuotePage.jsx
│   │   │   │   └── PortfolioLayout.jsx
│   │   │   ├── Admin/                # Admin panel pages
│   │   │   └── test/                 # Test components
│   │   ├── store/                    # Redux state management
│   │   │   ├── admin/                # Admin-related state
│   │   │   │   ├── auth/             # Authentication state
│   │   │   │   ├── project/          # Project management state
│   │   │   │   └── skills/           # Skills management state
│   │   │   └── store.js              # Main store configuration
│   │   ├── layout/                   # Layout components
│   │   ├── utils/                    # Utility functions
│   │   ├── assets/                   # Static assets
│   │   └── fonts/                    # Custom fonts
│   ├── public/                       # Public assets
│   └── package.json
├── server/                           # Node.js Backend
│   ├── src/
│   │   ├── controllers/              # Business logic
│   │   │   ├── auth.controller.js    # Authentication logic
│   │   │   ├── project.controller.js # Project CRUD operations
│   │   │   ├── skill.controller.js   # Skills management
│   │   │   ├── portfolio.controller.js # Portfolio data
│   │   │   ├── contact.controller.js # Contact form handling
│   │   │   └── user.controller.js    # User management
│   │   ├── models/                   # MongoDB schemas
│   │   │   ├── user.model.js         # User schema with work experience
│   │   │   ├── project.model.js      # Project schema with screenshots
│   │   │   ├── skill.models.js       # Skills with categories
│   │   │   ├── portfolio.model.js    # Portfolio content
│   │   │   └── contact.model.js      # Contact form submissions
│   │   ├── routes/                   # API route definitions
│   │   │   ├── auth.routes.js        # Authentication routes
│   │   │   ├── project.routes.js     # Project management routes
│   │   │   ├── skill.routes.js       # Skills routes
│   │   │   ├── portfolio.routes.js   # Portfolio routes
│   │   │   ├── contact.routes.js     # Contact routes
│   │   │   └── user.routes.js        # User routes
│   │   ├── middleware/               # Custom middleware
│   │   │   ├── verifyJWT.js          # JWT authentication
│   │   │   └── errorHandler.js       # Global error handling
│   │   ├── utils/                    # Utility functions
│   │   │   ├── cloudinary.js         # Image upload service
│   │   │   ├── multer.js             # File upload middleware
│   │   │   ├── validator.js          # Input validation
│   │   │   ├── ApiError.js           # Custom error class
│   │   │   ├── ApiResponse.js        # Standardized responses
│   │   │   └── AsyncHandler.js       # Async error handling
│   │   ├── db/                       # Database configuration
│   │   └── app.js                    # Express app configuration
│   ├── .env                          # Environment variables
│   └── server.js                     # Server entry point
└── README.md
```

## 🛣️ Frontend Routing Structure

```javascript
// Main App Routes (App.jsx)
<Routes>
  {/* Portfolio Public Routes */}
  <Route path='/' element={<PortfolioLayout/>}/>                    // Home page
  <Route path='/sagarsajwan/skills' element={<PortfolioSkillsDetailPage/>}/>
  <Route path='/sagarsajwan/projects' element={<PortfolioProjectsList/>}/>
  <Route path='/sagarsajwan/projects/:id' element={<PortfolioSingleProject/>}/>
  <Route path='/sagarsajwan/contact' element={<PortfolioContactDetailPage/>}/>
  
  {/* Admin Routes */}
  <Route path='/admin/auth' element={<AdminAuth/>}/>               // Admin login
  <Route path='/admin/homepage' element={<AdminLayout/>}/>         // Admin dashboard
  
  {/* Test Routes */}
  <Route path='/addingProjectTest' element={<ProjectAdding/>}/>     // Test project creation
  <Route path='/ProjectById' element={<ProjectById/>}/>             // Test project view
</Routes>
```

## 📚 API Endpoints & Controllers

### Authentication (`/api/v1/auth`)
```javascript
// auth.routes.js -> auth.controller.js
POST /register          // Register admin user
POST /login             // Admin login with JWT
```

### Projects (`/api/v1/project`)
```javascript
// project.routes.js -> project.controller.js
GET    /:id                                    // Get project by ID
POST   /                                       // Add new project (with images)
PUT    /editObjectdata/:id                     // Update project string data
PUT    /updateprojectArrayData/:id             // Update project arrays (tech, features)
PUT    /updateProjectImage/:projectId/:imageId // Update single project image
DELETE /deleteProjectImage/:projectId/:imageId/:public_id // Delete project image
POST   /addScreenshot/:projectId               // Add screenshot to project
```

### Skills (`/api/v1/skill`)
```javascript
// skill.routes.js -> skill.controller.js
GET    /               // Get all skills grouped by category
POST   /               // Add new skill
PUT    /:id            // Update skill
DELETE /:id            // Delete skill
```

### Portfolio (`/api/v1/portfolio`)
```javascript
// portfolio.routes.js -> portfolio.controller.js
GET    /               // Get portfolio data (about, images, etc.)
POST   /               // Create portfolio with images
PUT    /:id            // Update portfolio text data
PUT    /updateImage/:id/:public_id           // Update portfolio images
```

### Contact (`/api/v1/contact`)
```javascript
// contact.routes.js -> contact.controller.js
POST   /               // Submit contact form
```

### Users (`/api/v1/user`)
```javascript
// user.routes.js -> user.controller.js
// User management endpoints
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd PORTFOLIO
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Environment Setup**
Create `.env` file in server directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. **Start the application**

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## 🎨 Component Architecture

### Portfolio Layout Structure
```
PortfolioLayout.jsx                    // Main portfolio container
├── PortfolioName.jsx                  // Hero section with GSAP animations
├── PortfolioAboutMe.jsx               // About section with images
├── PortfolioSkillAndExpertiese.jsx    // Skills overview with navigation
├── PortfolioWorkExperience.jsx        // Work experience timeline
├── PortfolioProjects.jsx              // Projects showcase
├── PortfolioQuotePage.jsx             // Philosophy/quote section
└── PortfolioContactPage.jsx           // Contact information
```

### Project Components Structure
```
Project/
├── PortfolioProjectsList.jsx         // All projects grid view
├── PortfolioSingleProject.jsx        // Individual project page
├── SingleProjectsComp/               // Single project sub-components
│   ├── SingleProjectOverview.jsx     // Project details
│   ├── SingleProjectDescription.jsx  // Project description
│   ├── SingleProjectGallery.jsx      // Project screenshots
│   └── InterestedInWorkingTogether.jsx // CTA section
└── PortfolioOtherProject.jsx         // Related projects
```

### Data Models Relationships
```
User Model (user.model.js)
├── Personal Info (name, email, bio)
├── Work Experience (embedded array)
├── Contact Info (embedded object)
└── Social Links (embedded object)

Project Model (project.model.js)
├── Project Details (title, description, tech stack)
├── Screenshots Array (with Cloudinary URLs)
├── Project Metadata (duration, team size, role)
└── References User (createdBy)

Skill Model (skill.models.js)
├── Skill Info (name, category, proficiency)
├── Visual Data (icon, color)
└── References User (createdBy)

Portfolio Model (portfolio.model.js)
├── Additional Content (subtitle, quote)
├── Image Arrays (about images, quote images)
├── Logo & Skill Images
└── References User (owner)
```

### Key Features Implementation
- **GSAP Animations**: Used in PortfolioName.jsx for text animations
- **Image Management**: Cloudinary integration for all image uploads
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **State Management**: Redux Toolkit for admin panel state
- **Authentication**: JWT-based admin authentication
- **File Uploads**: Multer + Cloudinary for image handling

## 🔧 Development Guide

### Available Scripts

**Server:**
```bash
npm run dev     # Start development server with nodemon
npm start       # Start production server
```

**Client:**
```bash
npm run dev     # Start Vite development server (http://localhost:5173)
npm run build   # Build for production
npm run preview # Preview production build
```

### Development Workflow

1. **Adding New Features:**
   - Create controller in `/server/src/controllers/`
   - Define routes in `/server/src/routes/`
   - Create/update models in `/server/src/models/`
   - Add frontend components in `/client/src/pages/` or `/client/src/Components/`

2. **Image Upload Pattern:**
   ```javascript
   // Server: Use multer + cloudinary
   router.post('/', upload.single('image'), controller)
   
   // Client: Use FormData
   const formData = new FormData()
   formData.append('image', file)
   ```

3. **Authentication Flow:**
   ```javascript
   // Protected routes use verifyJWT middleware
   router.post('/', verifyJWT, controller)
   
   // Client stores JWT in localStorage/cookies
   headers: { Authorization: `Bearer ${token}` }
   ```

### Common Patterns

- **Error Handling**: All controllers use `asyncHandler` wrapper
- **Validation**: Joi schemas in `/server/src/utils/validator.js`
- **Responses**: Standardized with `ApiResponse` and `ApiError` classes
- **Database**: Mongoose with virtual populate for relationships

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Build and deploy the server code
3. Ensure MongoDB connection is configured

### Frontend Deployment
1. Update API base URL in client configuration
2. Build the React app: `npm run build`
3. Deploy the `dist` folder to your hosting platform

## 🚨 Important Notes for Developers

### Known Issues & Fixes
1. **Rate Limiting Error**: Remove `express-rate-limit` import from `app.js` if encountering TypeScript errors
2. **Image Upload**: Ensure field names match between client FormData and server multer config
3. **MongoDB Queries**: Use positional operator `$` for array updates instead of index variables

### Code Conventions
- **File Naming**: PascalCase for components, camelCase for utilities
- **API Routes**: RESTful conventions with descriptive endpoint names
- **Error Messages**: Descriptive error messages using ApiError class
- **Image Fields**: Always include both `url` and `public_id` for Cloudinary images

### Testing Routes
- Use `/addingProjectTest` for testing project creation
- Use `/ProjectById` for testing project retrieval
- Admin access: Click logo 3 times quickly to access admin panel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨💻 Author

**Sagar Sajwan**
- Email: sagarsajwan26@gmail.com
- Phone: +91 7454823359

---

Built with ❤️ using React and Node.js