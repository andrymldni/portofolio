import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "andrymldni@gmail.com";

// Verified BRI internship coverage, shared by the resume and the homepage.
export const briInternshipCoverage = {
  agents: 1_190_000,
  regionalOffices: 18,
  regencies: 586,
} as const;

export const briAgentCountLabel = `${(briInternshipCoverage.agents / 1_000_000).toFixed(2)}M+`;

export const socialLinks = {
  github: {
    label: "GitHub",
    href: "https://github.com/andrymldni",
    icon: Github,
    footerOrder: 0,
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrymldni",
    icon: Linkedin,
    footerOrder: 1,
  },
  instagram: {
    label: "Instagram",
    href: "https://www.instagram.com/andrymldni",
    icon: Instagram,
    footerOrder: 3,
  },
  twitter: {
    label: "Twitter",
    href: "https://twitter.com/andrymldni",
    icon: Twitter,
    footerOrder: 2,
  },
};

export type Project = {
  slug: string;
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
  problem?: string;
  role?: string;
  approach?: string[];
  results?: string;
  highlights?: { value: string; label: string }[];
};

// Editorial order stays intact in the desktop bento and in filtered views.
export const projects: Project[] = [
  {
    title: "BRILink Sentiment Intelligence",
    slug: "brilink-sentiment-intelligence",
    stack: ["Airflow", "dbt", "PostgreSQL", "IndoBERT", "Metabase", "Docker"],
    link: "https://github.com/andrymldni/de-sentiment-analisis",
    image: "/projects/brilink-sentiment.jpg",
    featured: true,
    category: "Data Engineering",
    desc: "End-to-end pipeline tracking public sentiment on BRILink across news, app reviews, and social media.",
    details:
      "An end-to-end data engineering pipeline that monitors public perception of BRILink, BRI's 1.18M-agent banking network. Eleven connectors pull news, app-store reviews, and social conversations into PostgreSQL, gated by Great Expectations data-quality checks. An IndoBERT-based ensemble scores each document with a confidence level and aspect-level sentiment across 8 business aspects, dbt models the warehouse into 9 marts backed by 79 tests, and Airflow orchestrates the whole flow. Results land in an auto-provisioned 22-card Metabase dashboard, with low-confidence documents routed to a human review queue. Runs on Docker Compose with a 5-job GitHub Actions CI. Independent portfolio project, not affiliated with BRI.",
    problem:
      "BRILink agents are the face of BRI's branchless banking network, but public perception is scattered across news, app reviews, and social media. Without a unified view, negative signals and service failures are hard to spot early.",
    role: "Built the project independently as a portfolio piece; it is not affiliated with BRI.",
    approach: [
      "Ingest news, app-store reviews, forum threads, search trends, and social comments through 11 connectors into a PostgreSQL raw layer.",
      "Validate incoming data with 10 Great Expectations checks and keep connector state in Redis.",
      "Score each document with a four-signal IndoBERT ensemble and aspect-level sentiment across 8 business aspects.",
      "Model the warehouse with dbt into 5 staging, 2 intermediate, and 9 mart models backed by 79 tests.",
      "Orchestrate ingestion, scoring, and dbt with Airflow, then provision a 22-card Metabase dashboard and CSV exports.",
    ],
    results:
      "The pipeline produces a 22-card Metabase dashboard with sentiment KPIs, aspect trends, source scorecards, alerts, and a human review queue. dbt ships 79 tests and CI runs 5 jobs, including a real warehouse integration test.",
    highlights: [
      { value: "66,450", label: "villages in the BRILink network" },
      { value: "11", label: "data connectors" },
      { value: "79", label: "dbt tests" },
    ],
  },
  {
    title: "Human Resources Analytics",
    slug: "human-resources-analytics",
    stack: ["Python", "Docker", "Metabase"],
    link: "https://github.com/andrymldni/Dicoding-HR-Analytics",
    image: "/proyek1.jpeg",
    category: "AI/ML",
    desc: "Predict employee churn and retention dashboard.",
    details:
      "Built an end-to-end analytics pipeline to predict employee attrition using a Logistic Regression classifier. Raw HR data was cleaned and feature-engineered before training, then the results were visualized on an interactive Metabase dashboard deployed with Docker — giving the HR team a real-time view of retention risk factors.",
    problem:
      "Jaya Jaya Maju faced an attrition rate above 10% and needed to understand which employees were most likely to leave. The HR team had employee records but no data-driven view of retention risk.",
    role: "Individual Dicoding data-science submission covering business understanding, modeling, and the Metabase dashboard.",
    approach: [
      "Explore the 1,471-row, 35-column employee dataset and identify attributes tied to attrition.",
      "Encode categorical features with OrdinalEncoder and scale numeric features with StandardScaler.",
      "Split the data 80:20 and train a scikit-learn logistic regression classifier.",
      "Inspect feature importance and save the trained model plus encoders for the prediction script.",
      "Load the cleaned data into PostgreSQL/Supabase and build a Metabase dashboard with a Dockerfile.",
    ],
    results:
      "The project delivers a trained logistic regression model, a prediction script, and a Metabase dashboard that highlights attrition patterns by department, role, marital status, and education. The analysis starts from an attrition rate above 10%.",
    highlights: [
      { value: "1,471", label: "employees in the dataset" },
      { value: "35", label: "dataset columns" },
      { value: ">10%", label: "attrition rate cited" },
    ],
  },
  {
    title: "Human Stress Detection",
    slug: "human-stress-detection",
    stack: ["Python", "TensorFlow", "Pipeline"],
    link: "https://github.com/andrymldni/Dicoding-MLOps-Pipeline",
    image: "/proyek2.jpeg",
    category: "AI/ML",
    desc: "Detect stress from diary-like text using DL binary classifier.",
    details:
      "A TensorFlow-based deep learning binary classifier that picks up signs of stress from diary-style text. Structured as a full MLOps pipeline — text preprocessing, training, evaluation, and deployment prep — with an emphasis on reproducibility and a clean experiment structure.",
    problem:
      "People often express stress or anxiety in diary-like text, but manually reading and flagging those entries does not scale. The project tests whether a text classifier can detect signs of stress from a written vent.",
    role: "Individual Dicoding MLOps submission covering the TFX pipeline, model training, and evaluation.",
    approach: [
      "Keep only the text and label columns from the seven-feature Human Stress Detection dataset and lowercase the text.",
      "Split the data 80:20 and build a Keras text model with vectorization, a 16-dimensional embedding, AveragePooling1D, and 64/32-unit dense layers.",
      "Train with Adam, binary crossentropy, and BinaryAccuracy.",
      "Package the preprocessing and training steps as TFX Transform and Trainer components.",
      "Evaluate the exported model and record metrics for the binary stress classification task.",
    ],
    results:
      "The model reached an AUC of 83% and BinaryAccuracy of 74% on 575 evaluation examples, with a loss of 1.456. There are 86 false negatives and 62 false positives, and accuracy remains below 80%.",
    highlights: [
      { value: "83%", label: "AUC" },
      { value: "74%", label: "BinaryAccuracy" },
      { value: "575", label: "evaluation examples" },
    ],
  },
  {
    title: "FloraScan — Plant Disease Scanner",
    slug: "florascan",
    stack: ["JavaScript", "TensorFlow.js", "Computer Vision"],
    link: "https://github.com/andrymldni/plantDisease",
    demo: "https://andrymldni.github.io/plantDisease/",
    image: "/projects/florascan.png",
    featured: true,
    category: "Computer Vision",
    desc: "Scan a leaf photo, get an instant plant-disease diagnosis in the browser.",
    details:
      "A browser-based plant disease scanner: snap or upload a leaf photo and an in-browser TensorFlow.js model identifies the disease instantly, with zero server round-trip. Built to give smallholder farmers and hobby growers a fast, accessible diagnosis tool that runs on any phone browser.",
    problem:
      "A diseased leaf can look like several different problems, and growers often lack a quick way to narrow down the cause. FloraScan puts a trained image classifier and symptom/treatment guidance in the browser so a photo can be checked without a server call.",
    role: "Individual project: built the browser interface and integrated the Keras model after converting it to TensorFlow.js.",
    approach: [
      "Train a 5-block CNN in Keras 2.15 with Conv2D and MaxPooling2D layers, followed by Flatten, Dropout, and Dense layers.",
      "Convert the 16-layer model to a TensorFlow.js 4.20 layers model.",
      "Load model/model.json in the browser when the page opens.",
      "Resize the uploaded leaf photo to 256x256, run the prediction, and take the highest-scoring class.",
      "Map the class to one of five categories (Bacterial, Fungal, Hama, Healthy, Virus) and show symptoms and treatment guidance in a popup.",
    ],
    results:
      "The app runs entirely client-side: an uploaded image is classified in the browser and the predicted category opens a popup with symptoms and treatment steps.",
    highlights: [],
  },
  {
    title: "Certification Success Prediction",
    slug: "certification-success-prediction",
    stack: ["Python", "Scikit-learn", "Neural Network"],
    link: "https://github.com/andrymldni/Dicoding-ML-Terapan/blob/main/Laporan%20Proyek%20Machine%20Learning%20-%20Andry.md",
    image: "/proyek3.jpeg",
    category: "AI/ML",
    desc: "Predict assessment outcomes with NN for consistency and efficiency.",
    details:
      "A neural network that predicts certification pass outcomes from a participant's learning history, compared against a K-Nearest Neighbors baseline. The work focuses on consistent model evaluation and a more efficient assessment process.",
    problem:
      "Assessors evaluating professional certification candidates can produce inconsistent or subjective scores when participant volume grows. The project asks whether a model trained on learning history can make assessment predictions more consistent.",
    role: "Individual Dicoding machine-learning submission, covering preprocessing, model comparison, and evaluation.",
    approach: [
      "Drop the index, name, and user ID columns from the 20,000-row, 16-column Tech-Student Profile dataset.",
      "Fill missing values with each column's median, split the data 70:30, and standardize the features.",
      "Train K-Nearest Neighbors with n_neighbors=5 and a neural network with hidden layers of 128, 64, and 32 neurons.",
      "Use Adam and up to 500 iterations for the neural network, then compare both models with accuracy, precision, recall, and F1-score.",
      "Recommend the better model for certification assessment support.",
    ],
    results:
      "The neural network reached 0.9535 accuracy, ahead of K-Nearest Neighbors at 0.9340. The neural network is the better model for predicting certification assessment outcomes.",
    highlights: [
      { value: "0.9535", label: "neural network accuracy" },
      { value: "0.9340", label: "KNN accuracy" },
      { value: "20,000", label: "dataset rows" },
    ],
  },
  {
    title: "Book Recommendation System",
    slug: "book-recommendation-system",
    stack: ["Python"],
    link: "https://github.com/andrymldni/Dicoding-ML-Terapan/blob/main/Laporan%20Proyek%20Machine%20Learning%202%20-%20Andry.md",
    image: "/proyek4.jpg",
    category: "AI/ML",
    desc: "Personalized book recommendations via ML.",
    details:
      "A book recommendation system combining content-based and collaborative filtering. The content-based model was evaluated with precision, recall, and F1-score, and the collaborative model with RMSE, to keep recommendations relevant and personal for each user.",
    problem:
      "Readers looking for their next book face a catalog of hundreds of thousands of titles, and keyword search does little to match taste. The project explores recommendation methods that use ratings and book metadata to surface relevant titles.",
    role: "Individual Dicoding machine-learning submission covering preprocessing, two recommendation models, and evaluation.",
    approach: [
      "Merge the Books, Ratings, and Users files and clean missing values plus duplicate ISBNs.",
      "Keep the first 10,000 records to fit the memory budget and cap the experiment.",
      "Build a content-based model with TF-IDF on title and author, then rank books with cosine similarity.",
      "Build a collaborative-filtering RecommenderNet with user and book embeddings, trained with Adam and binary crossentropy.",
      "Evaluate content-based recommendations with precision, recall, and F1, and collaborative filtering with RMSE.",
    ],
    results:
      "The content-based model returned five similar titles for a sample book, with precision, recall, and F1 close to 1.0. The collaborative model reached RMSE 0.2415 on training data and 0.2903 on validation data and produced top-10 recommendations for a user.",
    highlights: [
      { value: "0.2415", label: "training RMSE" },
      { value: "0.2903", label: "validation RMSE" },
      { value: "10,000", label: "records used" },
    ],
  },
  {
    title: "Bike Sharing Analytics Dashboard",
    slug: "bike-sharing-analytics-dashboard",
    stack: ["Python", "Pandas", "Streamlit"],
    link: "https://github.com/andrymldni/Dicoding-Bikes-Sharing",
    image: "/projects/bike-sharing.jpg",
    category: "Data Analytics",
    desc: "Interactive dashboard uncovering ridership trends and seasonality.",
    details:
      "End-to-end data wrangling, EDA, and visualization on a bike-share ridership dataset — cleaning raw ride logs, exploring usage patterns by weather, season, and time of day, then shipping the findings as an interactive Streamlit dashboard for quick exploration.",
    problem:
      "Bike-share operators collect hourly and daily ride logs but need to turn them into answers about when and why ridership changes. The project builds an analysis workflow and a dashboard so those patterns can be explored without reading the notebook.",
    role: "Individual Dicoding data-analysis submission covering data wrangling, EDA, visualization, and the Streamlit dashboard.",
    approach: [
      "Gather the day and hour ride datasets.",
      "Assess and clean the data in the analysis notebook.",
      "Explore usage patterns against the business questions.",
      "Build visualizations from the exploratory findings.",
      "Export cleaned day/hour CSVs and serve them through a Streamlit dashboard.",
    ],
    results:
      "The submission includes a Jupyter notebook with the full analysis, cleaned day/hour datasets, and a Streamlit dashboard deployed at bikes-sharing-andrymldni.streamlit.app. The deliverable is an interactive dashboard for descriptive analytics rather than a predictive model.",
    highlights: [],
  },
  {
    title: "Student Dropout Prediction",
    slug: "student-dropout-prediction",
    stack: ["Python", "Scikit-learn", "Classification"],
    link: "https://github.com/andrymldni/Dicoding-Student-Status-Predictions",
    image: "/projects/student-dropout.jpg",
    category: "AI/ML",
    desc: "Early-warning model flagging students at risk of dropping out.",
    details:
      "A classification model built for an education institute that flags students likely to drop out before it happens, using academic and demographic features. The goal: give the institution enough lead time to step in with guidance and support before a student disengages.",
    problem:
      "Jaya Jaya Institut had a high dropout rate that hurt both student outcomes and institutional reputation. The institution needed an early-warning view of which students were at risk so guidance could start before they disengaged.",
    role: "Individual Dicoding data-science submission covering analysis, modeling, and the Streamlit dashboard.",
    approach: [
      "Explore the 4,424-row, 36-column UCI student dataset and profile dropout patterns by gender, course, scholarship, and academic performance.",
      "Clean and prepare the features, then persist the fitted PCA and per-feature scalers with joblib.",
      "Train the classification model and save it as gboost_model.joblib.",
      "Build a Streamlit app that loads the model artifacts and scores student records.",
      "Publish a dashboard that summarizes dropout distribution and risk factors.",
    ],
    results:
      "The dashboard covers 4,424 students, including 1,421 dropouts, 2,209 graduates, and 794 enrolled students. The repository ships the Streamlit app, notebook, dashboard, and serialized model artifacts.",
    highlights: [
      { value: "4,424", label: "students in the dataset" },
      { value: "1,421", label: "dropouts" },
      { value: "2,209", label: "graduates" },
    ],
  },
  {
    title: "Campus Placement Prediction",
    slug: "campus-placement-prediction",
    stack: ["Python", "MLOps", "Classification"],
    link: "https://github.com/andrymldni/Dicoding-MLOps-Campus",
    image: "/projects/campus-placement.jpg",
    category: "MLOps",
    desc: "Binary classifier predicting campus placement outcomes for applicant screening.",
    details:
      "A binary classification pipeline predicting campus placement outcomes from applicant data, built as an MLOps submission with an emphasis on a reproducible flow — from data validation through to model packaging and evaluation.",
    problem:
      "Universities receive many applicants with similar grades and backgrounds, making manual screening of administrative criteria slow and error-prone. The project tests a binary classifier that can give an early signal on candidate selection.",
    role: "Individual Dicoding MLOps submission covering the TFX pipeline, model evaluation, deployment, and monitoring.",
    approach: [
      "Scale numeric features to 0-1, one-hot encode categorical features, and split the data 80:20.",
      "Concatenate the transformed features and pass them through a Dense(8, ReLU) layer and a sigmoid output.",
      "Train with Adam at a 0.001 learning rate, binary crossentropy, and binary accuracy.",
      "Run the workflow as a TFX pipeline with example validation, transform, trainer, evaluator, and pusher components.",
      "Serve the pushed model through a Railway endpoint and monitor incoming requests with Prometheus in Docker.",
    ],
    results:
      "Training accuracy reached 90.03% and validation accuracy 84.42%. Validation loss (0.3634) is higher than training loss (0.1766), indicating overfitting, and the model is deployed with Prometheus request monitoring.",
    highlights: [
      { value: "90.03%", label: "training accuracy" },
      { value: "84.42%", label: "validation accuracy" },
      { value: "0.3634", label: "validation loss" },
    ],
  },
  {
    title: "Gesture Volume Control",
    slug: "gesture-volume-control",
    stack: ["Python", "OpenCV", "MediaPipe"],
    link: "https://github.com/andrymldni/GestureVolumeControl",
    image: "/projects/gesture-volume.jpg",
    category: "Computer Vision",
    desc: "Control system volume in real time using hand-gesture recognition.",
    details:
      "A real-time computer-vision app that reads hand landmarks from a webcam feed and maps thumb-to-index finger distance to system volume — a hands-free interface built with OpenCV, MediaPipe hand tracking, and Pycaw for native audio control.",
    problem:
      "Volume controls normally require touching a keyboard or phone, which is awkward when hands are occupied or wet. The project builds a webcam interface that maps a simple thumb-to-index gesture to system volume.",
    role: "Individual computer-vision project: built the hand-tracking and audio-control loop.",
    approach: [
      "Open the webcam with OpenCV and mirror the frame for natural movement.",
      "Track 21 hand landmarks with MediaPipe Hands at 0.7 detection and tracking confidence.",
      "Measure the pixel distance between thumb tip (landmark 4) and index tip (landmark 8).",
      "Map a 50-300 px distance to the system volume range and mute below 30 px.",
      "Apply exponential smoothing to reduce jitter and draw a live volume bar and FPS counter.",
    ],
    results:
      "The app controls system volume in real time from a webcam feed, mutes when the fingers close below the threshold, and shows the current volume percentage on screen.",
    highlights: [
      { value: "21", label: "hand landmarks" },
      { value: "50-300 px", label: "volume mapping range" },
      { value: "30 px", label: "mute threshold" },
    ],
  },
  {
    title: "Cek Kata Baku",
    slug: "cek-kata-baku",
    stack: ["Python", "NLP"],
    link: "https://github.com/andrymldni/cek-kata-baku",
    image: "/projects/cek-kata-baku.jpg",
    category: "NLP",
    desc: "Checks Indonesian words against standard spelling with smart suggestions.",
    details:
      "A lightweight tool that checks whether an Indonesian word is 'baku' (standard) per KBBI, and suggests the closest valid alternative when it isn't — handy for quick writing cleanup and language-consistency checks.",
    problem:
      "Writers and editors often need a quick check of whether an Indonesian word is standard (baku), but opening KBBI for every word interrupts the work. The project packages a local standard-word list with a similarity-based suggestion tool.",
    role: "Individual desktop-app project: built the Tkinter interface, dictionary loader, and similarity check.",
    approach: [
      "Load the local kata_baku.csv word list into memory at startup.",
      "Normalize the input by trimming whitespace and lowercasing it.",
      "Check the word against the standard-word list and report a match immediately.",
      "If it is missing, compare it with every entry using normalized Levenshtein similarity and keep candidates above 0.6.",
      "Show a suggested correction when a candidate passes the cutoff, or link to KBBI when none does.",
    ],
    results:
      "The app provides a Tkinter desktop interface with Home and About tabs, a local dictionary check, similarity-based suggestions, and a KBBI lookup link for unknown words.",
    highlights: [],
  },
];

