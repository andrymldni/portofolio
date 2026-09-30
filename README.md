# 🚀 Andry – Modern Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-EF4444?logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Website portfolio responsif dengan palet hangat, animasi scroll yang halus, dan optimasi performa.

---

## 📸 Preview
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5f361bfc-51db-492a-8991-a16163d1103d" />

Live Demo: **[andrymldni.dev](https://portofolio-delta-liard.vercel.app/)**

---

## ✨ Fitur Utama
- 🎯 **Desain Modern & Responsif** – Optimal di desktop & mobile.
- 🎞 **Animasi Halus** – Framer Motion untuk transisi yang lembut.
- 📌 **Navigasi Aktif** – Navbar dinamis sesuai posisi scroll.
- 🌟 **Hero** – Peran berganti otomatis, foto dengan tilt halus, dan parallax saat scroll.
- 📂 **Section Lengkap**:
  - **About** – Profil singkat, kontak, dan CV.
  - **Resume** – Pengalaman kerja, organisasi, pendidikan, sertifikasi.
  - **Projects** – Showcase proyek dengan gambar, stack, link.
  - **Contact** – Form pesan via Gmail/email klien.
- 🎨 **Tema terang & gelap** – Palet abu-abu dan biru (grafit, abu terang, satu aksen biru) tanpa gradien neon; mengikuti tema sistem.
- 📜 **Scroll reveal** – Setiap bagian muncul saat masuk viewport (Framer Motion `whileInView`).
- ♿ **Aksesibilitas** – Fokus keyboard terlihat di semua kontrol; parallax dan tilt foto mati saat prefers-reduced-motion aktif.

---

## 🛠️ Teknologi
- [Next.js 16 (App Router, Turbopack)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Struktur Proyek
```
src/
 ├─ app/
 │   ├─ cv/             # Halaman CV (merender Resume inline)
 │   ├─ fonts/          # Poppins (self-hosted, woff2)
 │   ├─ layout.tsx      # Layout utama (Navbar, Footer, MotionProvider)
 │   ├─ page.tsx        # Halaman utama
 │   └─ globals.css     # Style global + custom class
 └─ components/
     ├─ layout/         # Navbar, Footer, ScrollProgress, MotionProvider
     ├─ sections/       # Hero, About, Projects, CertificatesSlider, TechCarousel, Contact
     ├─ ui/             # Section, Reveal, BackToTop
     └─ resume/         # Resume
```

---

## ⚙️ Instalasi & Menjalankan Lokal

> Pastikan Node.js ≥ 20.9 sudah terpasang.

```bash
# Clone repo
git clone https://github.com/username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka di browser: [http://localhost:3000](http://localhost:3000)

---

## 🔧 Konfigurasi Environment
Buat file `.env.local` di root proyek:
```env
NEXT_PUBLIC_CONTACT_EMAIL=youremail@example.com
```
Jika tidak diisi, default akan menggunakan `andrymldni@gmail.com`.

---

## ☁️ Deploy ke Vercel
1. Fork atau clone repository ini.
2. Login ke [Vercel](https://vercel.com/).
3. Import repository ke Vercel.
4. Tambahkan environment variable `NEXT_PUBLIC_CONTACT_EMAIL`.
5. Deploy dan nikmati hasilnya ✨.

---

## 📜 Lisensi
Proyek ini dilisensikan di bawah **MIT License** – silakan lihat file [LICENSE](LICENSE) untuk detail.

---

💡 **Dibuat dengan semangat oleh [Andry](https://andrymldni.dev)**
