export type Project = {
  title: string;
  stack?: string[];
  link?: string;
  /** Live demo / deployed app URL, shown as a secondary CTA when present. */
  demo?: string;
  image?: string;
  /** Marks the project for a larger "featured" grid cell on desktop. */
  featured?: boolean;
  category?: string;
  desc?: string;
  details?: string;
};

export const projects: Project[] = [
  {
    title: "FloraScan — Plant Disease Scanner",
    stack: ["JavaScript", "TensorFlow.js", "Computer Vision"],
    link: "https://github.com/andrymldni/plantDisease",
    demo: "https://andrymldni.github.io/plantDisease/",
    image: "/projects/florascan.png",
    featured: true,
    category: "Computer Vision",
    desc: "Scan a leaf photo, get an instant plant-disease diagnosis in the browser.",
    details:
      "A browser-based plant disease scanner: snap or upload a leaf photo and an in-browser TensorFlow.js model identifies the disease instantly, with zero server round-trip. Built to give smallholder farmers and hobby growers a fast, accessible diagnosis tool that runs on any phone browser.",
  },
  {
    title: "Human Resources Analytics",
    stack: ["Python", "Docker", "Metabase"],
    link: "https://github.com/andrymldni/Dicoding-HR-Analytics",
    image: "/proyek1.jpeg",
    category: "AI/ML",
    desc: "Predict employee churn and retention dashboard.",
    details:
      "Built an end-to-end analytics pipeline to predict employee attrition using a Logistic Regression classifier. Raw HR data was cleaned and feature-engineered before training, then the results were visualized on an interactive Metabase dashboard deployed with Docker — giving the HR team a real-time view of retention risk factors.",
  },
  {
    title: "Human Stress Detection",
    stack: ["Python", "TensorFlow", "Pipeline"],
    link: "https://github.com/andrymldni/Dicoding-MLOps-Pipeline",
    image: "/proyek2.jpeg",
    category: "AI/ML",
    desc: "Detect stress from diary-like text using DL binary classifier.",
    details:
      "A TensorFlow-based deep learning binary classifier that picks up signs of stress from diary-style text. Structured as a full MLOps pipeline — text preprocessing, training, evaluation, and deployment prep — with an emphasis on reproducibility and a clean experiment structure.",
  },
  {
    title: "Certification Success Prediction",
    stack: ["Python", "Neural Network", "Streamlit"],
    link: "https://github.com/andrymldni/Dicoding-ML-Terapan/blob/main/Laporan%20Proyek%20Machine%20Learning%20-%20Andry.md",
    image: "/proyek3.jpeg",
    category: "ML",
    desc: "Predict assessment outcomes with NN for consistency and efficiency.",
    details:
      "A lightweight neural network that predicts certification pass outcomes based on a participant's performance history, wrapped in a Streamlit interface so non-technical users can explore the predictions easily. The focus here was on consistent model evaluation and a more efficient assessment process.",
  },
  {
    title: "Book Recommendation System",
    stack: ["Python"],
    link: "https://github.com/andrymldni/Dicoding-ML-Terapan/blob/main/Laporan%20Proyek%20Machine%20Learning%202%20-%20Andry.md",
    image: "/proyek4.jpg",
    category: "ML",
    desc: "Personalized book recommendations via ML.",
    details:
      "A book recommendation system combining content-based and collaborative filtering. The model was evaluated using precision@k and AUC to make sure recommendations stay relevant and genuinely personal for each user.",
  },
  {
    title: "Bike Sharing Analytics Dashboard",
    stack: ["Python", "Pandas", "Streamlit"],
    link: "https://github.com/andrymldni/Dicoding-Bikes-Sharing",
    category: "Data Analytics",
    desc: "Interactive dashboard uncovering ridership trends and seasonality.",
    details:
      "End-to-end data wrangling, EDA, and visualization on a bike-share ridership dataset — cleaning raw ride logs, exploring usage patterns by weather, season, and time of day, then shipping the findings as an interactive Streamlit dashboard for quick exploration.",
  },
  {
    title: "Student Dropout Prediction",
    stack: ["Python", "Scikit-learn", "Classification"],
    link: "https://github.com/andrymldni/Dicoding-Student-Status-Predictions",
    category: "ML",
    desc: "Early-warning model flagging students at risk of dropping out.",
    details:
      "A classification model built for an education institute that flags students likely to drop out before it happens, using academic and demographic features. The goal: give the institution enough lead time to step in with guidance and support before a student disengages.",
  },
  {
    title: "Campus Placement Prediction",
    stack: ["Python", "MLOps", "Classification"],
    link: "https://github.com/andrymldni/Dicoding-MLOps-Campus",
    category: "MLOps",
    desc: "Binary classifier predicting university admission placement outcomes.",
    details:
      "A binary classification pipeline predicting campus placement/admission outcomes from applicant data, built as an MLOps submission with an emphasis on a reproducible flow — from data validation through to model packaging and evaluation.",
  },
  {
    title: "Gesture Volume Control",
    stack: ["Python", "OpenCV", "MediaPipe"],
    link: "https://github.com/andrymldni/GestureVolumeControl",
    category: "Computer Vision",
    desc: "Control system volume in real time using hand-gesture recognition.",
    details:
      "A real-time computer-vision app that reads hand landmarks from a webcam feed and maps thumb-to-index finger distance to system volume — a hands-free interface built with OpenCV, MediaPipe hand tracking, and Pycaw for native audio control.",
  },
  {
    title: "Cek Kata Baku",
    stack: ["Python", "NLP"],
    link: "https://github.com/andrymldni/cek-kata-baku",
    category: "NLP",
    desc: "Checks Indonesian words against standard spelling with smart suggestions.",
    details:
      "A lightweight tool that checks whether an Indonesian word is 'baku' (standard) per KBBI, and suggests the closest valid alternative when it isn't — handy for quick writing cleanup and language-consistency checks.",
  },
];

