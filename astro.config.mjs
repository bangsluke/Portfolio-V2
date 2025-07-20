// @ts-check
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
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
  }),],

  vite: {
    plugins: [
      tailwindcss()
    ],
    define: {

    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      // Suppress warnings for unknown languages (like Obsidian-specific syntaxes)
      wrap: true,
      // Configure custom languages for Obsidian-specific syntaxes
      languages: [
        {
          id: 'dataview',
          scopeName: 'source.dataview',
          grammar: {
            patterns: [
              {
                name: 'keyword.control.dataview',
                match: '\\b(TABLE|FROM|WHERE|SORT|LIMIT|FLATTEN|GROUP BY|AS)\\b',
              },
              {
                name: 'string.quoted.dataview',
                match: '"[^"]*"',
              },
              {
                name: 'constant.numeric.dataview',
                match: '\\b\\d+\\b',
              },
              {
                name: 'variable.other.dataview',
                match: '\\b(this\\.\\w+|file\\.\\w+)\\b',
              },
            ],
          },
        },
        {
          id: 'table-of-contents',
          scopeName: 'source.table-of-contents',
          grammar: {
            patterns: [
              {
                name: 'comment.line.table-of-contents',
                match: '^.*$',
              },
            ],
          },
        },
        {
          id: 'meta-bind',
          scopeName: 'source.meta-bind',
          grammar: {
            patterns: [
              {
                name: 'variable.other.meta-bind',
                match: '\\b\\w+\\b',
              },
            ],
          },
        },
      ],
      // Note: Shiki warnings for "dataview", "table-of-contents", "meta-bind", and "chatgpt" 
      // are expected when syncing from Obsidian. These are Obsidian-specific syntaxes that 
      // fall back to plaintext highlighting. The warnings are harmless and can be ignored.
    },
  },
});