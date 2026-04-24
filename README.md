# LibrAspire

LibrAspire is a modern web application designed for library and book management. It has been migrated from a legacy monolithic HTML/JS structure to a decoupled architecture utilizing a Next.js React frontend and a Laravel backend.

## Project Structure

- **`/frontend`**: The Next.js frontend application.
  - Built with Next.js 15, React 19, and Tailwind CSS.
  - Features a modern, responsive, and dynamic user interface.
  - Integrates with the Open Library API and the Laravel backend.
- **`/example-app`**: The Laravel backend application.
  - Built with Laravel PHP framework.
  - Serves as the API backend for the Next.js application.

## Prerequisites

- **Node.js**: v18 or later (for the frontend).
- **PHP**: v8.2 or later (for the backend).
- **Composer**: PHP dependency manager.

## Setup Instructions

### Backend (Laravel)

1. Navigate to the backend directory:
   ```bash
   cd example-app
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Set up your environment variables:
   Copy `.env.example` to `.env` and configure your database settings.
   ```bash
   cp .env.example .env
   ```
4. Generate an application key:
   ```bash
   php artisan key:generate
   ```
5. Run the database migrations (if applicable):
   ```bash
   php artisan migrate
   ```
6. Start the local development server:
   ```bash
   php artisan serve
   ```
   The backend will typically be available at `http://127.0.0.1:8000`.

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Copy `.env.example` to `.env.local` (ensure it points to your Laravel backend).
   ```bash
   cp .env.example .env.local
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

## Features
- **Modern UI**: Completely overhauled using Tailwind CSS and React components.
- **Decoupled Architecture**: Clear separation of concerns between frontend (Next.js) and backend (Laravel).
- **Search Capabilities**: Integrated with the Open Library API for fetching book data.

## License

This project is open-source and available under the [MIT License](LICENSE).
