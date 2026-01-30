---
tags:
  - project
  - coding
  - analysis
  - notes
  - portfolio
  - project/parked
created: 2025-02-02T19:03:00
modified: 2026-01-30T20:21:18+00:00
viewCount: 7
aliases:
projectURL: https://bangsluke-portfolio.netlify.app/
codeURL: https://github.com/bangsluke/Portfolio-V2
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/bangsluke-portfolio/overview
folderURL: n/a
logoURL: https://i.postimg.cc/3RZn08zP/Portfolio-Site-V2.png
imageURL: https://i.postimg.cc/7YxSXB07/Portfolio-Shortened.png
powerShellAlias: portfolio
dateStart: 2025-02-01
dateEnd: 2025-08-26
technologies:
  - "[[Obsidian]]"
  - "[[Netlify]]"
  - "[[GitHub]]"
  - "[[Zod]]"
  - "[[Jest]]"
  - "[[Umami]]"
  - "[[Typescript]]"
  - "[[ESLint]]"
  - "[[Prettier]]"
  - "[[Cursor]]"
  - "[[Playwright]]"
  - "[[Astro|Astro.js]]"
  - "[[Tailwind CSS]]"
  - "[[Preact]]"
  - "[[Node.js]]"
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
shortDescription: "Architected a <span class=\"theme-link\">Node.js</span> system to loop through my <span class=\"theme-link\">Obsidian</span> notes to collate the data for my portfolio, displaying my past projects, experience and skills in a <span class=\"theme-link\">Astro.js</span> app. This system centralised my previously scattered notes about my career."
longDescription: "An updated personal portfolio website for displaying my skills and past projects, building on my previous site with my newly learned skills.<br><br>Every project, skill, role, company, education and reference is stored in <span class=\"theme-link\">Obsidian</span> <span class=\"theme-link\">Markdown</span> notes, processed by <span class=\"theme-link\">Node.js</span> scripts and loaded into the <span class=\"theme-link\">Astro</span> site for display.<br><br>After writing the backend <span class=\"theme-link\">Node</span> setup for gathering the data from the notes, I built the framework from a template, extending the design to include special sections that I wished to display such as the skills bubble graphic, the timeline and carousel components."
lessonsLearned: "Initially I set the project up with an <span class=\"theme-link\">Astro</span> front end and started doing <span class=\"theme-link\">GraphQL</span> calls to my <a href=\"/projects/backend-server\" class=\"theme-link\">Backend Server</a> project to collect the portfolio data I had stored in the <span class=\"theme-link\">Neo4j</span> graph. However I soon realized that I was undoing the speed of <span class=\"theme-link\">Astro</span> and switched to a script that loads the required portfolio data (stored in <span class=\"theme-link\">Obsidian</span> <span class=\"theme-link\">Markdown</span> files) into the portfolio repo and used <span class=\"theme-link\">Astro</span> collections to gather and display the data that way.<br><br>The project taught me about defining <span class=\"theme-link\">npm</span> functions in the `package.json` file and how to pass variables through to these scripts using the `cross-env` package.<br><br>It was also my first taste of <span class=\"theme-link\">Tailwind CSS</span> and although I began to grasp the utility class names towards the end of development, I found it easier in a lot of situations to extract a class and define it in the main <span class=\"theme-link\">CSS</span> file. I see it's benefits for fast prototyping, but I'm not a big fan from what I've seen."
name: "Portfolio Site V2"
---
# Portfolio Site V2

> [!back] Link back to [[01 Projects|Projects]]

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

