---
tags:
  - project
  - portfolio
  - notes
  - project/active
  - backend-server
  - "[Neo4j](#neo4j)"
  - "[Neo4j Aura](#neo4j-aura)"
  - "[Heroku](#heroku)"
  - "[Cypher](#cypher)"
  - "[Python](#python)"
  - "[Flask](#flask)"
  - n/a
  - "[Luke Bangs](#luke-bangs)"
  - Server
  - Backend
---
# Backend Server

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

A backend server for the data behind my projects.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

The backend source of data for several of my projects, allowing a singular point of management and maintenance.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The source of data for several projects including my [Travel Website](#travel-website) and [Portfolio Site V2](#portfolio-site-v2), providing a route for data retrieval from a [Neo4j](#neo4j) graph using [GraphQL](#graphql) queries.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: n/a
- Back end/Datasource: [Neo4j](#neo4j), [Neo4j Aura](#neo4j-aura), [Cypher](#cypher), [Python](#python), [Flask](#flask)
- Hosting: [GitHub](#github) (see [Repositories](#repositories)), [Heroku](#heroku)
- Security: [Synk](#synk)
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [PowerShell](#powershell) alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Travel Website](#travel-website)
- [Portfolio Site V2](#portfolio-site-v2)
- [Heroku Test Scheduler](https://dashboard.heroku.com/apps/bangsluke-backend-server/scheduler)
- TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Taught me about setting up a [Flask](#flask) server and opening up endpoints for data retrieval. Also taught me about how best to organise and manage [Python](#python) code in a growing codebase given my past experience with [Python](#python) had been for single script projects.

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

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