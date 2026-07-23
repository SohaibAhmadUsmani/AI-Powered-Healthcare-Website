const mongoose = require("mongoose");
require("dotenv").config();
const LabTest = require("./models/LabTest");
const EmergencyContact = require("./models/EmergencyContact");
const Doctor = require("./models/Doctor");
const BlogPost = require("./models/BlogPost");
const Medicine = require("./models/Medicine");

const testsData = [
  { name: "Complete Blood Count (CBC)", price: 800, category: "Blood Test" },
  { name: "Blood Sugar (Fasting)", price: 400, category: "Blood Test" },
  { name: "Liver Function Test (LFT)", price: 1500, category: "Organ Function" },
  { name: "Kidney Function Test (KFT)", price: 1400, category: "Organ Function" },
  { name: "Lipid Profile", price: 1200, category: "Blood Test" },
  { name: "Thyroid Profile (T3, T4, TSH)", price: 1800, category: "Hormone Test" },
];

const contactsData = [
  { title: "Ambulance", number: "1122", category: "Ambulance" },
  { title: "Blood Bank", number: "051-1234567", category: "Blood Bank" },
  { title: "Nearby Hospitals", number: "051-9876543", category: "Hospital" },
  { title: "Police", number: "15", category: "Police" },
];

const doctorData =[
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
    specialization: "Cardiologist",
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
    specialization: "Neurologist",
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

const medicineData = [
  {
    name: "Aspirin Plus",
    category: "Pain Relief",
    price: 12.99,
    dosage: "500mg • 20 tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Fast-acting pain relief for headaches, muscle aches, and minor discomfort.",
    reviews: [
      { author: "Maria K.", comment: "Works quickly and doesn't upset my stomach.", rating: 5 },
      { author: "Noah S.", comment: "Perfect for daily use after workouts.", rating: 4 },
    ],
  },
  {
    name: "Daily Vitamin D",
    category: "Vitamins",
    price: 18.99,
    dosage: "1000 IU • 30 softgels",
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80",
    description: "Support bone strength, immune health, and energy levels with a daily dose of Vitamin D.",
    reviews: [
      { author: "Lena P.", comment: "My energy feels more stable throughout the day.", rating: 5 },
      { author: "Omar N.", comment: "Great vitamin and easy to swallow.", rating: 4 },
    ],
  },
  {
    name: "ColdCare Syrup",
    category: "Cold & Flu",
    price: 14.5,
    dosage: "10ml • 100ml bottle",
    image: "coldCareSyrup.png",
    description: "Soothing syrup for coughs, congestion, and sore throat.",
    reviews: [
      { author: "Priya R.", comment: "Stopped my cough by morning.", rating: 5 },
      { author: "Elias M.", comment: "Nice mint flavor and easy on the throat.", rating: 5 },
    ],
  },
  {
    name: "CalmZz Relief",
    category: "Supplements",
    price: 21.75,
    dosage: "30 capsules • 1 month",
    image: "calmzz.png",
    description: "Gentle daily support for stress balance and better relaxation.",
    reviews: [
      { author: "Sara H.", comment: "Very calming and easy to take every morning.", rating: 5 },
      { author: "Adeel T.", comment: "Great addition to my evening routine.", rating: 4 },
    ],
  },
  {
    name: "OralGuard Care",
    category: "Dental",
    price: 16.25,
    dosage: "30 tablets • daily use",
    image: "oralGuard.png",
    description: "Helps support gum comfort, fresh breath, and everyday oral care.",
    reviews: [
      { author: "Nadia B.", comment: "My mouth feels fresher and healthier.", rating: 5 },
      { author: "Rizwan K.", comment: "Simple routine and noticeable comfort.", rating: 4 },
    ],
  },
  {
    name: "Syringe Care Kit",
    category: "Pain Relief",
    price: 19.99,
    dosage: "1 travel pack • 12 units",
    image: "Syringe.png",
    description: "Convenient care kit for everyday recovery and home wellness support.",
    reviews: [
      { author: "Hina F.", comment: "Perfect for keeping essential care items organized.", rating: 5 },
      { author: "Hamza Y.", comment: "Very practical and easy to carry.", rating: 4 },
    ],
  },
];

const blogData = [
  {
    title: "5 Tips for a Healthy Heart",
    category: "Health Tips",
    summary: "Simple daily habits that support long-term heart health.",
    content: "Maintaining a healthy heart starts with small, consistent habits. First, aim for at least 30 minutes of moderate exercise most days of the week, such as brisk walking or cycling. Second, reduce your intake of processed foods high in sodium and trans fats, and instead focus on fruits, vegetables, whole grains, and lean proteins. Third, manage stress through relaxation techniques like deep breathing or meditation, as chronic stress can raise blood pressure. Fourth, avoid smoking and limit alcohol consumption. Finally, get regular checkups to monitor your blood pressure, cholesterol, and blood sugar levels, since early detection of risk factors makes a significant difference in long-term heart health."
  },
  {
    title: "Understanding Diabetes",
    category: "Disease Information",
    summary: "What causes diabetes, its symptoms, and how it is managed.",
    content: "Diabetes is a chronic condition that affects how your body turns food into energy. There are two main types: Type 1, where the body does not produce insulin, and Type 2, where the body does not use insulin properly. Common symptoms include increased thirst, frequent urination, fatigue, and blurred vision. Risk factors for Type 2 diabetes include being overweight, physical inactivity, and family history. Management typically involves monitoring blood sugar levels, maintaining a balanced diet, regular physical activity, and in some cases, medication or insulin therapy. Working closely with a healthcare provider helps in creating a personalized management plan that reduces the risk of complications."
  },
  {
    title: "Staying Hydrated in Summer",
    category: "Health Tips",
    summary: "Why water intake matters more during hot weather.",
    content: "During hot weather, your body loses water more quickly through sweat, which increases the risk of dehydration. Symptoms of dehydration include dizziness, dry mouth, dark-colored urine, and fatigue. To stay properly hydrated, aim to drink water consistently throughout the day rather than waiting until you feel thirsty. Foods with high water content, such as watermelon, cucumbers, and oranges, can also contribute to your daily fluid intake. It's especially important to increase water intake before, during, and after physical activity or time spent outdoors in the heat. Children and elderly individuals should be monitored closely, as they are more vulnerable to the effects of dehydration."
  },
  {
    title: "Common Cold vs Flu",
    category: "Disease Information",
    summary: "Key differences to help you recognize what you have.",
    content: "The common cold and the flu (influenza) are both respiratory illnesses but are caused by different viruses. Cold symptoms tend to develop gradually and are usually milder, including a runny nose, sneezing, and a mild cough. The flu, on the other hand, often comes on suddenly and includes more severe symptoms such as high fever, body aches, chills, and extreme fatigue. While a cold rarely leads to serious health problems, the flu can lead to complications like pneumonia, especially in young children, older adults, or those with weakened immune systems. If you experience flu-like symptoms, it's a good idea to rest, stay hydrated, and consult a doctor if symptoms worsen or persist."
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    await LabTest.deleteMany();
    await LabTest.insertMany(testsData);
    console.log("Lab tests seeded successfully");

    await EmergencyContact.deleteMany();
    await EmergencyContact.insertMany(contactsData);
    console.log("Emergency contacts seeded successfully");

    await Doctor.deleteMany();
    await Doctor.insertMany(doctorData);
    console.log("Doctors data seeded successfully");

    await BlogPost.deleteMany();
    await BlogPost.insertMany(blogData);
    console.log("Blog posts seeded successfully");

    await Medicine.deleteMany();
    await Medicine.insertMany(medicineData);
    console.log("Medicines seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();