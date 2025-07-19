---
tags:
  - project
  - portfolio
  - notes
  - project/active
created: 2025-06-23 13:36
modified: 2025-07-19T09:42:21+01:00
viewCount: 13
aliases:
  - backend-server
projectURL: https://bangsluke-backend-server-221df04e1ad6.herokuapp.com/
codeURL: https://github.com/bangsluke/bangsluke-backend-server
codeMultipleRepos: false
deploymentServiceURL: https://dashboard.heroku.com/apps/server-mytraveljournal
folderURL: n/a
logoURL: https://i.imgur.com/yqTK1TX.png
imageURL: https://i.imgur.com/o3p2v41.png
dateStart: 2025-06-24
dateEnd: ""
technologies:
  - "[[Neo4j]]"
  - "[[Neo4j Aura]]"
  - "[[Heroku]]"
  - "[[Cypher]]"
  - "[[Python]]"
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
portfolioOrder: 1
shortDescription: "The backend server and source of data for several of my projects, allowing a singular point of management and maintenance."
longDescription: "The source of data for several projects including my <a href=\"/portfolio/projects/Travel Website\" class=\"mint-link\">Travel Website</a> and <a href=\"/portfolio/projects/Portfolio Site V2\" class=\"mint-link\">Portfolio Site V2</a>, providing a route for data retrieval from a <span class=\"mint-link\">Neo4j</span> graph using <span class=\"mint-link\">GraphQL</span> queries."
lessonsLearned: "Taught me about setting up a <span class=\"mint-link\">Flask</span> server and opening up endpoints for data retrieval. Also taught me about how best to organise and manage <span class=\"mint-link\">Python</span> code in a growing codebase given my past experience with <span class=\"mint-link\">Python</span> had been for single script projects.\nTBC"
---
# Backend Server

> [!back] Link back to <span class="mint-link">Projects</span>

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

The source of data for several projects including my <a href="/portfolio/projects/Travel Website" class="mint-link">Travel Website</a> and <a href="/portfolio/projects/Portfolio Site V2" class="mint-link">Portfolio Site V2</a>, providing a route for data retrieval from a <span class="mint-link">Neo4j</span> graph using <span class="mint-link">GraphQL</span> queries.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: n/a
- Back end/Datasource: <span class="mint-link">Neo4j</span>, <span class="mint-link">Neo4j Aura</span>, <span class="mint-link">Cypher</span>, <span class="mint-link">Python</span>, <span class="mint-link">Flask</span>
- Hosting: <span class="mint-link">GitHub</span> (see [Repositories](#repositories)), <span class="mint-link">Heroku</span>
- Security: <span class="mint-link">Snyk</span>
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the <span class="mint-link">PowerShell</span> alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- <a href="/portfolio/projects/Travel Website" class="mint-link">Travel Website</a>
- <a href="/portfolio/projects/Portfolio Site V2" class="mint-link">Portfolio Site V2</a>
- [Heroku Test Scheduler](https://dashboard.heroku.com/apps/bangsluke-backend-server/scheduler)
- TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Taught me about setting up a <span class="mint-link">Flask</span> server and opening up endpoints for data retrieval. Also taught me about how best to organise and manage <span class="mint-link">Python</span> code in a growing codebase given my past experience with <span class="mint-link">Python</span> had been for single script projects.

TBC

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