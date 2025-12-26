// scripts/seed-db.js

// Import Enviroment Variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Import the Vercel KV client. It automatically reads the KV_URL variable.
import { kv } from '@vercel/kv';

// --- My Data ---
// This is where you add projects and team info.
// For images, use placeholder URLs from a service like https://picsun.photos for now.

const projects = [
  {
    slug: "scarsdale-modern-kitchen",
    title: "Scarsdale Modern Kitchen Remodel",
    tagline: "A complete transformation of a dated kitchen into a modern, light-filled family hub.",
    category: "Kitchen & Bath",
    location: { city: "Scarsdale", state: "NY" },
    images: [
      "https://picsum.photos/seed/kitchen1/1200/800.jpg",
      "https://picsum.photos/seed/kitchen2/1200/800.jpg",
      "https://picsum.photos/seed/kitchen3/1200/800.jpg",  
    ],
    description: {
      challenge: "The original kitchen was small, dark, and closed off from the rest of the house.",
      solution: "We removed a load-bearing wall to open the space, installed a large island with quartz countertops, and added a wall of windows.",
      result: "The result is a stunning, functional kitchen that is now the heart of the home.",
    },
    isFeatured: true,
    tags: ["Modern", "Open-Concept", "Quartz Countertops"],
    seo: {
      metaTitle: "Modern Kitchen Remodel | Scarsdale, NY | Father Daughter Construction",
      metaDescription: "View our stunning modern kitchen remodel in Scarsdale, NY.",  
    },  
   },
   {
    slug: "rye-custom-home",
    title: "New Custom Home in Rye",
    tagline: "A breathtaking new construction featuring timeless design and modern amenities.",
    category: "Custom Home",
    location: { city: "Rye", state: "NY" },
    images: [
      "https://picsum.photos/seed/home1/1200/800.jpg",
      "https://picsum.photos/seed/home2/1200/800.jpg",
    ],
    description: {
      challenge: "The clients wanted a home that felt classic but was equipped for modern family life.",
      solution: "We designed and built a 4,500 sq. ft. home from the ground up, focusing on an open floor plan, high-end finishes, and energy efficiency.",
      result: "A stunning custom home that perfectly blends traditional architecture with contemporary comfort, delivered on time and on budget.",
    },
    isFeatured: true,
    tags: ["New Construction", "Classic Design", "Energy Efficient"],
    seo: {
      metaTitle: "Custom Home Builder | Rye, NY | Father Daughter Construction",
      metaDescription: "Father Daughter Construction built a stunning custom home in Rye, NY.",
    },
   },  
];

const team = [
  {
    name: "Rodney Steadinger",
    role: "Co-Founder",
    bio: "With over 30 years of experience, Rodney is the heart and soul of the company. His passion for craftsmanship and attention to detail are evident in every project we undertake.",
    imageUrl: "https://picsum.photos/seed/john/400/400.jpg",
    order: 1,
  },
  {
    name: "Trinity Steadinger",
    role: "Co-Founder & Project Manager",
    bio: "Trinity brings a fresh perspective and exceptional organizational skills. She ensures every project runs smoothly from initial design to final walkthrough, keeping clients informed and happy.",
    imageUrl: "https://picsum.photos/seed/jane/400/400.jpg",
    order: 2,
  },  
];

// --- Seeding Logic ---

async function seedDatabase() {
    console.log("🌱 Starting database seed...");

    // Clear existing data to avoid duplicates on re-run
    const existingProjectKeys = await kv.keys('project-*');
    if (existingProjectKeys.length > 0) {
        await kv.del(...existingProjectKeys);
        console.log("🗑️  Cleared existing projects.");
      }
      
      const existingTeamKeys = await kv.keys('team-*');
      if (existingTeamKeys.length > 0) {
        await kv.del(...existingTeamKeys);
        console.log("🗑️  Cleared existing team members.");
      }

      // Add new team members
      for (const member of team) {
        // We use a 'team-' prefix for team members
        await kv.set(`team-${member.name.toLowerCase().replace('', '-')}`, JSON.stringify(member));
        console.log(`✅ Added team member: ${member.name}`);
      }


      console.log("✨ Database seeding complete!");
}

// Run the script
seedDatabase().catch(console.error);