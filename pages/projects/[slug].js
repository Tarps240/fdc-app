// pages/projects/[slug].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '18px',
        color: '#7f8c8d'
      }}>
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
        maxWidth: '800px', 
        margin: 'auto', 
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#e74c3c', fontSize: '36px' }}>Project Not Found</h1>
        <p style={{ fontSize: '18px', color: '#7f8c8d', marginBottom: '24px' }}>
          The project you're looking for doesn't exist.
        </p>
        <Link 
          href="/"
          style={{
            display: 'inline-block',
            backgroundColor: '#3498db',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '16px'
          }}
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      maxWidth: '1200px', 
      margin: 'auto', 
      padding: '40px 20px'
    }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '42px', 
          color: '#2c3e50',
          marginBottom: '16px',
          fontWeight: '700'
        }}>
          {project.title}
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#7f8c8d',
          lineHeight: '1.6',
          maxWidth: '800px'
        }}>
          {project.description}
        </p>
      </header>

      <main>
        {project.imageUrl && (
          <div style={{ marginBottom: '40px', borderRadius: '12px', overflow: 'hidden' }}>
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              style={{ 
                width: '100%', 
                height: '500px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
          </div>
        )}

        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: '32px',
          borderRadius: '12px',
          marginBottom: '40px'
        }}>
          <h2 style={{ 
            fontSize: '28px', 
            color: '#2c3e50',
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            Project Details
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {project.location && (
              <div>
                <h3 style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '8px' }}>LOCATION</h3>
                <p style={{ fontSize: '18px', color: '#2c3e50', fontWeight: '500' }}>{project.location}</p>
              </div>
            )}
            
            {project.type && (
              <div>
                <h3 style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '8px' }}>PROJECT TYPE</h3>
                <p style={{ fontSize: '18px', color: '#2c3e50', fontWeight: '500' }}>{project.type}</p>
              </div>
            )}
            
            {project.year && (
              <div>
                <h3 style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '8px' }}>YEAR</h3>
                <p style={{ fontSize: '18px', color: '#2c3e50', fontWeight: '500' }}>{project.year}</p>
              </div>
            )}
          </div>
        </div>

        {project.features && project.features.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              color: '#2c3e50',
              marginBottom: '24px',
              fontWeight: '600'
            }}>
              Key Features
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {project.features.map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #3498db',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <p style={{ margin: 0, color: '#2c3e50', fontSize: '16px' }}>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#3498db',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
          >
            ← Back to All Projects
          </Link>
        </div>
      </main>
    </div>
  );
}