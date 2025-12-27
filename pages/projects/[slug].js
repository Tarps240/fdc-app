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
    return <div>Loading project...</div>;
  }

  if (!project) {
    return (
      <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <Link href="/">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </header>

      <main>
        {project.imageUrl && (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px' }}
          />
        )}

        <div style={{ marginTop: '40px' }}>
          <h2>Project Details</h2>
          <p><strong>Location:</strong> {project.location || 'Not specified'}</p>
          <p><strong>Type:</strong> {project.type || 'Not specified'}</p>
          <p><strong>Year:</strong> {project.year || 'Not specified'}</p>
          
          {project.features && project.features.length > 0 && (
            <div>
              <h3>Features</h3>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ marginTop: '40px' }}>
          <Link href="/">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}