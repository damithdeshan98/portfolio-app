


/**
 * Fallback / seed content — mirrors the original static portfolio.
 * Public pages render this when the matching Firestore collection is empty,
 * so the site looks complete before the admin has entered any data.
 * The admin "Seed database" action (Dashboard) can also push this to Firestore.
 */

export const seedProfile = {
  fullName: "H.K. Damith Deshan",
  title: "Associate Software Engineer",
  roles: [
    "Associate Software Engineer",
    "Java Full-Stack Developer",
    "Healthcare IT Specialist",
    "HL7 / FHIR Enthusiast",
    "Flutter Developer (Learning)",
  ],
  tagline: "Available for opportunities",
  heroDesc:
    "Motivated Associate Software Engineer with solid full-stack development expertise in Java, known for quickly adapting to new technologies and bringing a proactive approach to problem-solving.",
  about: [
    "I'm an Associate Software Engineer at CareCode (Pvt) Ltd., where I serve as the main developer of the laboratory module — a core component of a Hospital Management Information System currently deployed in 10+ hospitals across Sri Lanka.",
    "My expertise spans full-stack Java development, REST API design, and healthcare interoperability standards including HL7 & FHIR protocols. I'm passionate about building software that directly impacts patient care.",
    "Beyond work, I'm exploring mobile development with Flutter and deepening my knowledge of healthcare data standards. I believe in clean code, continuous learning, and the power of well-designed software to solve real problems.",
  ],
  email: "hkddrajapaksha@gmail.com",
  phone: "+94 76 301 0616",
  location: "Matara, Sri Lanka",
  languages: "English · Sinhala",
  socialLinks: {
    github: "https://github.com/damithdeshan98",
    linkedin: "https://www.linkedin.com/in/h-k-damith-deshan-b8550628a/",
    twitter: "",
  },
  profileImageUrl: "",
  cvUrl: "H.K.-Damith-Deshan_Resume.pdf",
};

