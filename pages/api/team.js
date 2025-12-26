// pages/api/team.js

import { getAllTeamMembers } from '../../lib/data';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const members = await getAllTeamMembers();
    res.status(200).json(members);
  } catch (error) {
    console.error('API Error fetching team members:', error);
    res.status(500).json({ message: 'Failed to fetch team members' });
  }
}