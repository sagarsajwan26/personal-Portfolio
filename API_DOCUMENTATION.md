# Portfolio API Documentation

**Base URL:** http://localhost:5000/api/v1

═══════════════════════════════════════════════════════════════════════════════

## AUTHENTICATION ENDPOINTS

### **POST | /auth/register**

**Full Route:** POST http://localhost:5000/api/v1/auth/register

**Description:** Register a new admin user account

**Authentication Required:** No

**Content-Type:** application/json

**Request Body:**
- email (String): User's email address - Required
- password (String): User's password (minimum 6 characters) - Required
- fullName (String): User's full name - Required

**Headers Required:**
```
Content-Type: application/json
```

---

### **POST | /auth/login**

**Full Route:** POST http://localhost:5000/api/v1/auth/login

**Description:** Login admin user and receive JWT token

**Authentication Required:** No

**Content-Type:** application/json

**Request Body:**
- email (String): User's email address - Required
- password (String): User's password - Required

**Headers Required:**
```
Content-Type: application/json
```

---

### **GET | /auth/logout**

**Full Route:** GET http://localhost:5000/api/v1/auth/logout

**Description:** Logout current user and clear authentication

**Authentication Required:** No

**Content-Type:** application/json

**Headers Required:**
```
Content-Type: application/json
```

═══════════════════════════════════════════════════════════════════════════════

## PROJECT ENDPOINTS

### **POST | /project**

**Full Route:** POST http://localhost:5000/api/v1/project

**Description:** Create a new project with images and details

**Authentication Required:** Yes

**Content-Type:** multipart/form-data

**Request Body:**
- title (String): Project title - Required
- description (String): Project description - Required
- techStack (Array): Technologies used - Required
- features (Array): Project features - Required
- projectDuration (String): Duration of project - Required
- teamSize (Number): Number of team members - Required
- role (String): Your role in project - Required
- liveUrl (String): Live project URL - Optional
- githubUrl (String): GitHub repository URL - Optional
- images (Files): Project screenshots - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

### **GET | /project/getProjects**

**Full Route:** GET http://localhost:5000/api/v1/project/getProjects

**Description:** Get all projects for admin (authenticated user)

**Authentication Required:** Yes

**Content-Type:** application/json

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **GET | /project/getProjectsForuser**

**Full Route:** GET http://localhost:5000/api/v1/project/getProjectsForuser

**Description:** Get all projects for public viewing (no authentication)

**Authentication Required:** No

**Content-Type:** application/json

**Headers Required:**
```
Content-Type: application/json
```

---

### **GET | /project/:id**

**Full Route:** GET http://localhost:5000/api/v1/project/:id

**Description:** Get a specific project by ID

**Authentication Required:** No

**Content-Type:** application/json

**Path Parameters:**
- id (String): The unique identifier of the project

**Headers Required:**
```
Content-Type: application/json
```

---

### **PUT | /project/editObjectdata/:id**

**Full Route:** PUT http://localhost:5000/api/v1/project/editObjectdata/:id

**Description:** Update project string data (title, description, etc.)

**Authentication Required:** Yes

**Content-Type:** application/json

**Path Parameters:**
- id (String): The unique identifier of the project

**Request Body:**
- title (String): Project title - Optional
- description (String): Project description - Optional
- projectDuration (String): Duration of project - Optional
- teamSize (Number): Number of team members - Optional
- role (String): Your role in project - Optional
- liveUrl (String): Live project URL - Optional
- githubUrl (String): GitHub repository URL - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **PUT | /project/updateprojectArrayData/:id**

**Full Route:** PUT http://localhost:5000/api/v1/project/updateprojectArrayData/:id

**Description:** Update project array data (tech stack, features)

**Authentication Required:** Yes

**Content-Type:** application/json

**Path Parameters:**
- id (String): The unique identifier of the project

**Request Body:**
- techStack (Array): Technologies used - Optional
- features (Array): Project features - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **PUT | /project/updateProjectImage/:projectId/:imageId**

**Full Route:** PUT http://localhost:5000/api/v1/project/updateProjectImage/:projectId/:imageId

**Description:** Update a specific project image

**Authentication Required:** Yes

**Content-Type:** multipart/form-data

**Path Parameters:**
- projectId (String): The unique identifier of the project
- imageId (String): The unique identifier of the image

**Request Body:**
- image (File): New image file - Required

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

### **DELETE | /project/deleteProjectImage/:projectId/:imageId/:public_id**

