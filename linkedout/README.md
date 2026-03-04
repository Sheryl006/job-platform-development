# LINKED OUT - Job Advertisement Platform

A simple, student-friendly job advertisement and search platform built with pure HTML5, CSS3, JavaScript, and PHP.

## Project Overview

LINKED OUT is a Kenyan-based online job advertisement platform where job seekers can browse job listings and admins can manage job postings. The platform is designed to look like it was written by university students, with simple but clean code and styling.

## Features

### For Job Seekers
- View all available job listings
- Filter jobs by category (Technology, Finance, Education, Healthcare, Sales, Marketing, HR)
- Click on jobs to view full details
- See organization contact email
- Responsive design for all devices

### For Admins
- Secure login (username: admin, password: admin123)
- Add new job listings
- Edit existing job listings
- Delete job listings
- Manage all jobs from a dashboard

## Project Structure

```
linkedout/
├── config.php              # Database configuration
├── style.css               # CSS styling
├── script.js               # JavaScript validation
├── index.php               # Home page
├── jobs.php                # Job listings page
├── job_details.php         # Individual job details
├── admin_login.php         # Admin login page
├── admin_dashboard.php     # Admin dashboard
├── add_job.php             # Add new job form
├── edit_job.php            # Edit job form
├── delete_job.php          # Delete job handler
├── admin_logout.php        # Logout handler
├── database.sql            # Database setup script
└── README.md               # This file
```

## Installation & Setup

### 1. Database Setup

1. Open phpMyAdmin or MySQL command line
2. Run the SQL commands from `database.sql` to create the database and table
3. The database will be populated with sample job data

### 2. Configuration

Edit `config.php` if needed to match your database credentials:
```php
$host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'linkedout_db';
```

### 3. Running the Application

1. Place the `linkedout` folder in your web server's root directory (htdocs for XAMPP/WAMP)
2. Open `http://localhost/linkedout/` in your browser
3. Admin login credentials are:
   - Username: `admin`
   - Password: `admin123`

## Pages Description

### Home Page (index.php)
- Welcome message and platform overview
- Navigation to job listings
- Information about featured job categories
- Call-to-action button to view jobs

### Job Listings (jobs.php)
- Display all jobs from database
- Category filter dropdown
- Show job title, organization, category
- "View Details" button for each job
- Responsive grid layout

### Job Details (job_details.php)
- Full job information
- Organization name and contact email
- Complete job description
- Posted date
- Back button to job listings

### Admin Login (admin_login.php)
- Simple login form
- Form validation
- Demo credentials displayed
- Session-based authentication

### Admin Dashboard (admin_dashboard.php)
- List all jobs in a table
- Edit and Delete buttons for each job
- Add New Job button
- Logout button
- Job count display

### Add Job (add_job.php)
- Form to add new job listing
- Fields: Title, Organization, Category, Description, Email
- Form validation on submit
- Success/error messages

### Edit Job (edit_job.php)
- Pre-filled form with existing job data
- Update database on submit
- Form validation
- Success/error messages

## Design Features

- **Simple & Clean**: Professional design with neutral colors (navy blue, white, grey)
- **Responsive**: Works on desktop, tablet, and mobile devices
- **No Frameworks**: Pure CSS with media queries for responsiveness
- **Form Validation**: JavaScript validation on login and job forms
- **Session Management**: Secure admin area with session handling
- **Database Integration**: MySQL backend for data persistence

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: PHP (procedural, no MVC)
- **Database**: MySQL
- **Server**: Apache (or any PHP-enabled server)

## Security Notes

⚠️ **Important**: This is a student project for educational purposes only. For production use:
- Use parameterized queries or prepared statements
- Hash passwords with bcrypt or similar
- Use HTTPS
- Implement CSRF tokens
- Add rate limiting
- Use environment variables for sensitive data

## Demo Credentials

**Admin Access:**
- Username: `admin`
- Password: `admin123`

## Browser Compatibility

- Chrome/Chromium
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Size & Performance

- Lightweight HTML pages
- Single CSS file (~15KB)
- Minimal JavaScript (~2KB)
- No external dependencies or CDNs
- Fast page load times

## Code Style

The code is intentionally written in a simple, student-friendly manner:
- Clear indentation and comments
- Procedural PHP (not OOP)
- Straightforward logic and structure
- No advanced design patterns
- Easy to understand and modify

## Support & Troubleshooting

### Database Connection Error
- Check `config.php` credentials match your MySQL setup
- Ensure MySQL server is running
- Verify `linkedout_db` database exists

### Login Issues
- Use demo credentials: admin / admin123
- Clear browser cache/cookies if session persists

### CSS Not Loading
- Ensure `style.css` is in the same directory as PHP files
- Check file permissions

## Future Enhancements

- User registration for job seekers
- Application tracking system
- Email notifications
- Advanced search filters
- Job recommendations
- User ratings and reviews

## License

This project is for educational purposes. Feel free to modify and use as needed for your university project.

---

**Version**: 1.0
**Created**: 2024
**Platform**: Kenya Job Advertisement System
