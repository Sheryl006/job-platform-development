# CareerLink Platform - User Manual

## Table of Contents
1. [Getting Started](#getting-started)
2. [For Job Seekers](#for-job-seekers)
3. [For Employers](#for-employers)
4. [For Administrators](#for-administrators)
5. [FAQ](#faq)

---

## Getting Started

### Initial Access
1. Visit the CareerLink homepage
2. You have three options:
   - **Browse Jobs** - Browse available positions (no login needed)
   - **Login** - Sign in with your credentials
   - **Sign Up** - Create a new account

### Demo Credentials
Three pre-configured accounts are available for testing:

**Job Seeker Account**
```
Email: jobseeker@example.com
Password: password
```

**Employer Account**
```
Email: employer@example.com
Password: password
```

**Admin Account**
```
Email: admin@example.com
Password: password
```

---

## For Job Seekers

### 1. Browse Jobs
1. Click "Browse Jobs" from the homepage or navigation
2. You'll see a list of all available positions
3. Use filters to narrow results:
   - **Search**: Type job title or keywords
   - **Location**: Filter by Kenyan county (Nairobi, Kisumu, Mombasa, Nakuru)
   - **Job Type**: Full-time, Part-time, Contract, Temporary

### 2. View Job Details
1. Click on any job card to see full details
2. Information displayed:
   - Job title and company
   - Location and salary (in KES/month)
   - Full job description
   - Required skills/experience
   - Job type (Full-time, Part-time, etc.)

### 3. Apply for a Job
1. On the job details page, click **"Apply Now"**
2. If not logged in, you'll be redirected to login
3. Fill out the application form:
   - **Upload Resume**: Click to select your PDF/DOC file
   - **Cover Letter**: Write a message to the employer
4. Click **"Submit"** to apply
   - ✅ You will receive a success confirmation
   - ✅ You remain logged in after applying
   - ✅ Application is recorded in your account

### 4. Track Applications
1. After logging in, click **"My Applications"** in the navigation
2. View all your submitted applications
3. See status for each application:
   - **Pending**: Application submitted, awaiting review
   - **Reviewed**: Employer has reviewed your application
   - **Shortlisted**: You've been shortlisted for interview
   - **Rejected**: Application not selected
4. Click "View Job" to see the original job posting

---

## For Employers

### 1. Employer Dashboard
1. Login with employer credentials
2. Click **"Dashboard"** in navigation
3. Dashboard shows:
   - Total jobs posted
   - Total applications received
   - Recent applications

### 2. Post a New Job
1. On the dashboard, click **"Post New Job"**
2. Fill in the job details:
   - **Title**: Job position (e.g., "Software Developer")
   - **Location**: Select from Kenyan counties
   - **Salary**: Enter monthly KES amount (e.g., 120,000 - 160,000)
   - **Type**: Select Full-time, Part-time, Contract, or Temporary
   - **Experience**: Required years (e.g., "3+ years")
   - **Description**: Full job description and responsibilities
3. Click **"Submit"** to post
4. Your job will appear in the job listings immediately

### 3. Manage Applications
1. In your dashboard, view all your posted jobs
2. For each job, see:
   - Number of applications received
   - List of applicants
3. For each application, you can:
   - View applicant's cover letter
   - Download their resume
   - Update their status:
     - Change from "Pending" to "Reviewed"
     - Move qualified candidates to "Shortlisted"
     - Mark rejected applications as "Rejected"

### 4. View Job Statistics
- Active job count
- Total applications received
- Breakdown of application statuses
- View applications by job

---

## For Administrators

### 1. Access Admin Dashboard
1. Login with admin credentials (admin@example.com / password)
2. Click **"Admin"** in the navigation
3. You'll see the comprehensive admin panel

### 2. Overview Tab
View platform-wide statistics:
- **Total Jobs**: Number of active job listings
- **Active Companies**: Number of hiring employers
- **Total Applications**: All applications submitted
- **Pending Applications**: Applications awaiting action
- **Average Salary**: Average salary across all jobs

Charts and visualizations:
- Application status distribution
- Job types distribution
- Top positions by company
- Salary analytics

### 3. Users Tab - Account Management
Monitor all employer accounts:
- **Company**: Employer company name
- **Active Jobs**: Number of jobs posted
- **Applications**: Number of applications received
- **Status**: Active or Suspended

**Actions**:
- **Suspend**: Temporarily disable an employer account
  - Click "Suspend" button
  - Confirm in dialog
  - Employer cannot post new jobs
- **Restore**: Re-enable a suspended account
  - Click "Restore" button
  - Account is immediately active

### 4. Jobs Tab - Content Moderation
Manage all job postings:

**Active Jobs Section**:
- View all current job listings
- See job title, company, type, and application count
- Actions available:
  - **View**: Preview job details
  - **Remove**: Delete inappropriate or spam postings
    - Confirms before removal
    - Jobs can be restored from archive

**Removed Jobs Section**:
- View all deleted job postings
- Restore jobs if removal was accidental
- Archive of all removed content

### 5. Reports Tab - Analytics & Reporting
Generate comprehensive platform reports:

**Key Metrics Displayed**:
- Total jobs posted
- Jobs removed (moderation)
- Total applications by status
- Active companies
- Suspended accounts
- Platform uptime and health

**Report Generation**:
- Click **"Download Full Report (JSON)"** to export data
- Report includes:
  - Complete platform statistics
  - Application breakdown
  - Company metrics
  - Salary data
  - Timestamp of report generation
- Use for analysis, presentations, or audits

---

## FAQs

### Q: I applied for a job but can't find my application
**A**: Check the "My Applications" page after logging in. Applications appear there after submission.

### Q: Why was I logged out?
**A**: This issue has been fixed! You should remain logged in while applying for jobs. If it happens, clear your browser cache and try again.

### Q: Can I edit a job I posted?
**A**: Currently, jobs cannot be edited after posting. Delete and repost with correct information.

### Q: How do employers receive applications?
**A**: Employers see applications in their dashboard under each job posting. This is a demo - no email notifications are sent.

### Q: What salary format should employers use?
**A**: Use Kenyan Shillings (KES) with monthly amounts, e.g., "120,000 - 160,000/month"

### Q: Can I delete my account?
**A**: Accounts cannot be deleted in this demo. Contact support for account management.

### Q: How long do applications remain active?
**A**: Applications remain active throughout the job posting period. No automatic archiving.

### Q: Can I apply for the same job twice?
**A**: Currently, yes. In production, duplicate applications would be prevented.

### Q: What happens if an employer's account is suspended?
**A**: They cannot:
- Post new jobs
- See new applications (existing applications remain visible)
- Update application statuses
- Access dashboard

### Q: How do I generate an admin report?
**A**: Go to Admin Dashboard → Reports Tab → Click "Download Full Report (JSON)" → File downloads automatically

### Q: Which browsers are supported?
**A**: All modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Q: Is my data saved if I refresh?
**A**: No. This demo uses in-memory storage. Refresh will reset all data. In production, data would persist in a database.

---

## Troubleshooting

### Issue: Can't login
**Solution**:
1. Check spelling of email address
2. Verify password is "password" (case-sensitive)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private mode

### Issue: Page won't load
**Solution**:
1. Refresh page (F5 or Ctrl+R)
2. Clear browser cache
3. Check internet connection
4. Try different browser

### Issue: Can't apply for job
**Solution**:
1. Ensure you're logged in as job seeker
2. Select a resume file
3. Write a cover letter
4. Click Submit (not other buttons)

### Issue: Job not appearing after posting
**Solution**:
1. Refresh the jobs page
2. Check your employer dashboard
3. Verify all required fields were filled

### Issue: Admin actions not working
**Solution**:
1. Ensure logged in as admin (admin@example.com)
2. Verify you have admin role (check navigation bar)
3. Try refreshing admin page
4. Check browser console for errors (F12)

---

## Tips & Best Practices

✅ **For Job Seekers**:
- Write personalized cover letters for each application
- Keep your resume updated and professional
- Check application status regularly
- Apply to multiple positions to increase chances

✅ **For Employers**:
- Post clear, detailed job descriptions
- Update application statuses promptly
- Review applications within 48 hours
- Communicate with candidates about timeline

✅ **For Admins**:
- Monitor platform health regularly
- Review reported jobs promptly
- Suspend accounts only for policy violations
- Generate monthly reports for analysis

---

## Contact & Support

For issues or questions:
1. Check this manual first
2. Review the FAQ section
3. Try troubleshooting steps
4. Contact support (if available in your deployment)

---

## Version Information

- **Platform**: CareerLink v1.0
- **Build Date**: 2026
- **Status**: Production Ready
- **Last Updated**: March 17, 2026

---

**Enjoy using CareerLink!** 🎉
