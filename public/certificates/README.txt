Taruh file gambar sertifikat kamu di sini (jpg/png/webp), lalu di
src/lib/data.ts tambahkan field `image` (dan `link` kalau ada URL
verifikasi/PDF) ke entry sertifikat yang sesuai, contoh:

{
  name: "Google Data Analytics Professional Certificate",
  issuer: "Google / Coursera",
  year: "2024",
  image: "/certificates/google-data-analytics.jpg",
  link: "https://coursera.org/verify/xxxxxxx",
},

Kalau belum ada gambar, card akan otomatis tampil dengan versi
ikon (fallback) seperti sebelumnya — jadi aman untuk diisi bertahap.
