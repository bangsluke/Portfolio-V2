---
tags:
  - project
  - coding
  - portfolio
  - project/active
  - analysis
  - notes
created: 2025-02-02T19:03:00
modified: 2025-07-20T08:31:33+01:00
viewCount: 52
aliases: 
projectURL: https://bangsluke-portfolio.netlify.app/
codeURL: https://github.com/bangsluke/Portfolio-V2
codeMultipleRepos: true
deploymentServiceURL: https://app.netlify.com/projects/bangsluke-portfolio/overview
folderURL: n/a
logoURL: n/a
imageURL: 
powerShellAlias: portfolio
dateStart: 2025-02-01
dateEnd: ""
technologies:
  - "[[Neo4j]]"
  - "[[GraphQL]]"
  - "[[Obsidian]]"
  - "[[Netlify]]"
  - "[[GitHub]]"
  - "[[Astro]]"
  - "[[Tailwind CSS]]"
  - "[[Preact]]"
  - "[[Neo4j Aura]]"
  - "[[Zod]]"
projectCategory: Portfolio
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
version: 2
portfolioOrder: 2
---

# Portfolio Site V2

> [!back] Link back to <span class="theme-link">Projects</span>

>[!website-link] Links
> ```dataview
TABLE WITHOUT ID this.projectURL as "Project URL Link"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID this.codeURL as "Codebase URL Link"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID choice(this.codeMultipleRepos = true, link("#repositories","True - Click for link"), "False") as "Multiple Repos"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID this.deploymentServiceURL as "Deployment Service Link"
WHERE file = this.file

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents

```table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A personal portfolio website for displaying my skills and past projects.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

An updated personal portfolio website for displaying my skills and past projects, building on my previous site with my newly learned skills.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="theme-link">Portfolio Site V2 Canvas</span> for the design
- Also see “Portfolio V2” in Freeform for design ideas

>[!top] [Back to top](#Table%20of%20Contents)

### Node types

#### Projects

- <span class="theme-link">Project</span>
	- Example project: <span class="theme-link">Portfolio Maintenance</span>

>[!top] [Back to top](#Table%20of%20Contents)

### Portfolio Site Text Content

#### Portfolio Config Options

> Configuration options that control various features and display settings on the portfolio site. These settings are automatically read from this markdown file and applied to the site.

- lookingForWork: true - Controls whether the "Available for work" indicator is displayed in the hero section. Set to `false` to hide this indicator.
- maxProjectsDisplay: 6 - Maximum number of projects to display in the main projects gallery on the homepage. Projects beyond this limit will show a "See more projects" button.

>[!top] [Back to top](#Table%20of%20Contents)

#### About Me Short

Testing hello

TBC - Write more

Don't replace

>[!top] [Back to top](#Table%20of%20Contents)

#### About Me Long

Long long

TBC - Write more

Don't replace

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- <a href="/portfolio/projects/Portfolio Site" class="theme-link">Portfolio Site</a>

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

Initially I set the project up with an <span class="theme-link">Astro</span> front end and started doing <span class="theme-link">GraphQL</span> calls to my <a href="/portfolio/projects/Backend Server" class="theme-link">Backend Server</a> project to collect the portfolio data I had stored in the <span class="theme-link">Neo4j</span> graph. However I soon realized that I was undoing the speed of <span class="theme-link">Astro</span> and switched to a script that loads the required portfolio data (stored in <span class="theme-link">Obsidian</span> <span class="theme-link">Markdown</span> files) into the portfolio repo and used <span class="theme-link">Astro</span> collections to gather and display the data that way.

The project taught me about defining <span class="theme-link">npm</span> functions in the `package.json` file and how to pass variables through to these scripts using the `cross-env` package.

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Portfolio Items Analysis

#### Portfolio Items Count

```dataview
TABLE WITHOUT ID
	Category, length(rows) AS "Count"
FROM #Portfolio
WHERE !contains(file.path, "04 Templates")
FLATTEN choice(
  contains(file.tags, "#project"), "Project",
  choice(contains(file.tags, "#education"), "Education",
choice(contains(file.tags, "#client"), "Client",
choice(contains(file.tags, "#person"), "Reference",
choice(contains(file.tags, "#skill"), "Skill",
choice(contains(file.tags, "#training"), "Role",
choice(contains(file.tags, "#company"), "Company",choice(
contains(file.tags, "#role"), "Role","Error"))
)))))) AS Category
GROUP BY Category
```

>[!top] [Back to top](#Table%20of%20Contents)

#### All Portfolio Items

```dataview
TABLE WITHOUT ID
	file.link as "Item",
	choice(contains(file.tags, "#project"),"Project",choice(contains(file.tags, "#company"),"Company",choice(contains(file.tags, "#client"),"Client",choice(contains(file.tags, "#person"),"Reference",choice(contains(file.tags, "#education"),"Education",choice(contains(file.tags, "#skill"),"Skill",choice(contains(file.tags, "#role"),"Role",""))))))) as "Category",
	length(file.inlinks) AS "Mentions",
	join(filter(file.tags, (tag) => !contains(["#notes", "#tag", "#portfolio"], tag)), ", ") AS "Tags",
	viewCount AS "View Count"
FROM #portfolio
WHERE
	!contains(file.path, "04 Templates") AND file.name != this.file.name
SORT file.name ASC
```

>[!top] [Back to top](#Table%20of%20Contents)

### Last Mentioned in Daily Notes

```dataview
TABLE WITHOUT ID file.link as "Last Mentioned in Daily Note"
FROM [[]]
WHERE contains(tags, "daily")
SORT file.ctime DESC
LIMIT 1
```

>[!top] [Back to top](#Table%20of%20Contents)

### Total Count

```dataview
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"
```

### Last Mentioned

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5
```

### All Mentions

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
```

>[!top] [Back to top](#Table%20of%20Contents)