export const seedProjects = [
  {
    title: "Hospital Management Information System",
    period: "Nov 2023 — Present",
    icon: "fas fa-hospital-alt",
    featured: true,
    description:
      "Enterprise-grade healthcare software deployed in 10+ hospitals across Sri Lanka. Manages administrative, financial, and clinical operations with modules covering Cashier, Ward, Laboratory, Pharmacy, Store, HR, Theatre (OT), EMR, and Channeling workflows.",
    techStack: ["J2EE", "JSF", "Java", "Primefaces", "REST API", "MySQL", "CI/CD", "Bootstrap"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/hmislk/hmis",
    order: 1,
  },
  {
    title: "HumaCount5D Middleware",
    period: "Jan 2025 — Feb 2025",
    icon: "fas fa-flask",
    description:
      "Middleware solution facilitating seamless laboratory data exchange between the HumaCount5D Analyzer and HIMS using standardized healthcare protocols.",
    techStack: ["Java", "HL7", "FHIR", "Custom APIs"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/hmislk/HumaCount5D",
    order: 2,
  },
  {
    title: "SwelabLumi Middleware",
    period: "Oct 2024 — Nov 2024",
    icon: "fas fa-vials",
    description:
      "Integration middleware enabling seamless data exchange between Swelab Lumi Analyzer and HIMS with support for standardized healthcare data transfer protocols.",
    techStack: ["Java", "HL7", "FHIR", "Custom APIs"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/hmislk/SwelabLumi",
    order: 3,
  },
  {
    title: "Dup Image Finder",
    period: "Mar 2025 — Apr 2025",
    icon: "fab fa-python",
    description:
      "Python desktop application to detect duplicate or modified images by identifying size changes or alterations using perceptual hashing techniques.",
    techStack: ["Python", "Tkinter", "Pillow", "ImageHash"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/damithdeshan98/dup_Image_finder",
    order: 4,
  },
  {
    title: "V-Pack POS System",
    period: "Jan 2023 — Mar 2023",
    icon: "fas fa-cash-register",
    description:
      "Point-of-sale system with core business logic and automated PDF invoice generation. Built as an HNDIT group project.",
    techStack: ["Java", "MySQL", "PDF Generation"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/damithdeshan98/V-Pack_POS",
    order: 5,
  },
  {
    title: "Calculator Master",
    period: "Academic Project",
    icon: "fas fa-calculator",
    description:
      "Fast-paced competitive math game for 2 players. Solve random arithmetic calculations (+, −, ×, ÷) in 20 seconds to sharpen mental math skills.",
    techStack: ["C++", "Game Logic", "Competitive"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/damithdeshan98/CalculatorMaster",
    order: 6,
  },
];

export const seedExperience = [
  {
    role: "Associate Software Engineer",
    company: "CareCode (Pvt) Ltd.",
    location: "Galle, Sri Lanka",
    startDate: "2024-05",
    endDate: "Present",
    period: "May 2024 — Present",
    bullets: [
      "Main developer of the Laboratory Module within the Hospital Management Information System",
      "Contributed to Laboratory Analyzer automation, improving data processing workflows",
      "Led requirement gathering, design, and development of new Lab Module features",
      "Conducted code reviews, identified and fixed bugs, maintained project documentation",
    ],
    order: 1,
  },
  {
    role: "Intern Software Engineer",
    company: "CareCode (Pvt) Ltd.",
    location: "Galle, Sri Lanka",
    startDate: "2023-11",
    endDate: "2024-05",
    period: "Nov 2023 — May 2024",
    bullets: [
      "Developed web application interfaces using JSP and Bootstrap",
      "Contributed to backend development with J2EE and designed REST APIs",
      "Designed and managed MySQL relational databases",
      "Used Git for version control across collaborative development workflows",
    ],
    order: 2,
  },
];

export const seedSkills = [
  { name: "Java / J2EE", category: "Core", level: 90, order: 1 },
  { name: "JavaScript", category: "Core", level: 75, order: 2 },
  { name: "Python", category: "Core", level: 70, order: 3 },
  { name: "MySQL", category: "Core", level: 80, order: 4 },
  { name: "REST APIs", category: "Core", level: 78, order: 5 },
  { name: "HL7 / FHIR", category: "Core", level: 78, order: 6 },
  { name: "SpringBoot", category: "Core", level: 65, order: 7 },
  { name: "ReactJS", category: "Core", level: 65, order: 8 },
  { name: "HTML & CSS", category: "Core", level: 85, order: 9 },
  { name: "C++", category: "Core", level: 56, order: 10 },
  { name: "Java", category: "Tools", level: 0, icon: "fab fa-java", order: 11 },
  { name: "JavaScript", category: "Tools", level: 0, icon: "fab fa-js-square", order: 12 },
  { name: "Python", category: "Tools", level: 0, icon: "fab fa-python", order: 13 },
  { name: "MySQL", category: "Tools", level: 0, icon: "fas fa-database", order: 14 },
  { name: "MongoDB", category: "Tools", level: 0, icon: "fas fa-leaf", order: 15 },
  { name: "PostgreSQL", category: "Tools", level: 0, icon: "fas fa-database", order: 16 },
  { name: "Git", category: "Tools", level: 0, icon: "fab fa-git-alt", order: 17 },
  { name: "ReactJS", category: "Tools", level: 0, icon: "fab fa-react", order: 18 },
  { name: "Spring", category: "Tools", level: 0, icon: "fas fa-seedling", order: 19 },
  { name: "Linux", category: "Tools", level: 0, icon: "fab fa-linux", order: 20 },
  { name: "VS Code", category: "Tools", level: 0, icon: "fas fa-code", order: 21 },
  { name: "CI/CD", category: "Tools", level: 0, icon: "fas fa-infinity", order: 22 },
  { name: "Postman", category: "Tools", level: 0, icon: "fas fa-paper-plane", order: 23 },
  { name: "Figma", category: "Tools", level: 0, icon: "fab fa-figma", order: 24 },
  { name: "Bootstrap", category: "Tools", level: 0, icon: "fab fa-bootstrap", order: 25 },
  { name: "Tailwind CSS", category: "Tools", level: 0, icon: "fas fa-wind", order: 26 },
];

export const seedQualifications = [
  {
    degree: "Higher National Diploma in Information Technology (HNDIT)",
    institution: "Sri Lanka Institute of Advanced Technological Education (SLIATE)",
    location: "Galle, Sri Lanka",
    year: "Jul 2021 – Aug 2023",
    yearTag: "2021–2023",
    icon: "fas fa-graduation-cap",
    primary: true,
    order: 1,
  },
  {
    degree: "G.C.E. Advanced Level",
    institution: "Matara Central College",
    location: "Matara, Sri Lanka",
    year: "Aug 2019",
    yearTag: "2019",
    icon: "fas fa-school",
    order: 2,
  },
  {
    degree: "G.C.E. Ordinary Level",
    institution: "MR/Ovitigamuwa Maha Vidyalaya",
    location: "Kamburupitiya",
    year: "Dec 2014",
    yearTag: "2014",
    icon: "fas fa-book",
    order: 3,
  },
];

export const seedCertificates = [
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    icon: "fas fa-shield-alt",
    credentialUrl:
      "https://www.credly.com/badges/2ec64647-bd41-4c45-8a64-00c5999f8982/public_url",
    imageUrl: "",
    order: 1,
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    icon: "fas fa-lock",
    credentialUrl:
      "https://www.credly.com/badges/1336ae52-3e22-4155-9f7f-25466d9b88df/public_url",
    imageUrl: "",
    order: 2,
  },
  {
    title: "SQL",
    issuer: "Sololearn",
    icon: "fas fa-database",
    credentialUrl: "https://www.sololearn.com/certificates/CT-O6YNPJWY",
    imageUrl: "",
    order: 3,
  },
  {
    title: "Introduction to JavaScript",
    issuer: "Sololearn",
    icon: "fab fa-js",
    credentialUrl: "https://www.sololearn.com/certificates/CC-RHKBPOEP",
    imageUrl: "",
    order: 4,
  },
  {
    title: "Python for Beginners",
    issuer: "Sololearn",
    icon: "fab fa-python",
    credentialUrl: "https://www.sololearn.com/certificates/CT-MVSID3MG",
    imageUrl: "",
    order: 5,
  },
  {
    title: "PHP",
    issuer: "Sololearn",
    icon: "fab fa-php",
    credentialUrl: "https://www.sololearn.com/certificates/CT-DE4L3P4U",
    imageUrl: "",
    order: 6,
  },
  {
    title: "HTML",
    issuer: "Sololearn",
    icon: "fab fa-html5",
    credentialUrl: "https://www.sololearn.com/certificates/CT-HNYWUXHN",
    imageUrl: "",
    order: 7,
  },
];

export const seedStats = [
  { num: 2, suffix: "+", label: "Years Experience" },
  { num: 8, suffix: "", label: "GitHub Rank LK" },
];
