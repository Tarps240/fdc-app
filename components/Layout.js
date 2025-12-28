// components/Layout.js
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <footer style={{
        backgroundColor: '#34495e',
        color: 'white',
        padding: '24px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <p>© {new Date().getFullYear()} Father Daughter Construction. All rights reserved.</p>
        <p style={{ fontSize: '14px', marginTop: '8px', color: '#bdc3c7' }}>
          Building dreams, one project at a time.
        </p>
      </footer>
    </div>
  );  
}