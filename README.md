# Slooze Test Task

## 🚀 Live Demo

Check out the live project here: [Slooze Test Task Live](https://test-task-three-beryl.vercel.app/)

## 📄 Project Overview

This project is a simple store management interface built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, **Zustand**, **React Hook Form**, and **Next-Themes** for theme switching.

It includes functionality for:

* User authentication with roles (Manager, StoreKeeper)
* Theme toggle (light/dark mode)
* Adding, editing, and viewing products
* Role-based access control
* Persistent state across page reloads using local storage

## 🔧 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/astghikmkrtchyan18/test-task.git
cd test-task
```

Install dependencies using **Yarn**:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Build for production:

```bash
yarn build
```

Start the production server:

```bash
yarn start
```

## 🔐 Login Credentials

Use the following credentials to log in and test different roles:

| Role        | Email                                             | Password | Token Example          |
| ----------- | ------------------------------------------------- | -------- | ---------------------- |
| Manager     | [manager@example.com](mailto:manager@example.com) | 1234     | fake-manager-token     |
| StoreKeeper | [store@example.com](mailto:store@example.com)     | 1234     | fake-storekeeper-token |

## 🛠 Technologies Used

* **Next.js 16**
* **React 19**
* **Tailwind CSS 4**
* **Zustand** for state management
* **React Hook Form** & **Zod** for form validation
* **Next-Themes** for light/dark mode support

## 📁 Project Structure

```
├── components/        # React components
├── pages/             # Next.js pages
├── store/             # Zustand store
├── public/            # Static assets
├── styles/            # Tailwind CSS styles
├── README.md          # Project documentation
└── package.json       # Project metadata & scripts
```

## ⚡ Features

* Persistent login with localStorage
* Role-based access (Manager vs StoreKeeper)
* Add/Edit products dynamically
* Responsive UI with light/dark theme


---

**Note:** This project uses **Yarn** for package management.
