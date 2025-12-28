// components/NavBar.js
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav style={{
      backgroundColor: '#2C3E50',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'  
    }}>
       <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
          Father Daughter Construction
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '24px' }}>
  <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
    Home
  </Link>
  <Link href="/projects" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
    Projects
  </Link>
  <Link href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
    About
  </Link>
  <Link href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
    Contact
  </Link>
</div> 
    </nav>
  );  
}