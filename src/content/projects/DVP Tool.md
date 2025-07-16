---
tags:
  - project
  - portfolio
  - notes
  - work
  - project/completed/work
  - coding
  - DVP Prototype
  - "[React](#react)"
  - "[JavaScript](#javascript)"
  - "[Neo4j](#neo4j)"
  - "[GitLab](#gitlab)"
  - "[Azure](#azure)"
  - "[Java](#01-notes/02-areas/work-notes/skills-notes/languages/java)"
  - "[Next.js](#next.js)"
  - "[RLE International](#rle-international)"
  - "[Elena Kohlwey](#elena-kohlwey)"
  - "[Kevin Tim Gruner](#kevin-tim-gruner)"
  - "[Luke Bangs](#luke-bangs)"
  - "[Work](#work)"
  - "[DVP](#dvp)"
---
# DVP Tool

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

A note detailing the work I did on an online [DVP](#dvp) planning tool for [RLE International](#rle-international).

Worked on this with [Elena Kohlwey](#elena-kohlwey) and [Kevin Tim Gruner](#kevin-tim-gruner).

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

The [DVP](#dvp) project was a short demonstration of using [Neo4j](#neo4j) graphs for running optimisation calculations for the Automotive industry.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

[RLE](#rle-international)’s [DVP](#dvp) tool was a working demonstration tool for how problems such as automatically generating a vehicle [DVP](#dvp) could be done from inputs and running optimisation algorithms to generate a Pareto curve of the importance of each input.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [React](#react), [JavaScript](#javascript), [Next.js](#next.js)
- Back end/Datasource: [Neo4j](#neo4j), [Cypher](#cypher), [Java](#01-notes/02-areas/work-notes/skills-notes/languages/java)
- Hosting: [GitLab](#gitlab) (see [Repositories](#repositories))
- Security: n/a
- Authentication: [Azure](#azure)

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

- The main template of the frontend was a Berry Material [UI](#ui) template

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- TBC - add link to the GitLab top level project?

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The lessons learned for me were mainly in data visualisation in the front end, as I received various data points from the backend [Neo4j](#neo4j) and [Java](#01-notes/02-areas/work-notes/skills-notes/languages/java) calculations and had to plot the results on a 3D graph to best demonstrate the tradeoffs between results, allowing the user to select the floating 3D point and see the data inputs behind its generation.

It also taught me a lot about passing large objects of states from one page to the next.

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