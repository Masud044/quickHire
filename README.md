# ⚡ QuickHire — Job Board Application

A full-stack job board built with **React.js**, **Node.js/Express**, **MongoDB**, and **Tailwind CSS**, closely matching the provided Figma design.

---

## 🚀 Features

### Public (User Facing)
- **Home Page** — Hero section, job categories, featured jobs, latest jobs, CTA banner
- **Job Listings** — Browse all jobs with search, category & type filters, pagination
- **Job Detail** — Full job description, requirements, responsibilities, salary
- **Apply Now** — Name, email, resume link (URL), cover note with validation

### Admin Panel (`/admin`)
- Dashboard stats (total jobs, featured, applications)
- View all job listings in a table
- Create new job listings (`/admin/new`)
- Edit existing jobs (`/admin/edit/:id`)
- Delete job listings
- View all submitted applications

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Forms | React Hook Form |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Validation | express-validator |

---

## 📁 Project Structure

```
quickhire/
├── backend/
│   ├── models/
│   │   ├── Job.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── jobs.js
│   │   └── applications.js
│   ├── server.js
│   ├── seed.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/       # Navbar, Footer
    │   │   ├── jobs/         # JobCard, SearchBar, FilterSidebar, ApplyForm
    │   │   └── common/       # Spinner
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── JobsPage.jsx
    │   │   ├── JobDetailPage.jsx
    │   │   ├── AdminPage.jsx
    │   │   └── JobFormPage.jsx
    │   ├── utils/
    │   │   ├── api.js         # Axios instance + API methods
    │   │   └── constants.js   # Categories, types, helpers
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

---

## ⚙️ Setup & Run Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas cloud)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/quickhire.git
cd quickhire
```

### 2. Backend Setup
```bash
cd backend
npm install

# Copy env file and fill in values
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/quickhire
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

```bash
# Seed sample job data (optional but recommended)
node seed.js

# Start the server
npm run dev      # development (nodemon)
# or
npm start        # production
```

Backend runs at: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Copy env file
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🌐 API Endpoints

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | List all jobs (with filters) |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create job (Admin) |
| PUT | `/api/jobs/:id` | Update job (Admin) |
| DELETE | `/api/jobs/:id` | Delete job (Admin) |
| GET | `/api/jobs/stats/overview` | Dashboard stats |

#### Query params for `GET /api/jobs`:
- `search` — full text search
- `category` — filter by category
- `type` — filter by job type
- `location` — filter by location
- `featured` — show featured only
- `page` — pagination page
- `limit` — results per page

### Applications
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications` | Submit application |
| GET | `/api/applications` | List all applications (Admin) |
| GET | `/api/applications/:id` | Get single application |

---

## 📊 Database Models

### Job
```
id, title, company, location, category, type, salary,
description, requirements[], responsibilities[], logo,
featured, active, createdAt, updatedAt
```

### Application
```
id, job (ref: Job), name, email, resumeLink,
coverNote, status, createdAt, updatedAt
```

---

## 🎨 Design
Implementation closely follows the [QuickHire Figma design](https://www.figma.com/design/cLdiYqgjKdvrn4c0vQBdIT/QSL---QuickHire--Task-for-A.-Soft.-Engineer).

Color palette:
- Primary Blue: `#3D3BF3`
- Dark: `#0F1035`
- Background: `#F8FAFC`

Fonts: **Sora** (display/headings) + **Plus Jakarta Sans** (body)

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Push to GitHub and connect to Vercel
```

### Backend → Railway / Render
1. Push to GitHub
2. Connect Railway/Render to your repo
3. Set environment variables in dashboard
4. Deploy!

### MongoDB → MongoDB Atlas
1. Create free cluster at cloud.mongodb.com
2. Get connection string
3. Update `MONGO_URI` in your deployment env vars

---

## 👤 Author
Built for the QuickHire Assessment Task.
