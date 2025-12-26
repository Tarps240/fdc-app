// pages/api/team.js

// Corrected path: goes up two levels from 'api/' to the root
import { getTeamMembers } from '../../lib/data';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Corrected function name
    const members = await getTeamMembers();
    res.status(200).json(members);
  } catch (error) {
    console.error('API Error fetching team members:', error);
    res.status(500).json({ message: 'Failed to fetch team members' });
  }
}