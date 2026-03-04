export default function Page() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>LINKED OUT Job Portal</h1>
      <p>Click below to access the application:</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/index.html" style={{ 
          display: 'inline-block',
          padding: '12px 24px',
          margin: '10px',
          background: '#001f3f',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Home
        </a>
        <a href="/jobs.html" style={{ 
          display: 'inline-block',
          padding: '12px 24px',
          margin: '10px',
          background: '#003d7a',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Browse Jobs
        </a>
        <a href="/admin.html" style={{ 
          display: 'inline-block',
          padding: '12px 24px',
          margin: '10px',
          background: '#0066cc',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Admin Panel
        </a>
      </div>
    </div>
  );
}
