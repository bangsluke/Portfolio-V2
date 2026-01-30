---
tags:
  - project
  - portfolio
  - notes
  - project/completed
created: 2025-06-23 13:36
modified: 2026-01-22T11:03:37+00:00
viewCount: 18
aliases:
  - backend-server
  - backend server
projectURL: https://bangsluke-backend-server-221df04e1ad6.herokuapp.com/
codeURL: https://github.com/bangsluke/bangsluke-backend-server
codeMultipleRepos: false
deploymentServiceURL: https://dashboard.heroku.com/apps/server-mytraveljournal
folderURL: n/a
logoURL: https://i.postimg.cc/NMxp2sWq/Backend-Server.png
imageURL: https://i.postimg.cc/Y0kZTywq/Backend-Server.png
dateStart: 2025-06-24
dateEnd: 2025-10-01
technologies:
  - "[[Neo4j]]"
  - "[[Neo4j Aura]]"
  - "[[Heroku]]"
  - "[[Cypher]]"
  - "[[Python]]"
  - "[[pip]]"
  - "[[GraphQL]]"
  - "[[npm]]"
  - "[[VS Code]]"
  - "[[Codeium]]"
  - "[[Flask]]"
projectCategory: Backend
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - Server
  - Backend
powerShellAlias: backend
version: 1
portfolioOrder: 5
shortDescription: "The backend server and source of data for several of my projects, allowing a singular point of management and maintenance."
longDescription: "The source of data for several projects including my <a href=\"/projects/dorkinians-website-v3\" class=\"theme-link\">Dorkinians Website V3</a> and <a href=\"/projects/travel-website\" class=\"theme-link\">Travel Website</a>, providing a route for data retrieval from a <span class=\"theme-link\">Neo4j</span> graph using <span class=\"theme-link\">GraphQL</span> queries."
lessonsLearned: "Taught me about setting up a <span class=\"theme-link\">Flask</span> server and opening up endpoints for data retrieval. Also taught me about how best to organise and manage <span class=\"theme-link\">Python</span> code in a growing codebase given my past experience with <span class=\"theme-link\">Python</span> had been for single script projects.<br><br>Also forced me into developing debugging documentation for myself after making the same mistakes twice and ensuring a third time never happened by writing a checklist for understanding why the backend server crashed."
name: "Backend Server"
---
# Backend Server

> [!back] Link back to [[01 Projects|Projects]]

>[!website-link] Links
>
> ```dataview
TABLE WITHOUT ID this.projectURL as "Project URL Link"
WHERE file = this.file

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

The backend server and source of data for several of my projects, allowing a singular point of management and maintenance.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The source of data for several projects including my [[Dorkinians Website V3]] and [[Travel Website]], providing a route for data retrieval from a [[Neo4j]] graph using [[GraphQL]] queries.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: n/a
- Back end/Datasource: [[Neo4j]], [[Neo4j Aura]], [[Cypher]], [[Python]], [[Flask]]
- Hosting: [[GitHub]] (see [Repositories](#repositories)), [[Heroku]]
- Security: [[Snyk]]
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [[PowerShell]] alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

### AI Architecture Prompts

#### Remote Server Update Prompt

- List current setup
- List all current limitations

- I currently have an app, running with the following setup: the backend data is hosted in a Neo4j graph, specifically in a free Neo4j Aura database.
	- `generate_neo4j_graph_from_md.py` is a Python script that updates the Neo4j Aura graph. The connection is done via .env variables which are set up correctly. This script loops through my Obsidian MD files to grab the required tags and creates and connects the nodes together as per my defined schema.
	- The `remote-update-flask-api.py` opens up a `/generate-graph` endpoint for my existing backend server (stored in Heroku) at <https://server-mytraveljournal-be4d3e31032e.herokuapp.com/> - although this is not currently working
- I need to have an Apple Shortcut on my phone that I can run that triggers the `generate_neo4j_graph_from_md.py` file. It needs to warn me if I have no internet and email me if the script is triggered correctly, and if it fails. However, the Python script is slow (around 5 minutes) to update the Neo4j graph. When pushing from my laptop, I need it to be the laptop Obsidian files, but when pushing from my iPhone, need it to be the locally stored Obsidian files on my phone (not stored on iCloud but instead in the area "On My iPhone"
- Please provide step by step instructions to achieve my requirements and ask any questions that will help you

>[!top] [Back to top](#Table%20of%20Contents)

#### Flask API Setup

- I have a Neo4j database (local for development and Aura for production) full of data with a schema defined in schema.graphql in the front end. 
- How would I create a flask app that opens a server to read and update the Neo4j database? I need the data to be pushed from a certain folder if being triggered from my laptop and from another directory if pushed from my iPhone
- Please separate all Python schema generation into a separate file to the main run file

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [[Dorkinians Website V3]]
- [[Travel Website]]
- [Heroku Test Scheduler](https://dashboard.heroku.com/apps/bangsluke-backend-server/scheduler)
- [Neo4j Aura database](https://console-preview.neo4j.io/projects/7a5b41a0-6373-5c3c-9fcf-48b80d5d38f2/instances)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Taught me about setting up a [[Flask]] server and opening up endpoints for data retrieval. Also taught me about how best to organise and manage [[Python]] code in a growing codebase given my past experience with [[Python]] had been for single script projects.

Also forced me into developing debugging documentation for myself after making the same mistakes twice and ensuring a third time never happened by writing a checklist for understanding why the backend server crashed.

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

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