# 🚀 Andry – Modern Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-EF4444?logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Website portfolio responsif dengan palet abu-abu dan biru, animasi scroll yang halus, dan optimasi performa.

---

## 📸 Preview
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5f361bfc-51db-492a-8991-a16163d1103d" />

Live Demo: **[andrymldni-portfolio.vercel.app](https://andrymldni-portfolio.vercel.app)**

---

## ✨ Fitur Utama
- 🎯 **Desain Modern & Responsif** – Optimal di desktop & mobile.
- 🎞 **Animasi Halus** – Framer Motion untuk transisi yang lembut.
- 📌 **Navigasi Aktif** – Navbar dinamis sesuai posisi scroll.
- 🌟 **Hero** – Peran berganti otomatis, foto dengan tilt halus, dan parallax saat scroll.
- 📂 **Section Lengkap**:
  - **About** – Profil singkat, kontak, dan CV.
  - **Resume** – Pengalaman kerja, organisasi, pendidikan, sertifikasi.
  - **Projects** – Proyek flagship dengan angka dari data highlights, diikuti grid More projects; filter berlaku untuk kedua grup dan ponsel memakai tombol Show all. Label Course project menandai submission kursus; setiap proyek memiliki dialog dan halaman studi kasus statis.
  - **Contact** – Membuka draft Gmail, dengan fallback `mailto` jika popup diblokir; tanpa backend dan isi pesan tetap tersimpan di form.
- 🎨 **Tema terang & gelap** – Palet abu-abu dan biru (grafit, abu terang, satu aksen biru) tanpa gradien neon; gelap sebagai default.
- 📜 **Scroll reveal** – Setiap bagian muncul saat masuk viewport (Framer Motion `whileInView`).
- ♿ **Aksesibilitas** – Skip link, fokus keyboard, dan pengelolaan fokus modal; gerakan berulang/otomatis, parallax, dan tilt mengikuti `prefers-reduced-motion`, dengan kontrol pause/play sertifikat. Loader, intro hero, judul, dan transisi halaman memakai fade singkat saat reduced motion aktif.

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
 │   ├─ projects/[slug]/ # Halaman studi kasus statis dari data proyek
 │   ├─ fonts/          # Geist Sans / Geist Mono (self-hosted, woff2)
 │   ├─ layout.tsx      # Layout utama (Navbar, Footer, MotionProvider)
 │   ├─ page.tsx        # Halaman utama
 │   └─ globals.css     # Style global + custom class
 ├─ components/
 │   ├─ layout/         # Navbar, Footer, ScrollProgress, MotionProvider
 │   ├─ sections/       # Hero, About, Projects, CertificatesSlider, TechCarousel, Contact
 │   ├─ ui/             # Section, Reveal, BackToTop
 │   └─ resume/         # Resume
 ├─ hooks/              # Fokus dialog dan preferensi reduced motion
 └─ lib/
     ├─ data.ts         # Proyek, sertifikasi, email kontak, dan tautan sosial
     └─ site.ts         # URL kanonis situs
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

Validasi dan build produksi:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`lint` menjalankan ESLint dan `typecheck` menjalankan TypeScript tanpa emit.

---

## 🔧 Konfigurasi Environment
Buat file `.env.local` di root proyek:
```env
NEXT_PUBLIC_CONTACT_EMAIL=youremail@example.com
# Opsional: override URL kanonis dengan URL absolut, termasuk https://
# NEXT_PUBLIC_SITE_URL=https://portfolio.example.com
```
Jika tidak diisi atau kosong, alamat default di `src/lib/data.ts` digunakan.
Variabel publik ini dibaca saat build dan dipakai bersama oleh form kontak,
About, CV, dan JSON-LD; lakukan build/deploy ulang setelah mengubahnya.
Form membuka draft Gmail dan memakai `mailto` jika popup diblokir; pesan tidak
dikirim otomatis. Pengguna meninjau dan mengirim draft sendiri di Gmail atau
aplikasi email yang terkonfigurasi.
URL kanonis situs diatur di `src/lib/site.ts`, dengan urutan prioritas:

1. `NEXT_PUBLIC_SITE_URL`, jika diisi (URL absolut, misalnya `https://portfolio.example.com`).
2. `https://` + `VERCEL_PROJECT_PRODUCTION_URL`, domain produksi yang disediakan Vercel.
3. `https://andrymldni-portfolio.vercel.app` sebagai fallback lokal/non-Vercel.

Biarkan `NEXT_PUBLIC_SITE_URL` kosong agar domain mengikuti konfigurasi produksi
Vercel saat custom domain dipasang. Nilai ini dipakai bersama oleh metadataBase,
canonical, Open Graph, sitemap, robots, dan JSON-LD; lakukan build/deploy ulang
setelah mengubah domain atau environment variable. Trailing slash dinormalisasi
agar tautan turunan tidak memiliki slash ganda.

Kurasi proyek ada di `src/lib/data.ts`: `flagship: true` menempatkan proyek di
grup utama, dan `courseProject: true` menampilkan label submission kursus.
Angka kartu flagship berasal langsung dari `highlights`, sementara jumlah proyek,
filter, rute statis, navigasi proyek, sitemap, dan command palette mengikuti array
proyek yang sama.

---

## ☁️ Deploy ke Vercel
1. Fork atau clone repository ini.
2. Login ke [Vercel](https://vercel.com/).
3. Import repository ke Vercel.
4. Tambahkan environment variable `NEXT_PUBLIC_CONTACT_EMAIL`; isi `NEXT_PUBLIC_SITE_URL` hanya jika perlu override domain produksi otomatis.
5. Deploy dan nikmati hasilnya ✨.

---

## 📜 Lisensi
Proyek ini dilisensikan di bawah **MIT License** – silakan lihat file [LICENSE](LICENSE) untuk detail.

---

💡 **Dibuat dengan semangat oleh [Andry](https://andrymldni-portfolio.vercel.app)**
