# Slooze Test Task

A **Next.js 13** project with **TypeScript**, **Tailwind CSS**, **Zustand** for state management, **React Hook Form** with **Zod** validation, and **Next Themes** for light/dark mode support. This project includes a dashboard, products page, authentication, and role-based access (Manager / StoreKeeper).

---

## Features

* Light/Dark mode support using `next-themes`
* Role-based authentication (`Manager` / `StoreKeeper`)
* Add, edit, and list products
* Zustand store for persistent auth (`localStorage`)
* Responsive layout with Tailwind CSS
* Form validation using `react-hook-form` + `zod`

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/astghikmkrtchyan18/test-task.git
cd test-task
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

* `npm run dev` – start development server
* `npm run build` – build for production
* `npm run start` – start production server

---

## Login Credentials

Use the following credentials to log in and test different roles:

| Role        | Email                                             | Password | Token Example          |
| ----------- | ------------------------------------------------- | -------- | ---------------------- |
| Manager     | [manager@example.com](mailto:manager@example.com) | 1234     | fake-manager-token     |
| StoreKeeper | [store@example.com](mailto:store@example.com)     | 1234     | fake-storekeeper-token |

---

## Technologies Used

* **Next.js 13**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Zustand**
* **React Hook Form**
* **Zod**
* **Next Themes**
* **Lucide React Icons**

---

## License

This project is private and used for testing purposes.