export type Certification = {
  name: string;
  /** Preserve the CV's compact labels and ordering from the same records. */
  resumeName?: string;
  resumeOrder: number;
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
    resumeOrder: 1,
    issuer: "Coursera",
    year: "2024",
    image: "/certificates/Sertifikat1.jpg",
    link: "https://coursera.org/share/67f261404346718b6bb8fc8c6e36afee",
  },
  {
    name: "Google IT Automation with Python",
    resumeName: "Google IT Automation with Python Professional Certificate",
    resumeOrder: 2,
    issuer: "Coursera",
    year: "2024",
    image: "/certificates/Sertifikat2.jpg",
    link: "https://coursera.org/share/f062c309d55993dbaf402aad0592dc49",
  },
  {
    name: "Machine Learning Operations (MLOps)",
    resumeOrder: 3,
    issuer: "Dicoding",
    year: "2024",
    image: "/certificates/Sertifikat3.jpg",
    link: "https://www.dicoding.com/certificates/KEXLYGRK4ZG2",
  },
  {
    name: "Alibaba Cloud - ACA Big Data Certification",
    resumeOrder: 4,
    issuer: "Alibaba Cloud",
    year: "2024",
    image: "/certificates/Sertifikat4.png",
    link: "https://drive.google.com/file/d/109xavq6iGXZvszXBPO7ePkXAKBR7kvml/view?usp=sharing",
  },
  {
    name: "Bangkit Academy 2024 - Machine Learning",
    resumeOrder: 5,
    issuer: "Kampus Merdeka",
    year: "2024",
    image: "/certificates/Sertifikat5.jpg",
    link: "https://drive.google.com/file/d/1ATPmjvkr9727_kuHebhhuUxi5k4n9MaW/view",
  },
  {
    name: "Junior Web Programmer",
    resumeName: "BNSP Junior Web Programmer",
    resumeOrder: 0,
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    year: "2023",
    image: "/certificates/Sertifikat6.jpg",
    link: "https://drive.google.com/file/d/1VuPYmJTi_DkxuNqX5ZKrWOvFoCL8OdeC/view?usp=sharing",
  },
];
