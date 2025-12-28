// pages/index.js

// These imports allow us to use client-side features like useEffect and useState
// to fetch data from our own API.
import React from "react";
import { useEffect, useState } from 'react';
import Link from 'next/link';

function ProjectCard({ project }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      width: '350px',
      margin: '16px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{ height: '250px', overflow: 'hidden' }}>
        <img 
          src={project.imageUrl} 
          alt={project.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ 
          margin: '0 0 12px 0', 
          fontSize: '22px', 
          color: '#2c3e50',
          fontWeight: '600'
        }}>
          {project.title}
        </h3>
        <p style={{ 
          margin: '0 0 16px 0', 
          color: '#7f8c8d',
          fontSize: '15px',
          lineHeight: '1.5'
        }}>
          {project.description}
        </p>
        <Link 
          href={`/projects/${project.slug}`}
          style={{
            display: 'inline-block',
            backgroundColor: '#3498db',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '14px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
        >
          View Project Details →
        </Link>
      </div>
    </div>
  );
}

function TeamMemberCard({ member }) {
  return (
    <div style={{
      textAlign: 'center',
      margin: '20px',
      width: '200px'
    }}>
      <div style={{
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto 16px auto',
        border: '4px solid #ecf0f1'
      }}>
        <img 
          src={member.imageUrl} 
          alt={member.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }}
        />
      </div>
      <h4 style={{ 
        margin: '0 0 6px 0', 
        fontSize: '18px',
        color: '#2c3e50'
      }}>
        {member.name}
      </h4>
      <p style={{ 
        margin: '0', 
        color: '#3498db',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        {member.role}
      </p>
    </div>
  );
}

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectsRes = await fetch('/api/projects/featured');
        const projectsData = await projectsRes.json();

        const teamRes = await fetch('/api/team');
        const teamData = await teamRes.json();

        setFeaturedProjects(projectsData);
        setTeamMembers(teamData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
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
        Loading...
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '1400px', 
      margin: 'auto', 
      padding: '40px 20px'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '60px',
        padding: '40px 0',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '16px'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          marginBottom: '16px',
          color: '#2c3e50',
          fontWeight: '700'
        }}>
          Father Daughter Construction
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#7f8c8d',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Building dreams, one project at a time.
        </p>
      </header>

      <main>
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '32px',
            marginBottom: '32px',
            color: '#2c3e50',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            Featured Projects
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: '20px'
          }}>
            {featuredProjects.length > 0 ? (
              featuredProjects.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: '#7f8c8d'
              }}>
                No featured projects yet.
              </div>
            )}
          </div>
        </section>

        <section style={{ 
          marginTop: '60px', 
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '16px'
        }}>
          <h2 style={{
            fontSize: '32px',
            marginBottom: '32px',
            color: '#2c3e50',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            Meet Our Team
          </h2>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            {teamMembers.length > 0 ? (
              teamMembers.map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '20px',
                color: '#7f8c8d'
              }}>
                No team members found.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}