---
tags:
  - project
  - portfolio
  - notes
  - project/archived
  - sport
  - coding
  - Dorkinians Mobile Stats
  - "[React](#react)"
  - "[Google Sheets](#google-sheets)"
  - "[GitHub](#github)"
  - "[Netlify](#netlify)"
  - "[Synk](#synk)"
  - "[Dorkinians FC](#dorkinians-fc)"
  - "[Luke Bangs](#luke-bangs)"
  - "[Dorkinians FC](#dorkinians-fc)"
  - "[Football](#football)"
---
# Dorkinians Mobile Site

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

A note for storing details on an accessible mobile stats site for [Dorkinians FC](#dorkinians-fc).

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A quick access filterable stats site for [Dorkinians](#dorkinians-fc) players.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

After creating the initial [Dorkinians Website](#dorkinians-website), I would regularly be asked by players “But how many goals were just in cup games/not friendlies/just league?” Etc etc.

I therefore decided to play around with creating a filterable site so that players could answer these questions themselves.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [React](#react)
- Back end/Datasource: [Google Sheets](#google-sheets)
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
- Some designs sketched out on paper

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- https://dorkinians-mobile-stats.netlify.app/main
- https://github.com/bangsluke/mobile-stats-dorkinians
- [Dorkinians Website](#dorkinians-website)
- [Dorkinians Website V2](#dorkinians-website-v2)
- [Todoist](#todoist) Lists
	- [Dorkinians Mobile Site](https://todoist.com/showTask?id=6496470356&sync_id=6506077820)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project let me design my first filter [UI](#ui) popup using [React](#react) and taught me methods of filtering the data received from the back end.

I also tried out a new [API](#api) method of retrieving data to the front end from [Google Sheets](#google-sheets), using their available method instead of parsing generated [CSV](#csv) data like I did on the [Dorkinians Website](#dorkinians-website).

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