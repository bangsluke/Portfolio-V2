---
tags:
  - project
  - portfolio
  - notes
  - project/completed
  - finances
created: 2024-03-02T09:21:00
modified: 2025-07-20T13:08:51+01:00
aliases:
  - SoL
viewCount: 15
projectURL: https://docs.google.com/spreadsheets/d/114gu85xbOJppMf3JIuHzoWIVsWAcy3ALmdv0owwyCQ0/edit?usp=sharing
codeURL: https://script.google.com/home/projects/1e_U-ujneCBoYpGoZVAPtSYR9wI2StLhy4gLbL6t946wAJVTjDdAhn9xs/edit
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: https://drive.google.com/drive/folders/1SQmATVMjxHXU8CsuSeGh_3suXXTxC_Nf?usp=drive_link
logoURL: n/a
imageURL: https://i.imgur.com/r0wyTKP.png
dateStart: 2020-07-18
dateEnd: 2025-06-20
technologies:
  - "[[Google Sheets]]"
  - "[[Google Apps Script]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Finances]]"
powerShellAlias: n/a
version: 3.1
portfolioOrder: 3
shortDescription: "A <span class=\"theme-link\">Google Sheets</span> file that I use to collate all my key details on which is mainly financial data but is also used as the data source for health data such as steps to produce my daily, weekly and monthly summary emails to myself using <span class=\"theme-link\">Google Apps Script</span>."
longDescription: "The Spreadsheet of Life (or SoL for short) is the backbone of my finances, holding data for helping me with all my financial decisions.<br><br>It is an ever expanding <span class=\"theme-link\">Google Sheets</span> file that I use to take snapshots of my daily, weekly and monthly finances which is then summarised to me each day through automated emails, run through <span class=\"theme-link\">Google Apps Script</span>.<br><br>SoL also contains health data such as distance traveled, steps and fluid intake which I send each evening from my phone to the file via <span class=\"theme-link\">Apple Shortcuts</span>."
lessonsLearned: "The Spreadsheet of Life was my first real introduction to <span class=\"theme-link\">JavaScript</span>, via <span class=\"theme-link\">Google Apps Script</span>, allowing me to generate daily emails to myself. This also brought up several challenges such as storing snapshots of generated graphs within the file to be sent which I achieved using temporary storage in <span class=\"theme-link\">Google Drive</span>.<br><br>It also taught me the full power of <span class=\"theme-link\">API</span>s from an early stage, allowing me to populate the sheet remotely from using <span class=\"theme-link\">Apple Shortcuts</span> on my iPhone."
name: "Spreadsheet of Life"
---
# Spreadsheet of Life

> [!back] Link back to [[01 Projects|Projects]]

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

A [[Google Sheets]] file that I use to collate all my key details on which is mainly financial data but is also used as the data source for health data such as steps to produce my daily, weekly and monthly summary emails to myself using [[Google Apps Script]].

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The Spreadsheet of Life (or SoL for short) is the backbone of my finances, holding data for helping me with all my financial decisions.

It is an ever expanding [[Google Sheets]] file that I use to take snapshots of my daily, weekly and monthly finances which is then summarised to me each day through automated emails, run through [[Google Apps Script]].

SoL also contains health data such as distance traveled, steps and fluid intake which I send each evening from my phone to the file via [[Apple Shortcuts]].

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Google Sheets]]
- Back end/Datasource: [[Google Apps Script]]/[[Google Sheets]]
- Hosting: [[Google Sheets]]
- Security: [[Google Sheets]]
- Authentication: [[Google Sheets]]

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

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [SoL v3.0 - Google Sheet](https://docs.google.com/spreadsheets/d/114gu85xbOJppMf3JIuHzoWIVsWAcy3ALmdv0owwyCQ0/edit?usp=sharing)
- [SoL v3.0 - Apps Script](https://script.google.com/home/projects/1e_U-ujneCBoYpGoZVAPtSYR9wI2StLhy4gLbL6t946wAJVTjDdAhn9xs/edit)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The Spreadsheet of Life was my first real introduction to [[JavaScript]], via [[Google Apps Script]], allowing me to generate daily emails to myself. This also brought up several challenges such as storing snapshots of generated graphs within the file to be sent which I achieved using temporary storage in [[Google Drive]].

It also taught me the full power of [[API]]s from an early stage, allowing me to populate the sheet remotely from using [[Apple Shortcuts]] on my iPhone.

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