// @ts-check
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import umami from "@yeskunall/astro-umami";
import icon from "astro-icon";
import { defineConfig } from 'astro/config';
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
  }), umami({ id: "fad6adfb-2b8b-4868-a0a9-59d4fd860488" })],

  vite: {
    plugins: [
      tailwindcss()
    ],
    define: {

    },
  },
  markdown: {
    // Use Prism.js instead of Shiki to avoid WASM module resolution issues
    syntaxHighlight: 'prism',
  },
});