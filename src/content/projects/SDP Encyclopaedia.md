---
tags:
  - project
  - portfolio
  - notes
  - project/completed/work
  - coding
  - work
  - "[HTML](#html)"
  - "[CSS](#css)"
  - "[JavaScript](#javascript)"
  - "[GitLab](#gitlab)"
  - "[Azure](#azure)"
  - "[RLE International](#rle-international)"
  - "[Luke Bangs](#luke-bangs)"
  - "[SDP](#sdp)"
  - "[Work](#work)"
  - "[Digital Engineering](#digital-engineering)"
---
# SDP Encyclopaedia

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

A basic site showing an expandable and collapsible list of the swimlanes and activities used in the [SDP](#sdp) tool.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A basic site showing an expandable and collapsible list of the swimlanes and activities used in the [SDP](#sdp) tool.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

An expandable and collapsible list of the swimlanes and activities referenced across the [SDP](#sdp) app, provided as support material to consultants using the tool for [RLE](#rle-international) and also by clients.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [HTML](#html), [CSS](#css), [JavaScript](#javascript)
- Back end/Datasource: n/a
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

- Designed to look like the [SDP](#sdp) site in terms of styling.

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [SDP](#sdp)
- [SDP Acronyms](#sdp-acronyms)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Provided good learning for the interactivity of expanding and collapsing boxes on click, however unfortunately the site remained incomplete as the requirements changed for [SDP](#sdp).

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