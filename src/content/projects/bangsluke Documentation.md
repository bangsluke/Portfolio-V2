---
tags:
  - project
  - portfolio
  - notes
  - coding
  - project/completed
  - Documentation Site
  - bangsluke-documentation
  - "[React](#react)"
  - "[Docusaurus](#docusaurus)"
  - "[Markdown](#markdown)"
  - "[GitHub](#github)"
  - "[Netlify](#netlify)"
  - "[Synk](#synk)"
  - "[Algolia](#algolia)"
  - n/a
  - "[Luke Bangs](#luke-bangs)"
  - Documentation
  - Coding
---
# bangsluke Documentation

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

A personal documentation site storing key links to the software I use, articles I find useful, and a section on [Dorkinians FC](#dorkinians-fc) stats.

The repo also contains my [Homepage](#homepage-website) and [New Tab](#new-tab-website) pages.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A personal documentation site storing key links to the software I use, articles I find useful, and a section on [Dorkinians FC](#dorkinians-fc) stats.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

Broken out into several sections, my documentation site provides me top level links to key softwares and guides me through each project, from planning, installation and set up to develop, testing and deployment.

I regularly keep it updated with new links and processes I find so that it remains relevant to the work I am doing.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [React](#react) using [Docusaurus](#docusaurus), [Algolia](#algolia)
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

- All built and designed using [Docusaurus](#docusaurus) structures with minimal additional styling added.

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- https://docusaurus.io/

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project introduced me to the concept of documentation sites, the ease and brilliance of [Markdown](#markdown) and led me to notice how many different softwares either use [Docusaurus](#docusaurus) or a very similar type static site builder for their documentation.

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