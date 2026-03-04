// Job data stored in browser
let jobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Innovations Ltd",
        category: "Technology",
        location: "Nairobi",
        salary: "150,000 - 200,000 KES",
        description: "We are looking for an experienced Senior Software Engineer to join our growing team. You will work on innovative solutions and lead a team of developers.",
        requirements: "5+ years of experience, proficiency in JavaScript/Python, experience with cloud platforms",
        datePosted: "2024-01-15"
    },
    {
        id: 2,
        title: "Financial Analyst",
        company: "Capital Markets Group",
        category: "Finance",
        location: "Nairobi",
        salary: "100,000 - 140,000 KES",
        description: "Join our Finance team as a Financial Analyst. Analyze market trends and provide insights for investment decisions.",
        requirements: "Bachelor's degree in Finance/Economics, proficiency in Excel, knowledge of financial modeling",
        datePosted: "2024-01-14"
    },
    {
        id: 3,
        title: "Mathematics Teacher",
        company: "Elite Secondary School",
        category: "Education",
        location: "Kisumu",
        salary: "60,000 - 80,000 KES",
        description: "Seeking a dedicated Mathematics teacher for our secondary school. You will teach classes 9-12 and mentor students.",
        requirements: "Bachelor's degree in Mathematics/Education, TSC registration, proven teaching experience",
        datePosted: "2024-01-13"
    },
    {
        id: 4,
        title: "Registered Nurse",
        company: "Nairobi General Hospital",
        category: "Healthcare",
        location: "Nairobi",
        salary: "80,000 - 110,000 KES",
        description: "Join our healthcare team as a Registered Nurse. Provide quality patient care in our modern facility.",
        requirements: "Nursing diploma/degree, valid nursing license, 2+ years of clinical experience",
        datePosted: "2024-01-12"
    },
    {
        id: 5,
        title: "Web Developer",
        company: "Digital Solutions Kenya",
        category: "Technology",
        location: "Nairobi",
        salary: "90,000 - 130,000 KES",
        description: "Develop modern web applications using latest technologies. Work with a talented team in an agile environment.",
        requirements: "3+ years of web development, React/Vue.js, Node.js, responsive design skills",
        datePosted: "2024-01-11"
    },
    {
        id: 6,
        title: "Hotel Manager",
        company: "Serena Hotels",
        category: "Hospitality",
        location: "Mombasa",
        salary: "110,000 - 160,000 KES",
        description: "Manage hotel operations at our prestigious 5-star hotel. Lead a team of 50+ staff members.",
        requirements: "Bachelor's degree in Hotel Management, 5+ years management experience, excellent customer service",
        datePosted: "2024-01-10"
    },
    {
        id: 7,
        title: "Data Scientist",
        company: "Analytics Pro Ltd",
        category: "Technology",
        location: "Nairobi",
        salary: "170,000 - 250,000 KES",
        description: "Join our data science team to build predictive models and drive business insights.",
        requirements: "M.Sc. in Data Science/Statistics, expertise in Python/R, machine learning knowledge",
        datePosted: "2024-01-09"
    },
    {
        id: 8,
        title: "Investment Manager",
        company: "Wealth Capital Group",
        category: "Finance",
        location: "Nairobi",
        salary: "140,000 - 200,000 KES",
        description: "Manage investment portfolios for high-net-worth clients. Provide strategic financial advice.",
        requirements: "CFA or similar qualification, 5+ years investment management, excellent communication skills",
        datePosted: "2024-01-08"
    }
];

// Load jobs from localStorage if available
function loadJobs() {
    const savedJobs = localStorage.getItem('linkedout_jobs');
    if (savedJobs) {
        jobs = JSON.parse(savedJobs);
    }
}

// Save jobs to localStorage
function saveJobs() {
    localStorage.setItem('linkedout_jobs', JSON.stringify(jobs));
}

// Initialize on page load
loadJobs();
