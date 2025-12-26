// pages/api/projects/featured.js

import { getFeaturedProjects } from '../../../lib/data';

export default async function handler(req, res) {
   // Only allow GET requests
   if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
   } 

   try {
    const projects = await getFeaturedProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error('API Error fetching featured projects:', error);
    res.status(500).json({ messager: 'Failed to fetch featured projects' });
  }
}