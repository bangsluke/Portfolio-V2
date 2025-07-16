---
tags:
  - project
  - coding
  - portfolio
  - project/active
  - analysis
  - notes
  - "[React](#react)"
  - "[Neo4j](#neo4j)"
  - "[GraphQL](#graphql)"
  - "[Obsidian](#obsidian)"
  - "[Netlify](#netlify)"
  - "[GitHub](#github)"
  - "[Astro](#astro)"
  - "[Tailwind CSS](#tailwind-css)"
  - "[Preact](#preact)"
  - "[Neo4j Aura](#neo4j-aura)"
  - n/a
  - "[Luke Bangs](#luke-bangs)"
  - "[Work](#work)"
---
# Portfolio Site V2

> **BACK:** Link back to [Projects](#01-projects)

>[!website-link] Links
> 
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID this.projectURL as "Project URL Link"
WHERE file = this.file
>
-->

>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID this.codeURL as "Codebase URL Link"
WHERE file = this.file
>
-->

>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID choice(this.codeMultipleRepos = true, link("#repositories","True - Click for link"), "False") as "Multiple Repos"
WHERE file = this.file

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents


-->
table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Introduction

A note for storing details on the updated version of my professional portfolio website.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A personal portfolio website for displaying my skills and past projects

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

An updated personal portfolio website for displaying my skills and past projects, building on my previous site with my newly learned skills

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [Astro](#astro), [Preact](#preact), [React](#react), [Tailwind CSS](#tailwind-css)
- Back end/Datasource: [Obsidian](#obsidian), [Neo4j](#neo4j), [Neo4j Aura](#neo4j-aura), [GraphQL](#graphql)
- Hosting: [GitHub](#github) and [Netlify](#netlify)
- Security: [Synk](#synk)
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Backend repo: https://github.com/bangsluke/bangsluke-backend-server
- [Netlify](#netlify): https://app.netlify.com/projects/bangsluke-portfolio/overview

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [PowerShell](#powershell) alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

Create an updated Portfolio Website, in a similar style to the previous [Portfolio Site](#portfolio-site), but use [Obsidian](#obsidian) as the data source and load all data into my existing [Neo4j](#neo4j) graph for retrieval by the site. This will allow dynamic and on the fly updates to things such as skills updates, roles updates etc whilst creating a single source of truth in [Obsidian](#obsidian).

Add portfolio tag to indicate which project, company and technology/skill should be displayed.

Design initially started from a template project called [NeonMint](https://github.com/EFEELE/NeonMint).

>[!top] [Back to top](#Table%20of%20Contents)

### ChatGPT Recommended Architecture 

> See [ChatGPT](#chatgpt) thread “Portfolio Site V2 Stack”

- Frontend: [Astro](#astro) or [React](#react)
- Backend/API: [Vercel](#vercel) Serverless Functions ([Node.js](#node.js))
- Database: [Neo4j Aura](#neo4j-aura) (cloud-hosted graph DB)
- Auth: Secured via [Vercel](#vercel)’s Environment Variables

>[!top] [Back to top](#Table%20of%20Contents)

### Design

- See [Portfolio Site V2 Canvas](#portfolio-site-v2-canvas.canvas) for the design
- Also see “Portfolio V2” in Freeform for design ideas

>[!top] [Back to top](#Table%20of%20Contents)

### Node types

#### Projects

- [Project](#01-projects)
	- Example project: [Dorkinians Website](#dorkinians-website)
	- Template: [Template Project](#template-project)
    - Properties
        - projectURL
        - codeURL
        - codeMultipleRepos
        - folderURL
        - logoURL
        - imageURL
        - dateStart
        - dateEnd
        - technologies - Connected to Skill nodes
        - projectCategory
        - linkedCompany - Connected to Company nodes
        - toolOwner - Connected to Person nodes
        - developers - Connected to Person nodes
        - topicTags - Connected to other nodes or left as strings
        - powerShellAlias
        - version
    - Sections
	    - Introduction
        - Short Description
        - Long Description
        - Architecture and Technologies
        - Lessons Learned
        - Analysis (using [Dataview](#dataview))

##### Projects List


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Project",
	dateStart as "Start Date",
	dateEnd as "End Date",
	elink(projectURL, "Link") as "Project Link",
	elink(codeURL, "Link") as "Code Link"
FROM #project AND #portfolio
WHERE file.name != "Template Project"
SORT dateStart ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

#### Skills

If any note has a tag `skill` (and `portfolio`) then they will show up on the Portfolio page as a skill

- [Skills Notes](#skills-notes)
	- Example skill: [JavaScript](#javascript)
	- Template: [Template Skill](#template-skill)
    - Properties
        - skillRating
        - skillDescription
        - logoURL
	- Sections
		- Analysis
			- Unread Links (using [Dataview](#dataview))
			- Read Links (using [Dataview](#dataview))
			- Total Count, Last Mentioned, All Mentioned (using [Dataview](#dataview))

##### Skills List


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Skill",
	skillRating as "Skill Rating",
	skillDescription as "Skill Description"
FROM #skill AND #portfolio
WHERE file.name != "Template Skill"
SORT skillRating DESC

-->


>[!top] [Back to top](#Table%20of%20Contents)

#### Companies

- Companies - see [Company Notes](#company-notes)
	- Example company: [Opus 2 International](#opus-2-international)
	- Template: [Template Company](#template-company)
    - Properties
        - dateStart
        - dateEnd
        - logoURL
    - Sections
	    - Analysis (using [Dataview](#dataview))
		    - Linked Personnel (using [Dataview](#dataview))
		    - Role Descriptions (using [Dataview](#dataview))
		    - Linked Projects (using [Dataview](#dataview))

##### Companies List


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Company",
	dateStart as "Start Date",
	dateEnd as "End Date"
FROM #company AND #portfolio
WHERE file.name != "Template Company"
SORT dateStart ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

#### Clients

If a `company` or `club` note has tag `client` (and `portfolio`) then they will show up on the Portfolio page as a client

> *Note: don’t use the `organisation` tag as that’s reserved for note structure

- Clients - see [Company Notes](#company-notes)
	- Example client: [Dorkinians FC](#dorkinians-fc)
	- Template: 
    - Properties
	    - dateStart
	    - dateEnd
	    - logoURL
	    - linkedCompany - Connected to Company nodes
	- Sections
		- Analysis (using [Dataview](#dataview))
		    - Linked Personnel (using [Dataview](#dataview))
		    - Role Descriptions (using [Dataview](#dataview))
		    - Linked Projects (using [Dataview](#dataview))

##### Clients List


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Client",
	dateStart as "Start Date",
	dateEnd as "End Date",
	linkedCompany as "Company"
FROM #client AND #portfolio
WHERE file.name != "Template Client"
SORT dateStart ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

#### Roles

- Roles - see [Role Notes](#role-notes)
	- Example role: [Bug Tester](#bug-tester)
	- Template: [Template Role](#template-role)
    - Properties
        - dateStart
        - dateEnd
        - linkedCompany - Connected to Company nodes
    - Sections
        - Role Description
        - Key Achievement
        - Analysis (using [Dataview](#dataview))

##### Roles List


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Roles",
	dateStart as "Start Date",
	dateEnd as "End Date",
	linkedCompany as "Company"
FROM #role AND #portfolio
WHERE file.name != "Template Role"
SORT dateStart ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

#### Reference

If a `person` note has tags `colleague` and `reference`  (and `portfolio`) then they will show up on the Portfolio page as a reference

- People - see [People Notes](#people-notes)
	- Example person: [Taryn Auchecorne](#taryn-auchecorne)
	- Template: [Template Reference](#template-reference)
    - Properties
        - linkedCompany - Connected to Company nodes
        - referenceRole (The role the person was as a reference (e.g. Line Manager))
        - referenceEmail
        - referenceNumber
        - referenceAddress
    - Sections
        - Analysis (using [Dataview](#dataview))

##### Reference List


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Reference",
	linkedCompany as "Company"
FROM #reference AND #portfolio
WHERE file.name != "Template Reference"
SORT dateStart ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

#### Education

- Education - see [Education Notes](#education-notes)
	- Example education: [Ashcombe School](#ashcombe-school)
	- Template: [Template Education](#template-education)
    - Properties
        - dateStart
        - dateEnd
    - Sections
        - Qualifications
        - Additional Details
        - Key Memories
        - Analysis (using [Dataview](#dataview))

##### Education List


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Education",
	dateStart as "Start Date",
	dateEnd as "End Date"
FROM #education AND #portfolio
WHERE file.name != "Template Education"
SORT dateStart ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Node Analysis & Maintenance

> For node type analysis, see [#Portfolio Items Analysis](##portfolio-items-analysis)
> For node maintenance, see [Portfolio Maintenance](#vault-maintenance#portfolio-maintenance)

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Portfolio Site](#portfolio-site)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

Initially I set the project up with an [Astro](#astro) front end and started doing [GraphQL](#graphql) calls to my [Backend Server](#backend-server) project to collect the portfolio data I had stored in the [Neo4j](#neo4j) graph. However I soon realized that I was undoing the speed of [Astro](#astro) and switched to a script that loads the required portfolio data (stored in [Obsidian](#obsidian) [Markdown](#markdown) files) into the portfolio repo and used [Astro](#astro) collections to gather and display the data that way.

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Portfolio Items Analysis

#### Portfolio Items Count


<!-- Dataview Query (hidden in production):
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

-->


>[!top] [Back to top](#Table%20of%20Contents)

#### All Portfolio Items


<!-- Dataview Query (hidden in production):
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

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Last Mentioned in Daily Notes


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID file.link as "Last Mentioned in Daily Note"
FROM [[]]
WHERE contains(tags, "daily")
SORT file.ctime DESC
LIMIT 1

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Total Count


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"

-->


### Last Mentioned


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5

-->


### All Mentions


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC

-->


>[!top] [Back to top](#Table%20of%20Contents)