**Full Route:** DELETE http://localhost:5000/api/v1/project/deleteProjectImage/:projectId/:imageId/:public_id

**Description:** Delete a specific project image

**Authentication Required:** Yes

**Content-Type:** application/json

**Path Parameters:**
- projectId (String): The unique identifier of the project
- imageId (String): The unique identifier of the image
- public_id (String): Cloudinary public ID of the image

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **POST | /project/addScreenshot/:projectId**

**Full Route:** POST http://localhost:5000/api/v1/project/addScreenshot/:projectId

**Description:** Add a new screenshot to existing project

**Authentication Required:** Yes

**Content-Type:** multipart/form-data

**Path Parameters:**
- projectId (String): The unique identifier of the project

**Request Body:**
- image (File): Screenshot image file - Required

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

### **DELETE | /project/deleteProject/:projectId**

**Full Route:** DELETE http://localhost:5000/api/v1/project/deleteProject/:projectId

**Description:** Delete an entire project

**Authentication Required:** Yes

**Content-Type:** application/json

**Path Parameters:**
- projectId (String): The unique identifier of the project

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

═══════════════════════════════════════════════════════════════════════════════

## SKILL ENDPOINTS

### **GET | /skill**

**Full Route:** GET http://localhost:5000/api/v1/skill

**Description:** Get all skills grouped by category

**Authentication Required:** No

**Content-Type:** application/json

**Headers Required:**
```
Content-Type: application/json
```

---

### **POST | /skill/add**

**Full Route:** POST http://localhost:5000/api/v1/skill/add

**Description:** Add a new skill with icon

**Authentication Required:** Yes

**Content-Type:** multipart/form-data

**Request Body:**
- name (String): Skill name - Required
- category (String): Skill category - Required
- proficiency (Number): Proficiency level (1-100) - Required
- description (String): Skill description - Optional
- image (File): Skill icon/image - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

### **PUT | /skill/:id/:public_id**

**Full Route:** PUT http://localhost:5000/api/v1/skill/:id/:public_id

**Description:** Update an existing skill

**Authentication Required:** Yes

**Content-Type:** multipart/form-data

**Path Parameters:**
- id (String): The unique identifier of the skill
- public_id (String): Cloudinary public ID of the current image

**Request Body:**
- name (String): Skill name - Optional
- category (String): Skill category - Optional
- proficiency (Number): Proficiency level (1-100) - Optional
- description (String): Skill description - Optional
- image (File): New skill icon/image - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

### **DELETE | /skill/:id/:public_id**

**Full Route:** DELETE http://localhost:5000/api/v1/skill/:id/:public_id

**Description:** Delete a skill

**Authentication Required:** Yes

**Content-Type:** application/json

**Path Parameters:**
- id (String): The unique identifier of the skill
- public_id (String): Cloudinary public ID of the image

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **GET | /skill/:id**

**Full Route:** GET http://localhost:5000/api/v1/skill/:id

**Description:** Get a specific skill by ID

**Authentication Required:** No

**Content-Type:** application/json

**Path Parameters:**
- id (String): The unique identifier of the skill

**Headers Required:**
```
Content-Type: application/json
```

═══════════════════════════════════════════════════════════════════════════════

## PORTFOLIO ENDPOINTS

### **POST | /portfolio**

**Full Route:** POST http://localhost:5000/api/v1/portfolio

**Description:** Create portfolio data with images

**Authentication Required:** Yes

**Content-Type:** multipart/form-data

**Request Body:**
- subtitle (String): Portfolio subtitle - Optional
- aboutMe (String): About me description - Optional
- quote (String): Personal quote - Optional
- aboutImages (Files): About section images - Optional
- quoteImages (Files): Quote section images - Optional
- logo (File): Portfolio logo - Optional
- skillImages (Files): Skill section images - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

### **GET | /portfolio**

**Full Route:** GET http://localhost:5000/api/v1/portfolio

**Description:** Get portfolio data for public viewing

**Authentication Required:** No

**Content-Type:** application/json

**Headers Required:**
```
Content-Type: application/json
```

═══════════════════════════════════════════════════════════════════════════════

## CONTACT ENDPOINTS

### **POST | /contact**

**Full Route:** POST http://localhost:5000/api/v1/contact

**Description:** Submit contact form

**Authentication Required:** No

**Content-Type:** application/json

