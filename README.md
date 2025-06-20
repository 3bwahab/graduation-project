#  Graduation Project – Backend API

A complete Node.js-based backend server for a comprehensive **healthcare and mental wellness platform**. Designed to connect **parents, children, and doctors**, the system supports medical appointments, mental health sessions, pharmacy orders, AI-powered interactions, donations, and educational resources.


---

##  Tech Stack

- **Node.js** & **Express.js** – REST API development
- **MongoDB + Mongoose** – NoSQL database with schema validation
- **JWT Auth** – Secure token-based authentication
- **Stripe Webhooks** – Payment handling and donation tracking
- **CORS**, **Morgan**, **dotenv** – Middleware, logging, and environment management
- **Custom Error Handling** – APIError and global exception management

---

##  Core Features

###  Family System
- Parent registration and child linking
- Role-based access control for users, doctors, admins

###  Appointments & Sessions
- Book, update, and manage medical appointments
- Mental health sessions between doctors and children
- Session-based reviews and feedback modules

### 🛒 Pharmacy & Orders
- Medicine listing and online ordering
- Payment integration with **Stripe**
- Order confirmation via secure webhooks

###  Educational Articles
- Medical/psychological articles posted by doctors
- Article access and filtering by category

### 💬 AI-Assistant (Chat)
- AI-powered medical guidance chatbot (via `api/v1/ai`)
- Integrated with OpenAI/GPT (optional)

###  Charity Donations
- Secure online donations through Stripe
- Donation tracking and history per user

---

##  API Endpoints Overview

| Resource      | Endpoint                    | Description                          |
|---------------|-----------------------------|--------------------------------------|
| Auth          | `/api/v1/auth`              | Login, Signup, JWT Refresh           |
| Doctors       | `/api/v1/doctors`           | List, profile, sessions              |
| Parents/Child | `/api/v1/parents`, `/childs`| Relationship & child profiles        |
| Appointments  | `/api/v1/appointment`       | Book, cancel, list                   |
| Sessions      | `/api/v1/sessions`          | Mental health session management     |
| Reviews       | `/api/v1/reviews`           | Doctor reviews                       |
| Orders        | `/api/v1/orders`            | Medicine purchase orders             |
| Pharmacy      | `/api/v1/pharmacy`          | Medicine listing                     |
| Articles      | `/api/v1/articles`          | Education articles                   |
| AI Chat       | `/api/v1/ai`                | Medical chatbot (beta)               |
| Charity       | `/api/v1/charities`         | Donations, Stripe checkout           |

---

###  Install & Run

```bash
git clone https://github.com/3bwahab/graduation-project.git
cd graduation-project
npm install
npm run dev