> - [Analytics Tracking - Umami](https://eu.umami.is/websites/fad6adfb-2b8b-4868-a0a9-59d4fd860488)
> - [Neo4j Aura Database](https://console-preview.neo4j.io/projects/7a5b41a0-6373-5c3c-9fcf-48b80d5d38f2/instances)

## Table of Contents

```table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

Architected a [[Node.js]] system to loop through my [[Obsidian]] notes to collate the data for my portfolio, displaying my past projects, experience and skills in a [[Astro|Astro.js]] app. This system centralised my previously scattered notes about my career.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

An updated personal portfolio website for displaying my skills and past projects, building on my previous site with my newly learned skills.

Every project, skill, role, company, education and reference is stored in [[Obsidian]] [[Markdown]] notes, processed by [[Node.js]] scripts and loaded into the [[Astro]] site for display.

After writing the backend [[Node.js|Node]] setup for gathering the data from the notes, I built the framework from a template, extending the design to include special sections that I wished to display such as the skills bubble graphic, the timeline and carousel components.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Astro]], [[Preact]], [[Tailwind CSS]], [[Zod]]
- Back end/Datasource: [[Obsidian]], [[Node.js]]
- Hosting: [[GitHub]] and [[Netlify]]
- Security: [[Snyk]]
- Authentication: n/a
- Testing: [[Jest]]
- Analytics: [[Umami]]

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [[PowerShell]] alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

> See [Portfolio Site V2 - Canva](https://www.canva.com/design/DAGwOxW7u4E/LWIzan4Iz-ywjKlt-wyYSQ/edit?utm_content=DAGwOxW7u4E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) for the design

Create an updated Portfolio Website, in a similar style to the previous [[Portfolio Site]], but use [[Obsidian]] as the data source and load all data into my existing [[Neo4j]] graph for retrieval by the site. This will allow dynamic and on the fly updates to things such as skills updates, roles updates etc whilst creating a single source of truth in [[Obsidian]].

Add portfolio tag to indicate which project, company and technology/skill should be displayed.

Design initially started from a template project called [NeonMint](https://github.com/EFEELE/NeonMint).

>[!top] [Back to top](#Table%20of%20Contents)

### AI Recommended Architecture 

> See [[ChatGPT]] thread "Portfolio Site V2 Stack"

- Frontend: [[Astro]] or [[React]]
- Backend/API: [[Vercel]] Serverless Functions ([[Node.js]])
- Database: [[Neo4j Aura]] (cloud-hosted graph DB)
- Auth: Secured via [[Vercel]]'s Environment Variables

>[!top] [Back to top](#Table%20of%20Contents)

### Node types

#### Projects

- [[01 Projects|Project]]
	- Example project: [[Dorkinians Website]]
	- Template: [[Template Project]]
    - Properties
        - projectURL
        - codeURL
        - codeMultipleRepos
        - deploymentServiceURL
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
        - portfolioOrder (1 being display first, higher number means later)
    - Sections
	    - Short Description
	    - Long Description
	    - Architecture and Technologies
	    - Lessons Learned
	    - Analysis (using [[Dataview]])

##### Projects List

> Sorted by Portfolio Order

![[Portfolio Base.base#Project Lists]]

>[!top] [Back to top](#Table%20of%20Contents)

#### Skills

If any note has a tag `skill` (and `portfolio`) then they will show up on the Portfolio page as a skill

- [[Skills Notes]]
	- Example skill: [[JavaScript]]
	- Template: [[Template Skill]]
    - Properties
        - skillRating
        - skillDescription
        - logoFileName (used for mapping to the svg file within the site - <https://seeklogo.com/> a good source)
	- Sections
		- Analysis
			- Unread Links (using [[Dataview]])
			- Read Links (using [[Dataview]])
			- Total Count, Last Mentioned, All Mentioned (using [[Dataview]])

##### Skills List

![[Portfolio Base.base#Skills List]]

>[!top] [Back to top](#Table%20of%20Contents)

#### Companies

- Companies - see [[Company Notes]]
	- Example company: [[Opus 2 International]]
	- Template: [[Template Company]]
    - Properties
        - dateStart
        - dateEnd
        - logoURL
    - Sections
	    - Analysis (using [[Dataview]])
		    - Linked Personnel (using [[Dataview]])
		    - Role Descriptions (using [[Dataview]])
		    - Linked Projects (using [[Dataview]])

##### Companies List

```dataview
TABLE WITHOUT ID
	file.link as "Company",
	dateStart as "Start Date",
	dateEnd as "End Date"
FROM #company AND #portfolio
WHERE file.name != "Template Company"
SORT dateStart ASC
```

>[!top] [Back to top](#Table%20of%20Contents)

#### Clients

If a `company` or `club` note has tag `client` (and `portfolio`) then they will show up on the Portfolio page as a client

> *Note: don't use the `organisation` tag as that's reserved for note structure

- Clients - see [[Company Notes]]
	- Example client: [[Dorkinians FC]]
	- Template: 
    - Properties
	    - dateStart
	    - dateEnd
	    - logoURL
	    - linkedCompany - Connected to Company nodes
	- Sections
		- Analysis (using [[Dataview]])
		    - Linked Personnel (using [[Dataview]])
		    - Role Descriptions (using [[Dataview]])
		    - Linked Projects (using [[Dataview]])

##### Clients List

```dataview
TABLE WITHOUT ID
	file.link as "Client",
	dateStart as "Start Date",
	dateEnd as "End Date",
	linkedCompany as "Company"
FROM #client AND #portfolio
WHERE file.name != "Template Client"
SORT dateStart ASC
```

>[!top] [Back to top](#Table%20of%20Contents)

#### Roles

- Roles - see [[Role Notes]]
	- Example role: [[Bug Tester]]
	- Template: [[Template Role]]
    - Properties
        - dateStart
        - dateEnd
        - linkedCompany - Connected to Company nodes
    - Sections
        - Short Role Description
        - Full Role Description
        - Key Achievement
        - Analysis (using [[Dataview]])

##### Roles List

```dataview
TABLE WITHOUT ID
	file.link as "Roles",
	dateStart as "Start Date",
	dateEnd as "End Date",
	linkedCompany as "Company"
FROM #role AND #portfolio
WHERE file.name != "Template Role"
SORT dateStart ASC
```

>[!top] [Back to top](#Table%20of%20Contents)

#### Reference

If a `person` note has tags `colleague` and `reference`  (and `portfolio`) then they will show up on the Portfolio page as a reference

- People - see [[People Notes]]
	- Example person: [[Taryn Auchecorne]]
	- Template: [[Template Reference]]
    - Properties
        - linkedCompany - Connected to Company nodes
        - referenceRole (The role the person was as a reference (e.g. Line Manager))
        - referenceEmail
        - referenceNumber
        - referenceAddress
    - Sections
        - Analysis (using [[Dataview]])

##### Reference List

```dataview
TABLE WITHOUT ID
	file.link as "Reference",
	linkedCompany as "Company",
	portfolioOrder as "Portfolio Order"
FROM #reference AND #portfolio
WHERE file.name != "Template Reference"
SORT portfolioOrder ASC
```

>[!top] [Back to top](#Table%20of%20Contents)

#### Education

- Education - see [[Education Notes]]
	- Example education: [[Ashcombe School]]
	- Template: [[Template Education]]
    - Properties
        - dateStart
        - dateEnd
        - logoURL
    - Sections
        - Qualifications
        - Additional Details
        - Key Memories
        - Analysis (using [[Dataview]])

##### Education List

```dataview
TABLE WITHOUT ID
	file.link as "Education",
	dateStart as "Start Date",
	dateEnd as "End Date"
FROM #education AND #portfolio
WHERE file.name != "Template Education"
SORT dateStart ASC
```

>[!top] [Back to top](#Table%20of%20Contents)

### Node Analysis & Maintenance

> For node type analysis, see [[#Portfolio Items Analysis]]
> For node maintenance, see [[Vault Maintenance#Portfolio Maintenance|Portfolio Maintenance]]

>[!top] [Back to top](#Table%20of%20Contents)

### Portfolio Site Text Content

> Portfolio colour scheme primary theme value: \#8962E8

#### Portfolio Config Options

> Configuration options that control various features and display settings on the portfolio site. These settings are automatically read from this markdown file and applied to the site.

- lookingForWork: true - Controls whether the "Available for work" indicator is displayed in the hero section. Set to `false` to hide this indicator.
- maxProjectsDisplay: 6 - Maximum number of projects to display in the main projects gallery on the homepage. Projects beyond this limit will show a "See more projects" button.

>[!top] [Back to top](#Table%20of%20Contents)

#### About Me Short

After 11 years in automotive engineering, I've pivoted to my real passion: software. I'm a Technical Product Owner with 3 years leading internal software development, able to effectively communicate with both developers and stakeholders. Looking for TPO or Delivery Lead roles where I can help teams ship great products with purpose and precision.

>[!top] [Back to top](#Table%20of%20Contents)

##### Archived About Me Short

**2nd Draft**

> Process-obsessed professional specializing in the "translation layer" between commercial vision and technical reality. I bridge the gap between stakeholders and developers to deliver high-quality, user-focused software. Currently seeking Technical Product Owner or Delivery Lead roles where I can shape both the product and the process.

**1st Draft**

> Enthusiastic and personable professional with a passion for data and software, seeking a dynamic role to apply strong organisational skills, logical thinking and effective communication to drive long-term success. Open to positions where I can make a positive impact including Software Developer, [[DevOps]] Engineer or Product Owner

>[!top] [Back to top](#Table%20of%20Contents)

#### About Me Long

> For the full About Me section text, see the [[Portfolio About Me]] note

>[!top] [Back to top](#Table%20of%20Contents)

#### Social Media Profile Summaries

Software developer with a passion for building web applications and automating processes

- [GitHub Profile](https://github.com/bangsluke)
- [LinkedIn Profile](https://www.linkedin.com/in/bangsluke/)
- [Medium Profile](https://medium.com/@bangsluke)
- [Dev Profile](https://dev.to/bangsluke)

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [[Portfolio Site]]
- [Portfolio Site V2 - Canva](https://www.canva.com/design/DAGwOxW7u4E/LWIzan4Iz-ywjKlt-wyYSQ/edit?utm_content=DAGwOxW7u4E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [[Portfolio About Me]]
- [Analytics Tracking - Umami](https://eu.umami.is/websites/fad6adfb-2b8b-4868-a0a9-59d4fd860488)
- [Neo4j Aura Database](https://console-preview.neo4j.io/projects/7a5b41a0-6373-5c3c-9fcf-48b80d5d38f2/instances)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Initially I set the project up with an [[Astro]] front end and started doing [[GraphQL]] calls to my [[Backend Server]] project to collect the portfolio data I had stored in the [[Neo4j]] graph. However I soon realized that I was undoing the speed of [[Astro]] and switched to a script that loads the required portfolio data (stored in [[Obsidian]] [[Markdown]] files) into the portfolio repo and used [[Astro]] collections to gather and display the data that way.

The project taught me about defining [[npm]] functions in the `package.json` file and how to pass variables through to these scripts using the `cross-env` package.

It was also my first taste of [[Tailwind CSS]] and although I began to grasp the utility class names towards the end of development, I found it easier in a lot of situations to extract a class and define it in the main [[CSS]] file. I see it's benefits for fast prototyping, but I'm not a big fan from what I've seen. 

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