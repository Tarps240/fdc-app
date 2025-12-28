// pages/projects/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

function ProjectCard({ project }) {
  return (
    <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '400px'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img 
            src={project.imageUrl} 
            alt={project.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover'
            }}
          />
        </div>
        <div style={{ padding: '20px' }}>
          <h3 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '20px', 
            color: '#2c3e50',
            fontWeight: '600'
          }}>
            {project.title}
          </h3>
          <p style={{ 
            margin: '0 0 16px 0', 
            color: '#7f8c8d',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              backgroundColor: project.isFeatured ? '#e74c3c' : '#95a5a6',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {project.isFeatured ? 'FEATURED' : 'STANDARD'}
            </span>
            <Link 
              href={`/projects/${project.slug}`}
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
  );  
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchProjects() {
        try {
          const res = await fetch('/api/projects/featured');
          const data = await res.json();
          setProjects(data);
        } catch (error) {
          console.error('Failed to fetch projects:', error);
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchProjects();
    }, []);
  
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
          Loading projects...
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
            Our Projects
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#7f8c8d',
            lineHeight: '1.6',
            maxWidth: '800px'
          }}>
            Browse our portfolio of completed projects. Each project showcases our dedication to quality craftsmanship and attention to detail.
          </p>
        </header>
  
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px',
              color: '#7f8c8d',
              gridColumn: '1 / -1'
            }}>
              <p style={{ fontSize: '20px' }}>No projects found.</p>
            </div>
          )}
        </div>
      </div>
    );
  }