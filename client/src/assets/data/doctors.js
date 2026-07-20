const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialization: "Cardiologist",
    qualification: "MBBS, FCPS",
    experience: 10,
    rating: 4.8,
    reviews: 186,
    hospital: "City Hospital",
    institute: "King Edward Medical University",
    research: "Conducted research on early detection of cardiovascular diseases using AI-assisted ECG analysis.",
    availability: "9:00 AM - 5:00 PM",
    image:
      "https://images.unsplash.com/photo-1688588162416-f7a7e726e0bf?q=80&w=687&auto=format&fit=crop",
    description:
      "Experienced cardiologist with 10 years of practice specializing in preventive cardiology and heart failure management.",
  },

  {
    id: 2,
    name: "Dr. Abdullah Asim",
    specialization: "Dentist",
    qualification: "BDS",
    experience: 8,
    rating: 4.7,
    reviews: 142,
    hospital: "Smile Care Clinic",
    institute: "University of Health Sciences",
    research: "Research focused on cosmetic dentistry techniques and minimally invasive dental procedures.",
    availability: "10:00 AM - 6:00 PM",
    image:
      "https://plus.unsplash.com/premium_photo-1681996359725-06262b082c27?q=80&w=687&auto=format&fit=crop",
    description:
      "Specialist in cosmetic dentistry with extensive experience in smile makeovers and restorative procedures.",
  },

  {
    id: 3,
    name: "Dr. Khadija Ayub",
    specialization: "Dentist",
    qualification: "BDS",
    experience: 8,
    rating: 4.7,
    reviews: 158,
    hospital: "Smile Care Clinic",
    institute: "Dow University of Health Sciences",
    research: "Worked on preventive oral healthcare and digital dental imaging techniques.",
    availability: "11:00 AM - 7:00 PM",
    image:
      "https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?q=80&w=686&auto=format&fit=crop",
    description:
      "Experienced cosmetic dentist dedicated to providing personalized treatment plans and modern dental care.",
  },

  {
    id: 4,
    name: "Dr. Sarah Jenkins",
    specialization: "Chief Cardiologist & Bio-researcher",
    qualification: "MBBS, FCPS",
    experience: 15,
    rating: 4.9,
    reviews: 324,
    hospital: "Mayo Clinic, Rochester",
    institute: "Harvard Medical School",
    research: "Leading AI-powered biometric monitoring research for cardiovascular disease prediction.",
    availability: "8:30 AM - 4:30 PM",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
    description:
      "Chief of Cardiology at Mayo Clinic with expertise in heart failure, AI-assisted diagnostics, and biometric monitoring.",
  },

  {
    id: 5,
    name: "Dr. Marcus Chen",
    specialization: "Clinical Geneticist & AI Architect",
    qualification: "MBBS, FCPS",
    experience: 10,
    rating: 4.8,
    reviews: 278,
    hospital: "Stanford Hospital, Palo Alto",
    institute: "Stanford University School of Medicine",
    research: "Researches machine learning models for hereditary disease prediction using genomic data.",
    availability: "9:00 AM - 5:30 PM",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
    description:
      "Leads Stanford's AI Genetics Research Initiative, integrating genomic analysis with artificial intelligence.",
  },

  {
    id: 6,
    name: "Dr. Elena Rostova",
    specialization: "Lead Neurologist & Robotic Surgeon",
    qualification: "MBBS, FCPS",
    experience: 12,
    rating: 5.0,
    reviews: 401,
    hospital: "Johns Hopkins Hospital, Baltimore",
    institute: "Johns Hopkins University",
    research: "Developing robotic-assisted neurosurgery systems and bio-electronic neural implants.",
    availability: "8:00 AM - 3:00 PM",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
    description:
      "Pioneer in robotic neurosurgery with expertise in minimally invasive brain surgery and neurotechnology.",
  },
  {
    id: 7,
    name: "Dr. Zahoor Iqbal Mirza",
    specialization: "Urologist",
    qualification: "MBBS, FCPS (Urology)",
    experience: 30,
    rating: 4.9,
    reviews: 40,
    hospital: "Bahria International Hospital",
    institute: "Rawalpindi Medical College",
    research: "Advancing urological care through research in minimally invasive surgery, urinary tract disorders, kidney health, and prostate disease management.",
    availability: "10:00 AM - 2:00 PM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0sFHE8ZaHydHtcqohNPhO1TbFOcCTuzc3hpN9OvBQK2b_SL64KiV0Vw&s=10",
    description:
      "Prof. Dr. Zahoor Iqbal Mirza is a qualified Urologist in Rawalpindi with over 30 years in the field of urology. With specialized qualifications and a broad range of experience, this doctor provides the best treatment for all diseases related to the urinary tract or reproductive organs.",
  },
  {
    id: 8,
    name: "Dr. Syeda Afshan Batool",
    specialization: "Gynecologist",
    qualification: "MBBS, FCPS",
    experience: 15,
    rating: 5.0,
    reviews: 401,
    hospital: "Bilal Hospial",
    institute: "Rawalpindi Medical College",
    research: "Developing advanced women's healthcare solutions, focusing on reproductive medicine, maternal health, and minimally invasive gynecological procedures.",
    availability: "8:00 AM - 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1628258473666-9d3149c1da55?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Dr. Syeda Afshan Batool is a highly qualified and experienced gynecologist based in Islamabad. As an expert in women's reproductive health, Dr. Syeda Afshan Batool provides comprehensive care ranging from menstruation to post-menopause. The doctor is skilled in diagnosing and treating conditions that affect the cervix, uterus, ovaries, fallopian tubes.",
  },
  {
    id: 9,
    name: "Dr. Nazir Ahmed Malik",
    specialization: "Pediatrician ",
    qualification: "MBBS, FCPS(Paediatrics)",
    experience: 36,
    rating: 5.0,
    reviews: 401,
    hospital: "Nusrat Hospital, Rawalpindi",
    institute: "Johns Hopkins University",
    research: "Advancing pediatric healthcare through child development research, preventive medicine, and innovative treatments for childhood diseases.",
    availability: "8:00 AM - 6:00 PM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAf6q-bl4pFFAsB1TkIgrEhaKNWNh_nqmuuqugAvylGA&s",
    description:
      "Brigadier (Retd.) Professor Dr. Nazir Ahmed Malik is a distinguished Child Specialist with 36 years of clinical and academic experience. Currently serving as Professor & Head of Department of Paediatrics and Associate Dean at HITEC Medical College & HIT Hospital, Taxila Cantt. He is also working as Consultant Child Specialist at Nusrat Hospital and Al-Ihsan Hospital in Rawalpindi. Having served with distinction in the Pakistan Army Medical Corps, he brings unmatched expertise and compassion to every consultation.",
  },
];

export default doctors;