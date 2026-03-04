-- Create Database
CREATE DATABASE IF NOT EXISTS linkedout_db;
USE linkedout_db;

-- Create Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Data
INSERT INTO jobs (title, organization, category, description, email) VALUES
(
    'Senior Software Engineer',
    'Tech Innovations Ltd',
    'Technology',
    'We are looking for an experienced Senior Software Engineer to join our growing team. You will be responsible for designing and implementing high-quality software solutions. Requirements: 5+ years of experience in software development, proficiency in multiple programming languages, and strong problem-solving skills.',
    'careers@techinnovations.com'
),
(
    'Financial Analyst',
    'Kenya Finance Corp',
    'Finance',
    'Join our finance team as a Financial Analyst. You will analyze financial data, prepare reports, and provide insights to support business decisions. Requirements: Bachelor degree in Finance or Accounting, proficiency in Excel, and knowledge of financial modeling.',
    'hr@kenyafinance.com'
),
(
    'High School Mathematics Teacher',
    'Premier Academy Kenya',
    'Education',
    'Premier Academy is seeking a dedicated Mathematics Teacher for our high school. You will develop lesson plans, teach mathematics, and support student development. Requirements: Bachelor degree in Education or Mathematics, teaching certification, and passion for education.',
    'recruitment@premieracademy.ke'
),
(
    'Data Scientist',
    'Tech Innovations Ltd',
    'Technology',
    'We are seeking a Data Scientist to develop machine learning models and analyze large datasets. You will work with our data engineering team to create predictive models. Requirements: Master degree in Data Science or related field, experience with Python and R, and knowledge of machine learning algorithms.',
    'careers@techinnovations.com'
),
(
    'Investment Manager',
    'Capital Growth Advisors',
    'Finance',
    'Capital Growth Advisors is looking for an experienced Investment Manager to manage client portfolios and develop investment strategies. Requirements: CFA certification preferred, 7+ years of experience in investment management, and strong analytical skills.',
    'jobs@capitalgrowth.co.ke'
),
(
    'Primary School Teacher',
    'Sunshine Academy',
    'Education',
    'Sunshine Academy seeks passionate Primary School Teachers for grades 4-6. You will create engaging learning experiences and support student growth. Requirements: Bachelor degree in Education, teaching certification, and experience with young learners.',
    'admin@sunshineacademy.ke'
);
