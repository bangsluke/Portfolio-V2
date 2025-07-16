---
tags:
  - project
  - portfolio
  - notes
  - Scalable Development Plan
  - "[Java](#01-notes/02-areas/work-notes/skills-notes/languages/java)"
  - "[React](#react)"
  - "[Neo4j](#neo4j)"
  - "[Cypher](#cypher)"
  - "[GitLab](#gitlab)"
  - "[GCP](#google-cloud)"
  - "[SQL](#sql)"
  - "[Excel](#excel)"
  - "[VBA](#vba)"
  - "[Google Sheets](#google-sheets)"
  - "[Google Apps Script](#google-apps-script)"
  - "[NeoDash](#neodash)"
  - "[RLE International](#rle-international)"
  - "[Adele Donaldson-Logan](#adele-donaldson-logan)"
  - "[Elena Kohlwey](#elena-kohlwey)"
  - "[Karsten Maylahn](#karsten-maylahn)"
  - "[Luke Bangs](#luke-bangs)"
  - "[Work](#work)"
  - "[Digital Engineering](#digital-engineering)"
---
# SDP

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

Scalable Development Plan to automatically building a full development timing plan based on a number of inputs.

Worked on this project with [Elena Kohlwey](#elena-kohlwey), [Karsten Maylahn](#karsten-maylahn), [Uwe Kloss](#uwe-kloss) and [Adele Donaldson-Logan](#adele-donaldson-logan).

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [Java](#01-notes/02-areas/work-notes/skills-notes/languages/java)/[React](#react)
- Back end/Datasource: [Neo4j](#neo4j), [Cypher](#cypher), [Java](#01-notes/02-areas/work-notes/skills-notes/languages/java), [SQL](#sql), [Excel](#excel), [VBA](#vba), [Google Sheets](#google-sheets), [Google Apps Script](#google-apps-script)
- Hosting: [GitLab](#gitlab) (see [Repositories](#repositories))
- Security: n/a
- Authentication: [GCP](#google-cloud)

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

- The planning and design of the frontend was done before I joined the project as we mainly developed the later apps to match the styling of the initial prototype.

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [SDP Acronyms](#sdp-acronyms)
- [SDP Encyclopaedia](#sdp-encyclopaedia)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

I was fully in charge of the [SQL](#sql) backend database, meaning I had to learn how to write [SQL](#sql) queries. I optimised this by storing the data that we collected day to day in [Excel](#excel) and then writing a [VBA](#vba) script to automate creating the [SQL](#sql) queries to update the database quickly.

This lead to a complete rebuild when our company migrated from [Microsoft](#microsoft) to [Google](#google), meaning I had to migrate the data and automations into [Google Sheets](#google-sheets) and use [Google Apps Script](#google-apps-script).

There was a brief period where we began consider rebuilding the frontend in [React](#react) and as such, I was involved in discussing the requirements and helping with the interview process, although the development of this stopped relatively quickly when the whole project was scaled back.

As well as the main app, we also developed several [NeoDash](#neodash) dashboards off of the [Neo4j](#neo4j) data for ongoing maintenance to check on the data.

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