export const tools = [
  "Python",
  "SQL",
  "Apache Spark",
  "PostgreSQL",
  "BigQuery",
  "MySQL",
  "Docker",
  "Google Cloud",
  "Linux",
  "Grafana",
  "TensorFlow",
  "Scikit-learn",
  "Power BI",
  "Git",
  "Metabase",
] as const;

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  /** Path to a certificate image, e.g. "/certificates/gda.jpg" (put the file in /public/certificates) */
  image?: string;
  /** Link opened when the card is clicked — a PDF path, a Credly/Coursera verify URL, etc. */
  link?: string;
};

export const certifications: Certification[] = [
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Coursera",
    year: "2024",
    image: "/certificates/Sertifikat1.jpg",
    link: "https://coursera.org/share/67f261404346718b6bb8fc8c6e36afee",
  },
  {
    name: "Google IT Automation with Python",
    issuer: "Coursera",
    year: "2024",
    image: "/certificates/Sertifikat2.jpg",
    link: "https://coursera.org/share/f062c309d55993dbaf402aad0592dc49",
  },
  {
    name: "Machine Learning Operations (MLOps)",
    issuer: "Dicoding",
    year: "2024",
    image: "/certificates/Sertifikat3.jpg",
    link: "https://www.dicoding.com/certificates/KEXLYGRK4ZG2",
  },
  {
    name: "Alibaba Cloud - ACA Big Data Certification",
    issuer: "Alibaba Cloud",
    year: "2024",
    image: "/certificates/Sertifikat4.png",
    link: "https://drive.google.com/file/d/109xavq6iGXZvszXBPO7ePkXAKBR7kvml/view?usp=sharing",
  },
  {
    name: "Bangkit Academy 2024 - Machine Learning",
    issuer: "Kampus Merdeka",
    year: "2024",
    image: "/certificates/Sertifikat5.jpg",
    link: "https://drive.google.com/file/d/1ATPmjvkr9727_kuHebhhuUxi5k4n9MaW/view",
  },
  {
    name: "Junior Web Programmer",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    year: "2023",
    image: "/certificates/Sertifikat6.jpg",
    link: "https://drive.google.com/file/d/1VuPYmJTi_DkxuNqX5ZKrWOvFoCL8OdeC/view?usp=sharing",
  },
];
