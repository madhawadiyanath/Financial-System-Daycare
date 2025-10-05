# Daycare Management System

## Project Overview

A full-featured Daycare Management System built with the MERN stack (MongoDB, Express, React, Node.js). This project helps daycare administrators manage children, staff, attendance, finances, payments, schedules, and parent communication. It includes a dedicated financial module for payments, invoices, and advance salary requests.

## Key Features

* User roles: Admin, Manager, Staff, Parent
* Child profiles, enrollment and medical records
* Attendance tracking with daily reports
* Billing & payments (invoices, advance salary requests, payment history)
* Staff management (profiles, roles, salaries)
* Notifications and emails (booking confirmations, reminders)
* CRUD for all main entities (Children, Staff, Payments, Classes)
* Search, filters, and export (CSV/PDF)
* Responsive React frontend and RESTful API backend

## Tech Stack

* Frontend: React (create-react-app or Vite), React Router, Axios
* Backend: Node.js, Express
* Database: MongoDB (Mongoose)
* Authentication: JWT (JSON Web Tokens)
* Optional: Redux or Context API for state management
* Dev tooling: ESLint, Prettier, nodemon

## Repository Structure (suggested)

```
/client        # React frontend
/server        # Express backend
  /controllers
  /models
  /routes
  /middlewares
  /utils
/docs
README.md
```

## Installation (Development)

> Make sure you have Node.js and MongoDB installed (or use MongoDB Atlas).

1. Clone the repo:

```bash
git clone <repo-url>
cd daycare-management-system
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies (in a new terminal):

```bash
cd ../client
npm install
```

4. Environment variables (create `.env` in `server`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/daycaredb
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=smtp
EMAIL_USER=your@email.com
EMAIL_PASS=your-email-password
```

## Running Locally

Start backend:

```bash
cd server
npm run dev   # assumes nodemon for development
```

Start frontend:

```bash
cd client
npm start
```

The client will typically run at `http://localhost:3000` and the server at `http://localhost:5000`.

## Database Models (high-level)

* **User**: { name, email, passwordHash, role (admin|manager|staff|parent), phone }
* **Child**: { name, dob, parentId, medicalInfo, classId, enrollmentDate }
* **Staff**: { userId, position, salary, bankDetails, attendanceRecords }
* **Attendance**: { childId | staffId, date, status }
* **Payment / Invoice**: { payerId, amount, type, dueDate, status, createdAt }
* **AdvanceSalaryRequest**: { staffId, amount, status, requestedAt, approvedAt }

## API Endpoints (examples)

* `POST /api/auth/register` — Register user
* `POST /api/auth/login` — Login and receive JWT
* `GET /api/children` — Get list of children (auth required)
* `POST /api/children` — Create child profile
* `PUT /api/payments/:id` — Update payment status
* `POST /api/advance-salary` — Create advance salary request
* `GET /api/reports/attendance` — Attendance reports

> Protect routes with authentication middleware and role-based access control.

## Financial Module Notes

* Keep a separate payments collection with references to children or staff
* Support multiple payment modes (cash, card, bank transfer)
* Track invoices and receipts; allow downloading PDF receipts
* Implement validation to prevent duplicate payments and to reconcile payments with invoices

## Testing

* Backend: use Jest + Supertest for API tests
* Frontend: React Testing Library and Jest
* Add sample seeds for test data in `/server/seeds` to populate dev DB

## Deployment

* Build the React app (`npm run build`) and serve static files from Express for simple deployments
* Recommended hosting: Vercel/Netlify for frontend and Heroku/DigitalOcean/AWS for backend (or use a single VPS)
* Set environment variables on the host; use a managed MongoDB (Atlas) in production
* Ensure secure JWT secrets and use HTTPS in production

## Contribution

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes and push: `git commit -m "feat: add ..."`
4. Open a pull request describing your changes

## Useful Scripts (example `package.json` scripts)

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "seed": "node seeds/seed.js",
  "test": "jest"
}
```

## Future Improvements / Ideas

* Mobile app (React Native)
* Integrate online payment gateway (Stripe/PayHere)
* Two-factor authentication for staff/admin
* Calendar sync for parent schedules
* Automated reminders and monthly billing

## License

This project is open-source — add your license of choice (e.g., MIT).

## Contact

For questions and collaboration: `your-email@example.com`

---

_This R
