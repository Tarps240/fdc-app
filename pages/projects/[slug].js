// pages/projects/[slug].js

import { useRouter } from 'next/router';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>Project: {slug}</h1>
      <p>This is a placeholder page for project: {slug}</p>
      <p>We will fetch and display the project details here.</p>
      <a href="/">Back to Home</a>  
    </div>
  );

}