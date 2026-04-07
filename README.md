# JobHunt

JobHunt is a full‑stack job portal where **students** can discover and apply for jobs, and **recruiters** can manage companies, post jobs, and review applicants, all in a clean, modern interface.

---

## Features

### For Students
- Sign up and log in as a **student**
- Browse all jobs with:
  - Keyword search
  - Filters by location, role, and salary
- View detailed job descriptions
- Apply to jobs (one application per job)
- Profile page:
  - Edit personal details, bio, and skills
  - Upload a PDF resume (stored on Cloudinary)
  - View previously applied jobs

### For Recruiters
- Sign up and log in as a **recruiter**
- Create and manage companies
- Post new jobs and manage existing ones
- View applicants for each job:
  - See candidate details and contact info
  - Open candidate resumes in a new tab
  - Update application status (pending / accepted / rejected)

### General
- Role‑based protected routes (student vs recruiter)
- Responsive UI with modern styling and animations
- Clean job and applicant tables with filters and action menus

---

## Tech Stack

**Frontend**
- React
- React Router
- Redux Toolkit
- Tailwind CSS + shadcn‑ui
- Framer Motion
- Axios

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication (HTTP‑only cookies)
- Cloudinary for file storage (resumes, profile images)
- Multer / file upload utilities

---

## Setup & Usage

### 1. Clone the repository

```bash
git clone https://github.com/your-username/jobhunt.git
cd jobhunt
```

### 2. Install dependencies

Frontend (e.g. `client` folder):

```bash
cd client
npm install
```

Backend (e.g. `server` folder):

```bash
cd server
npm install
```

### 3. Configure environment variables (backend)

Create a `.env` file in the backend with values like:

```bash
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173   # or your frontend URL
PORT=5000
```

### 4. Run the app

Backend:

```bash
cd server
npm run dev   # or npm start
```

Frontend:

```bash
cd client
npm run dev
```

- Frontend: `http://localhost:5173` (or your dev port)
- Backend: `http://localhost:5000` (or your configured port)

Make sure your frontend API constants (`USER_API_END_POINT`, `APPLICANT_API_END_POINT`, etc.) point to the backend URL.

---

## How to Use

1. **Student**
   - Register as a student, complete your profile, upload your resume, then browse and apply for jobs.
   - Track all your applications from the Profile → Applied Jobs section.

2. **Recruiter**
   - Register as a recruiter, create your company, and start posting jobs.
   - Open the Applicants view for a job to see all candidates, view resumes, and update their status.

---

You can extend JobHunt further with features like pagination, email notifications, or analytics as needed.