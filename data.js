// Sample job data
let jobs = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc",
        location: "San Francisco, CA",
        salary: "$120,000 - $150,000",
        category: "Technology",
        description: "We're looking for an experienced Frontend Developer to join our team. You'll work with React, Vue, and modern JavaScript frameworks to build amazing user interfaces. Requirements: 5+ years of experience, proficiency in HTML/CSS/JS, experience with responsive design."
    },
    {
        id: 2,
        title: "Financial Analyst",
        company: "Global Finance Corp",
        location: "New York, NY",
        salary: "$90,000 - $120,000",
        category: "Finance",
        description: "Join our finance team to analyze market trends and provide investment insights. You'll work with Excel, Python, and financial modeling tools. Requirements: Bachelor's in Finance/Economics, strong analytical skills, experience with financial software."
    },
    {
        id: 3,
        title: "Registered Nurse",
        company: "City Hospital",
        location: "Boston, MA",
        salary: "$70,000 - $90,000",
        category: "Healthcare",
        description: "We need compassionate nurses to provide excellent patient care. You'll work in various hospital departments with a team of dedicated professionals. Requirements: Current RN license, CPR certification, 2+ years of experience preferred."
    },
    {
        id: 4,
        title: "Elementary School Teacher",
        company: "Oak Ridge School District",
        location: "Portland, OR",
        salary: "$50,000 - $70,000",
        category: "Education",
        description: "Help shape young minds as an elementary school teacher. You'll teach core subjects to grades 3-5 and create engaging lesson plans. Requirements: Bachelor's degree, teaching certification, passion for education."
    },
    {
        id: 5,
        title: "Retail Store Manager",
        company: "Fashion Plus Stores",
        location: "Chicago, IL",
        salary: "$45,000 - $65,000",
        category: "Retail",
        description: "Lead a dynamic retail team and drive store success. You'll manage inventory, staff, and customer service operations. Requirements: 3+ years retail experience, leadership skills, excellent communication."
    },
    {
        id: 6,
        title: "Full Stack Developer",
        company: "StartUp Ventures",
        location: "Austin, TX",
        salary: "$100,000 - $130,000",
        category: "Technology",
        description: "Build full-stack web applications from conception to deployment. You'll work with Node.js, React, and MongoDB in an agile environment. Requirements: Strong problem-solving skills, experience with MERN stack, Git proficiency."
    },
    {
        id: 7,
        title: "Business Analyst",
        company: "Enterprise Solutions",
        location: "Atlanta, GA",
        salary: "$75,000 - $100,000",
        category: "Finance",
        description: "Analyze business requirements and design solutions for client needs. You'll work with stakeholders to gather requirements and create technical specifications. Requirements: Bachelor's degree, 2+ years BA experience, knowledge of data analysis tools."
    },
    {
        id: 8,
        title: "Physical Therapist",
        company: "Wellness Center",
        location: "Denver, CO",
        salary: "$65,000 - $85,000",
        category: "Healthcare",
        description: "Help patients recover through physical therapy programs. You'll develop treatment plans and monitor patient progress. Requirements: PT license, DPT degree, state certification required."
    }
];

// Save jobs to localStorage
function saveJobs() {
    localStorage.setItem('linkedout-jobs', JSON.stringify(jobs));
}

// Load jobs from localStorage
function loadJobs() {
    const savedJobs = localStorage.getItem('linkedout-jobs');
    if (savedJobs) {
        jobs = JSON.parse(savedJobs);
    } else {
        saveJobs(); // Save initial data
    }
}

// Initialize jobs on page load
loadJobs();
