// lib/data.js

// Import the Vercel KV client.
// It will automatically read the KV_REST_API_URL and KV_REST_API_TOKEN
// from your environment variables when deployed.
import { kv } from '@vercel/kv';

const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

// --- Projects ---

/**
 * Fetches all projects marked as 'isFeatured'.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of featured project objects.
 */
export async function getFeaturedProjects() {
    // In KV, we fetch all keys and filter in the app.
    // This is acceptable for a small number of projects.
    const projectKeys = await kv.keys('project-*');
    const projects = [];
    
    // Use Promise.all for better performance
    const projectPromises = projectKeys.map(async (key) => {
      const projectString = await kv.get(key);
      return projectString ? JSON.parse(projectString) : null;
    });
  
    const allProjects = await Promise.all(projectPromises);
    
    return allProjects.filter(project => project?.isFeatured === true);
  }
  
  /**
   * Fetches a single project by its slug.
   * @param {string} slug - The slug of the project to fetch.
   * @returns {Promise<Object|null>} A promise that resolves to the project object or null if not found.
   */
  export async function getProjectBySlug(slug) {
    const projectString = await kv.get(`project-${slug}`);
    return projectString ? JSON.parse(projectString) : null;
  }
  
  /**
   * Fetches all projects, useful for a main portfolio page.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of all project objects.
   */
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
  
  /**
   * Fetches all team members, sorted by their 'order' field.
   * @returns {Promise<Array<Object>>} A promise that resolves to a sorted array of team member objects.
   */
  export async function getTeamMembers() {
    const teamKeys = await kv.keys('team-*');
    const teamPromises = teamKeys.map(async (key) => {
      const memberString = await kv.get(key);
      return memberString ? JSON.parse(memberString) : null;
    });
  
    const allMembers = await Promise.all(teamPromises);
    
    return allMembers
      .filter(Boolean)
      .sort((a, b) => a.order - b.order);
  }