**Request Body:**
- name (String): Sender's name - Required
- email (String): Sender's email - Required
- subject (String): Message subject - Required
- message (String): Message content - Required

**Headers Required:**
```
Content-Type: application/json
```

═══════════════════════════════════════════════════════════════════════════════

## USER ENDPOINTS

### **GET | /user**

**Full Route:** GET http://localhost:5000/api/v1/user

**Description:** Get user profile data

**Authentication Required:** No

**Content-Type:** application/json

**Headers Required:**
```
Content-Type: application/json
```

---

### **PUT | /user/updateData**

**Full Route:** PUT http://localhost:5000/api/v1/user/updateData

**Description:** Update user profile data

**Authentication Required:** Yes

**Content-Type:** application/json

**Request Body:**
- fullName (String): User's full name - Optional
- email (String): User's email - Optional
- bio (String): User's biography - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **POST | /user/updateProfilePic**

**Full Route:** POST http://localhost:5000/api/v1/user/updateProfilePic

**Description:** Update user profile picture

**Authentication Required:** Yes

**Content-Type:** multipart/form-data

**Request Body:**
- profilePic (File): New profile picture - Required

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

### **POST | /user/addUserWorkExperience**

**Full Route:** POST http://localhost:5000/api/v1/user/addUserWorkExperience

**Description:** Add work experience to user profile

**Authentication Required:** Yes

**Content-Type:** application/json

**Request Body:**
- company (String): Company name - Required
- position (String): Job position - Required
- duration (String): Employment duration - Required
- description (String): Job description - Optional
- technologies (Array): Technologies used - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **PUT | /user/updateUserWorkExperience/:id**

**Full Route:** PUT http://localhost:5000/api/v1/user/updateUserWorkExperience/:id

**Description:** Update specific work experience

**Authentication Required:** Yes

**Content-Type:** application/json

**Path Parameters:**
- id (String): The unique identifier of the work experience

**Request Body:**
- company (String): Company name - Optional
- position (String): Job position - Optional
- duration (String): Employment duration - Optional
- description (String): Job description - Optional
- technologies (Array): Technologies used - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **PUT | /user/updateUserContactInfo**

**Full Route:** PUT http://localhost:5000/api/v1/user/updateUserContactInfo

**Description:** Update user contact information

**Authentication Required:** Yes

**Content-Type:** application/json

**Request Body:**
- phone (String): Phone number - Optional
- email (String): Email address - Optional
- address (String): Physical address - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **PUT | /user/updateUserSocialLinkData**

**Full Route:** PUT http://localhost:5000/api/v1/user/updateUserSocialLinkData

**Description:** Update user social media links

**Authentication Required:** Yes

**Content-Type:** application/json

**Request Body:**
- linkedin (String): LinkedIn profile URL - Optional
- github (String): GitHub profile URL - Optional
- twitter (String): Twitter profile URL - Optional
- instagram (String): Instagram profile URL - Optional

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### **DELETE | /user/deleteUserExperience/:id**

**Full Route:** DELETE http://localhost:5000/api/v1/user/deleteUserExperience/:id

**Description:** Delete specific work experience

**Authentication Required:** Yes

**Content-Type:** application/json

**Path Parameters:**
- id (String): The unique identifier of the work experience

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

═══════════════════════════════════════════════════════════════════════════════

## RESPONSE FORMAT

All API responses follow this standard format:

**Success Response:**
```json
{
  "statusCode": 200,
  "data": {
    // Response data here
  },
  "message": "Success message",
  "success": true
}
```

**Error Response:**
```json
{
  "statusCode": 400,
  "data": null,
  "message": "Error message",
  "success": false,
  "errors": []
}
```

═══════════════════════════════════════════════════════════════════════════════

## AUTHENTICATION

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is obtained from the `/auth/login` endpoint and should be stored securely on the client side.

═══════════════════════════════════════════════════════════════════════════════

## FILE UPLOAD GUIDELINES

For endpoints that accept file uploads:

1. **Supported Formats:** JPG, JPEG, PNG, GIF
2. **Max File Size:** 10MB per file
3. **Multiple Files:** Use array notation for multiple files
4. **Field Names:** Must match the parameter names specified in each endpoint

═══════════════════════════════════════════════════════════════════════════════

## ERROR CODES

- **200:** Success
- **201:** Created
- **400:** Bad Request
- **401:** Unauthorized
- **403:** Forbidden
- **404:** Not Found
- **500:** Internal Server Error