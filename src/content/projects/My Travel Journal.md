---
tags:
  - project
  - portfolio
  - notes
  - travel
  - project/archived
  - coding
  - "[React](#react)"
  - "[Markdown](#markdown)"
  - "[GitHub](#github)"
  - "[Netlify](#netlify)"
  - "[Synk](#synk)"
  - n/a
  - "[Luke Bangs](#luke-bangs)"
  - "[Holidays & Travel](#holidays-&-travel)"
  - "[Travel Notes](#travel-notes)"
---
# My Travel Journal

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

A note about my first attempt at building My Travel Journal.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A website built to display the notes I had taken across various holidays I had been on.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A site dedicated to my travel explorations, providing details on what my wife and I did whilst abroad for several holidays with a picture from each trip.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [React](#react)
- Back end/Datasource: [Markdown](#markdown)
- Hosting: [GitHub](#github) (see [Repositories](#repositories)), [Netlify](#netlify)
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

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This site taught me a few extra skills such as working with [Markdown](#markdown) data; parsing it and extracting the relevant pieces. As this site was built purely on several markdown files providing the data, saved directly into the repository, this inspired me to go further and develop the [Travel Website](#travel-website) which dynamically loads in data via a [Neo4j](#neo4j) graph.

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

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