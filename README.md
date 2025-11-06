# Slooze Test Task

A modern **Next.js 13** application demonstrating a store management system with role-based access, product management, and light/dark theme support.

---

## 📦 Project Overview

This project is a demo application built with **Next.js**, **React**, and **TypeScript**. It features:

- Role-based authentication (`Manager` and `StoreKeeper`)
- Persistent login state using **Zustand** and `localStorage`
- Product CRUD functionality (add, edit, view)
- Light/Dark theme toggle using **next-themes**
- Form validation using **React Hook Form** and **Zod**
- Modern UI with **TailwindCSS** and **Lucide React icons**

---

## ⚡ Features

### Authentication & Roles
- Login with role selection
- **Manager**: Can add and edit products
- **StoreKeeper**: Can view products only

### Products
- Add new products (name, category, description, price)
- Edit existing products
- Products persist in-memory and update dynamically on the page

### Theme Support
- Light and Dark mode
- Theme preference saved in `localStorage`
- Smooth transitions with TailwindCSS

---

## 🛠 Tech Stack

- **Next.js 16** – App framework
- **React 19** – UI library
- **TypeScript** – Type safety
- **TailwindCSS 4** – Utility-first CSS
- **Zustand** – State management with persistence
- **React Hook Form + Zod** – Form handling & validation
- **next-themes** – Theme toggling
- **Lucide React** – Icons

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/slooze-test-task.git
cd slooze-test-task
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
.
├── app/                 # Next.js app directory
├── components/          # Reusable components (Sidebar, Header, AddProductForm, etc.)
├── store/               # Zustand store (auth)
├── pages/api/           # API routes (auth, products)
├── public/              # Public assets
├── styles/              # Tailwind and global styles
└── README.md            # Project documentation
```

---

## 📝 Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server

---

## 💡 Notes

- Authentication state and theme preference are persisted in local storage.
- Product data is stored in-memory in API routes. Replace with a real database for production.
- The app demonstrates dynamic state updates when products are added or edited.