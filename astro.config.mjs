// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon";
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env file manually
try {
  const envPath = join(process.cwd(), '.env');
  const envContent = readFileSync(envPath, 'utf-8');
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      acc[key.trim()] = valueParts.join('=').trim();
    }
    return acc;
  }, {});
  
  // Set environment variables
  Object.entries(envVars).forEach(([key, value]) => {
    process.env[key] = value;
  });
} catch (error) {
  console.warn('No .env file found or error reading it:', error.message);
}

// https://astro.build/config
export default defineConfig({
  site: "https://bangsluke-portfolio.netlify.app/",
  integrations: [preact(), icon(), sitemap({
    filter: (page) =>
      !page.includes("/blog/tags") &&
      !page.includes("/blog/techs"),
  }),],

  vite: {
    plugins: [tailwindcss()],
    define: {
      // Make environment variables available to the client
      'import.meta.env.PUBLIC_APP_BACKEND_URL_DEV': JSON.stringify(process.env.PUBLIC_APP_BACKEND_URL_DEV),
      'import.meta.env.PUBLIC_APP_BACKEND_URL_PROD': JSON.stringify(process.env.PUBLIC_APP_BACKEND_URL_PROD),
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    },
  },
});