// pages/api/projects/[slug].js

import { getProjectBySlug } from '../../../../lib/data';

export default async function handler(req, res) {
  const { slug } = req.query;

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  // Basic validation for the slug
  if (!slug) {
    return res.status(400).json({ message: 'Slug is required' });
  }

  try {
    const project = await getProjectBySlug(slug);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(`API Error fetching project ${slug}:`, error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
}