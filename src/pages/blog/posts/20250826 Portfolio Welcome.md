---
layout: /src/layouts/MarkdownPostLayout.astro
title: "Welcome to My Portfolio"
author: "Luke Bangs"
description: "Welcome to my Portfolio site, highlighting my past projects and skills"
image:
  url: "https://bangsluke-assets.netlify.app/images/blog-images/20250826 Portfolio Welcome.png"
  alt: "Portfolio Launch"
pubDate: 2025-08-26
topics: ["#welcome", "#portfolio", "Astro"]
slug: "portfolio-welcome"
---

Welcome to my new portfolio site - a single place to explore my projects, experience, and skills.

## Building the Product

When I built my first <a href="/projects/portfolio-site" class="theme-link">Portfolio Site</a>, it was the classic starter approach - vanilla <span class="theme-link">HTML</span>, <span class="theme-link">CSS</span>, and <span class="theme-link">JavaScript</span>, with skill data stored in hardcoded <span class="theme-link">CSV</span> and <span class="theme-link">JS</span> files and project details written manually into the markup. It did the job, but every update meant editing multiple files by hand. The friction was real, and it meant the site quietly fell behind what I was actually working on.

That maintenance pain is what kicked off a rethink. I was already using <span class="theme-link">Obsidian</span> daily as my <span class="theme-link">personal knowledge management system</span>, so the idea was simple: what if my notes _were_ my data source? I defined a schema across my vault for projects, companies, and references, mapping their relationships so that a single update in <span class="theme-link">Obsidian</span> would flow through to the site automatically. One source of truth, zero duplication.

To make it work, I set up a <span class="theme-link">Neo4j</span> graph database as a shared backend and created a <span class="theme-link">Python</span> script to extract the content from my <span class="theme-link">Obsidian</span> vault. From there, I started building the new site in <span class="theme-link">Astro</span>, using <span class="theme-link">GraphQL</span> queries to pull data from the backend at build time.

It worked. But it was overengineered.

The backend dependency added complexity without enough payoff, and it undercut one of <span class="theme-link">Astro</span>'s core strengths - its ability to work directly with local content. So I pivoted. I stripped out the <span class="theme-link">GraphQL</span> layer and instead processed the <span class="theme-link">Obsidian</span> <span class="theme-link">Markdown</span> files directly into <span class="theme-link">Astro</span>'s content collections. The result was a dramatically faster site, far simpler to maintain, and one where I could go from updating a note to seeing it live in minutes.

**The product lesson here is one I keep coming back to:** validate the simplest version first. It is tempting to reach for the most technically interesting architecture, but the best solution is usually the one that removes the most friction for the least complexity. The <span class="theme-link">Neo4j</span> approach taught me a lot, but the <span class="theme-link">Markdown</span>-first approach shipped better outcomes with less overhead.

This site is the version you're reading now. Have a look around, and if you'd like to talk product, delivery, or anything else - get in touch.