// lib/data.js
import { kv } from '@vercel/kv';

const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

// --- Projects ---
export async function getFeaturedProjects() {
  const projectKeys = await kv.keys('project-*');
  const projects = [];
  const projectPromises = projectKeys.map(async (key) => {
    const projectString = await kv.get(key);
    return projectString ? JSON.parse(projectString) : null;
  });
  const allProjects = await Promise.all(projectPromises);
  return allProjects.filter(project => project?.isFeatured === true);
}

export async function getProjectBySlug(slug) {
  const projectString = await kv.get(`project-${slug}`);
  return projectString ? JSON.parse(projectString) : null;
}

export async function getAllProjects() {
  const projectKeys = await kv.keys('project-*');
  const projectPromises = projectKeys.map(async (key) => {
    const projectString = await kv.get(key);
    return projectString ? JSON.parse(projectString) : null;
  });
  const allProjects = await Promise.all(projectPromises);
  return allProjects.filter(Boolean).sort((a, b) => a.slug.localeCompare(b.slug));
}

// --- Team ---
export async function getTeamMembers() {
  try {
    console.log("KV_REST_API_URL:", KV_REST_API_URL);
    console.log("KV_REST_API_TOKEN:", KV_REST_API_TOKEN ? "Set" : "Not Set");
    
    // FIXED: Use kv.get directly, not fetchData
    const teamString = await kv.get('team');
    console.log("Data received from KV:", teamString);
    
    return teamString ? JSON.parse(teamString) : [];
  } catch (error) {
    console.error("Error in getTeamMembers:", error);
    return [];
  }
}