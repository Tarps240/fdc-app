// pages/index.js

// These imports allow us to use client-side features like useEffect and useState
// to fetch data from our own API.
import React from "react";
import { useEffect, useState } from React;

// A simple component to display a single project card
function ProjectCard({ project }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', borderRadius: '8px' }}>
      <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <a href={`/projects/${project.slug}`}>View Project</a>
    </div>
  );
}

// A simple component to display a single team member card
function TeamMemberCard({ member }) {
  return (
    <div style={{ textAlign: 'center', margin: '16px' }}>
      <img src={member.imageUrl} alt={member.name} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
      <h4>{member.name}</h4>
      <p>{member.role}</p>
    </div>
  );
}

export default function HomePage() {
  // Set up state variables to hold data and loading status
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect will run once when the component is mounted
  useEffect(() => {
    // Async function to fetch data
    async function fetchData() {
      try {
        // Fetch data from our own API endpoints
        const projectsRes = await fetch('/api/projects/featured');
        const projectsData = await projectsRes.json();

        const teamRes = await fetch('/api/team');
        const teamData = await teamRes.json();

        // Set the data in our state variables
        setFeaturedProjects(projectsData);
        setTeamMembers(teamData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        // Set loading to false once data is fetched
        setIsLoading(false);
      }
    }

    fetchData();
  }, []); // The empty array makes the effect run only once

   // Show a loading message while data is being fetched
   if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Father Daughter Construction</h1>
        <p>Building dreams, one project at a time.</p>
      </header>

      <main>
        <section>
          <h2>Featured Projects</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {featuredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section style={{ marginTop: '60px', textAlign: 'center' }}>
          <h2>Meet Our Team</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}