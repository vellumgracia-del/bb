# LibrAspire

LibrAspire adalah aplikasi web modern yang dirancang untuk manajemen perpustakaan dan koleksi buku. Aplikasi ini telah dimigrasi dari struktur HTML/JS monolitik tradisional menjadi arsitektur modern yang terpisah (*decoupled architecture*) menggunakan *frontend* **Next.js** dan *backend* **Laravel**.

## Penjelasan Aplikasi

LibrAspire memungkinkan pengguna untuk mencari, melihat, dan mengelola data buku dengan antarmuka yang modern, cepat, dan responsif. Aplikasi ini memanfaatkan integrasi pihak ketiga seperti **Open Library API** untuk mengambil informasi buku secara *real-time*, sekaligus memiliki sistem *backend* sendiri untuk kebutuhan penyimpanan atau manipulasi data kustom (API internal).

### Fitur Utama
- **Antarmuka Modern (UI/UX)**: Sepenuhnya dirancang ulang menggunakan Tailwind CSS dan komponen React untuk pengalaman interaktif.
- **Arsitektur Terpisah (*Decoupled*)**: Pemisahan yang jelas antara *frontend* (antarmuka pengguna) dan *backend* (API dan pengelolaan database).
- **Pencarian Terintegrasi**: Menggunakan Open Library API untuk menghadirkan data ekstensif terkait buku-buku.

---

## Struktur Proyek

Proyek ini dibagi menjadi dua bagian utama:

- **`/frontend`**: Aplikasi *Frontend* Next.js.
  - Dibangun menggunakan **Next.js 15**, **React 19**, dan **Tailwind CSS**.
  - Mengelola semua rute halaman, komponen UI, dan interaksi pengguna.
  - Berkomunikasi dengan Open Library API dan *backend* Laravel.
- **`/example-app`**: Aplikasi *Backend* Laravel.
  - Dibangun menggunakan *framework* PHP **Laravel**.
  - Berfungsi sebagai server API untuk *frontend* Next.js (mengelola database internal, autentikasi, dan logika bisnis lainnya jika diperlukan).

---

## Prasyarat (*Prerequisites*)

Sebelum menjalankan proyek ini, pastikan sistem Anda sudah memiliki instalasi berikut:

- **Node.js**: versi 18 atau yang lebih baru (dibutuhkan untuk *frontend* Next.js).
- **PHP**: versi 8.2 atau yang lebih baru (dibutuhkan untuk *backend* Laravel).
- **Composer**: Manajer dependensi untuk PHP.

---

## Panduan Instalasi dan Pengaturan (*Setup Instructions*)

### 1. Menjalankan Backend (Laravel)

1. Buka terminal dan masuk ke direktori *backend*:
   ```bash
   cd example-app
   ```
2. Instal semua dependensi PHP yang dibutuhkan:
   ```bash
   composer install
   ```
3. Atur *Environment Variables*:
   Salin file `.env.example` menjadi `.env` lalu sesuaikan konfigurasi database Anda di dalamnya.
   ```bash
   cp .env.example .env
   ```
4. Buat (*generate*) kunci aplikasi Laravel:
   ```bash
   php artisan key:generate
   ```
5. Jalankan migrasi database (jika ada struktur tabel yang perlu dibuat):
   ```bash
   php artisan migrate
   ```
6. Jalankan server *development* lokal:
   ```bash
   php artisan serve
   ```
   *Backend API biasanya akan berjalan di `http://127.0.0.1:8000`.*

### 2. Menjalankan Frontend (Next.js)

1. Buka terminal baru dan masuk ke direktori *frontend*:
   ```bash
   cd frontend
   ```
2. Instal semua dependensi Node.js yang dibutuhkan:
   ```bash
   npm install
   ```
3. Atur *Environment Variables*:
   Salin file `.env.example` menjadi `.env.local` (pastikan pengaturan di dalamnya mengarah ke *backend* Laravel Anda).
   ```bash
   cp .env.example .env.local
   ```
4. Jalankan server *development* lokal:
   ```bash
   npm run dev
   ```
   *Frontend aplikasi akan berjalan dan dapat diakses melalui browser di `http://localhost:3000`.*

---

## Lisensi

Proyek ini bersifat *open-source* dan dilisensikan di bawah [MIT License](LICENSE).
