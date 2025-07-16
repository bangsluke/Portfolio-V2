---
tags:
  - project
  - portfolio
  - notes
  - project/completed
  - finances
  - SoL
  - "[Google](#google)"
  - "[Google Sheets](#google-sheets)"
  - "[Google Apps Script](#google-apps-script)"
  - n/a
  - "[Luke Bangs](#luke-bangs)"
  - "[Finances](#finances)"
---
# Spreadsheet of Life

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

A summary of my life, mainly involving finances but also pulling in data about my life.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A [Google Sheets](#google-sheets) file that I use to collate all my key details on which is mainly financial data but is also used as the data source for health data such as steps to produce my daily, weekly and monthly summary emails to myself using [Google Apps Script](#google-apps-script).

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The Spreadsheet of Life (or SoL for short) is the backbone of my finances, holding data for helping me with all my financial decisions.

It is an ever expanding [Google Sheets](#google-sheets) file that I use to take snapshots of my daily, weekly and monthly finances which is then summarised to me each day through automated emails, run through [Google Apps Script](#google-apps-script).

SoL also contains health data such as distance traveled, steps and fluid intake which I send each evening from my phone to the file via [Apple Shortcuts](#apple-shortcuts).

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [Google Sheets](#google-sheets)
- Back end/Datasource: [Google Apps Script](#google-apps-script)/[Google Sheets](#google-sheets)
- Hosting: [Google](#google)
- Security: [Google](#google)
- Authentication: [Google](#google)

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

- [SoL v3.0 - Google Sheet](https://docs.google.com/spreadsheets/d/114gu85xbOJppMf3JIuHzoWIVsWAcy3ALmdv0owwyCQ0/edit?usp=sharing)
- [SoL v3.0 - Apps Script](https://script.google.com/home/projects/1e_U-ujneCBoYpGoZVAPtSYR9wI2StLhy4gLbL6t946wAJVTjDdAhn9xs/edit)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The Spreadsheet of Life was my first real introduction to [JavaScript](#javascript), via [Google Apps Script](#google-apps-script), allowing me to generate daily emails to myself. This also brought up several challenges such as storing snapshots of generated graphs within the file to be sent which I achieved using temporary storage in [Google Drive](#google-drive).

It also taught me the full power of [API](#api)s from an early stage, allowing me to populate the sheet remotely from using [Apple Shortcuts](#apple-shortcuts) on my iPhone.

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