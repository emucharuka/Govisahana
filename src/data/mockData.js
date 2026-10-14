// GoviSahana Mock Data & Models (Matching PostgreSQL Schema)

export const SRI_LANKAN_DISTRICTS = [
  "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
  "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi",
  "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu",
  "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee",
  "Vavuniya", "Ampara"
];

export const CROP_TYPES = [
  { id: "paddy", name: "Paddy / Rice (වී)", icon: "🌾", category: "Grains" },
  { id: "tea", name: "Ceylon Tea (තේ)", icon: "🍃", category: "Cash Crops" },
  { id: "coconut", name: "Coconut (පොල්)", icon: "🥥", category: "Plantation" },
  { id: "rubber", name: "Rubber (රබර්)", icon: "🌳", category: "Plantation" },
  { id: "cinnamon", name: "Cinnamon & Spices (කුරුඳු / කුළුබඩු)", icon: "🌱", category: "Spices" },
  { id: "vegetables", name: "Low-Country Vegetables (එළවළු)", icon: "🥬", category: "Vegetables" },
  { id: "upcountry_veg", name: "Up-Country Vegetables (කඳුකර එළවළු)", icon: "🥕", category: "Vegetables" },
  { id: "fruits", name: "Fruits (පළතුරු)", icon: "🍌", category: "Fruits" }
];

export const EXPERT_PROFILES = [
  {
    id: "exp_1",
    name: "Dr. Nimal Jayasinghe",
    title: "Senior Agronomist & Plant Pathologist",
    department: "Department of Agriculture - Peradeniya",
    specialization: "Crop Pest & Disease Control",
    verified: true,
    rating: 4.9,
    totalConsultations: 342,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    phone: "+94 77 123 4567",
    district: "Kandy",
    online: true,
    bio: "Over 18 years of experience in paddy disease diagnosis and eco-friendly IPM solutions across Sri Lanka."
  },
  {
    id: "exp_2",
    name: "Mrs. Priyanthi Bandara",
    title: "Soil Fertility & Nutrient Specialist",
    department: "Rice Research & Development Institute (RRDI) - Batalagoda",
    specialization: "Soil Health & Fertilizer Management",
    verified: true,
    rating: 4.8,
    totalConsultations: 219,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    phone: "+94 71 987 6543",
    district: "Kurunegala",
    online: true,
    bio: "Helping Sri Lankan farmers optimize organic and inorganic soil amendments for maximum yield."
  },
  {
    id: "exp_3",
    name: "Mr. K. Shanmugam",
    title: "Up-Country Vegetable Specialist",
    department: "Agricultural Extension Office - Nuwara Eliya",
    specialization: "Horticulture & Greenhouse Tech",
    verified: true,
    rating: 4.95,
    totalConsultations: 185,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    phone: "+94 75 444 3322",
    district: "Nuwara Eliya",
    online: false,
    bio: "Specialist in potato blight, cabbage caterpillar, and precision drip irrigation."
  }
];

export const INITIAL_CONSULTATIONS = [
  {
    id: "con_101",
    ticketId: "GS-2026-089",
    farmerId: "usr_farmer_1",
    farmerName: "Sunil Rathnayake",
    farmerDistrict: "Anuradhapura",
    farmerPhone: "+94 77 555 1212",
    title: "Yellowing leaves & brown spots in Maha season paddy crop",
    cropType: "paddy",
    cropLabel: "Paddy / Rice",
    description: "Leaves on my 3-acre paddy field near Kekirawa are turning yellowish brown with elongated dark spots. Appeared 4 days ago after heavy evening rain.",
    channel: "Chat", // Chat, Voice, Video
    status: "In Progress", // Requested, Accepted, In Progress, Completed
    urgency: "High",
    assignedExpert: EXPERT_PROFILES[0],
    createdAt: "Today at 07:45 AM",
    lastActivity: "10 mins ago",
    sampleImage: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "con_102",
    ticketId: "GS-2026-074",
    farmerId: "usr_farmer_1",
    farmerName: "Sunil Rathnayake",
    farmerDistrict: "Anuradhapura",
    farmerPhone: "+94 77 555 1212",
    title: "Whitefly infestation on Green Chili plants",
    cropType: "vegetables",
    cropLabel: "Low-Country Vegetables",
    description: "Tiny white flies underneath the chili leaves causing leaf curl and stunted growth.",
    channel: "Voice",
    status: "Accepted",
    urgency: "Normal",
    assignedExpert: EXPERT_PROFILES[1],
    createdAt: "Yesterday at 03:20 PM",
    lastActivity: "2 hours ago",
    sampleImage: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "con_103",
    ticketId: "GS-2026-052",
    farmerId: "usr_farmer_1",
    farmerName: "Sunil Rathnayake",
    farmerDistrict: "Anuradhapura",
    farmerPhone: "+94 77 555 1212",
    title: "Soil pH testing guidance for new Cinnamon nursery",
    cropType: "cinnamon",
    cropLabel: "Cinnamon & Spices",
    description: "Need advice on recommended organic fertilizer blend prior to planting.",
    channel: "Chat",
    status: "Completed",
    urgency: "Normal",
    assignedExpert: EXPERT_PROFILES[1],
    createdAt: "14 Sep 2026",
    lastActivity: "14 Sep 2026",
    sampleImage: null
  }
];

export const INITIAL_MESSAGES = {
  "con_101": [
    {
      id: "msg_1",
      senderId: "usr_farmer_1",
      senderRole: "farmer",
      senderName: "Sunil Rathnayake",
      text: "Ayubowan Doctor! Please help me inspect these paddy leaves. The leaf tips are drying and turned dark brown after rain.",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
      timestamp: "08:00 AM",
      type: "user"
    },
    {
      id: "msg_2",
      senderId: "exp_1",
      senderRole: "expert",
      senderName: "Dr. Nimal Jayasinghe",
      text: "Ayubowan Mr. Sunil! I have reviewed your image closely. This symptom pattern strongly indicates early-stage Paddy Blast (Magnaporthe oryzae), common during high humidity.",
      timestamp: "08:05 AM",
      type: "expert"
    },
    {
      id: "msg_3",
      senderId: "exp_1",
      senderRole: "expert",
      senderName: "Dr. Nimal Jayasinghe",
      prescription: {
        title: "Recommended Remedial Action Plan",
        treatment: "Spray Tricyclazole 75% WP or Edifenphos 50% EC",
        dosage: "0.6 grams per 1 Liter of clean water",
        timing: "Apply early morning before 9:00 AM. Ensure underside of foliage is sprayed.",
        precaution: "Avoid excess Nitrogen fertilizer until symptoms subside. Maintain proper water depth of 2-3cm."
      },
      text: "Please follow the prescription protocol below. Do you have access to a knapsack sprayer?",
      timestamp: "08:06 AM",
      type: "prescription"
    },
    {
      id: "msg_4",
      senderId: "usr_farmer_1",
      senderRole: "farmer",
      senderName: "Sunil Rathnayake",
      text: "Thank you Doctor! Yes, I have a 16-Liter knapsack sprayer. I will buy Tricyclazole from the Kekirawa Agrarian Services center today.",
      timestamp: "08:12 AM",
      type: "user"
    }
  ]
};
