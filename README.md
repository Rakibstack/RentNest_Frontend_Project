
RentNest 🏠

A full-stack rental platform built with Next.js, TypeScript, PostgreSQL, Prisma, and Express.js.

RentNest connects tenants, landlords, and admins in one rental workflow — from discovering properties to rental requests, approval, payment, and reviews.

Live Link : https://rentnest-frontend-project.vercel.app

🎯 What I Built

🏠 Property browsing and property details

🔐 Authentication with role-based access control

👤 Tenant, Landlord & Admin dashboards

🏢 Landlord property management (create, update, delete, availability)

📩 Rental request workflow

✅ Landlord request approval/rejection

💳 Rental payment integration with Stripe

⭐ Review system after rental/payment flow

👤 Profile management

⚡ Loading skeletons, caching and server-side data fetching

🛡️ Protected routes and server-side authorization

🔄 Core Rental Workflow

Browse Property → Send Rental Request → Landlord Approves → Tenant Pays → Rental Completed → Review

This turns RentNest from a simple property listing site into a complete rental management workflow.

🧠 Key Engineering Decisions

Authentication & Authorization

Implemented protected routes and role-based access control (RBAC) so tenants, landlords, and admins only access the features relevant to their roles.

Performance

Used Next.js server-side data fetching, caching/revalidation where appropriate, loading skeletons, and optimized image rendering to improve perceived performance and reduce unnecessary requests.

Backend Architecture

Built REST APIs with Express.js + Prisma + PostgreSQL, with validation and authorization handled on the server.

🛠️ Tech Stack

Frontend: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
Backend: Node.js, Express.js, TypeScript
Database: PostgreSQL, Prisma ORM
Auth & Security: JWT, Cookies, RBAC, Zod, bcrypt
Payment: Stripe
Tools: Git, GitHub, Postman

📈 Impact

RentNest demonstrates how I designed and implemented a real-world full-stack application with:

Multiple user roles and permissions

Real business workflows instead of basic CRUD only

Secure server-side API integration

Payment and transactional flows

Responsive SaaS-style UI

Performance-focused data fetching and UX

🚀 Future Improvements

Advanced property search and filtering

Pagination and sorting improvements

Notifications

Rental history and analytics

Automated payment/webhook reconciliation

More detailed admin analytics

👨‍💻 Developer

Rakibul Hasan Rakib — Full-Stack Developer

Built to demonstrate practical full-stack development, backend architecture, database design, authentication, payments, and production-oriented UI/UX.