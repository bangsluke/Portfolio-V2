---
tags:
  - project
  - notes
  - work
  - portfolio
  - project/completed/work
created: 2026-01-12 15:12
modified: 2026-01-12T16:30:35+00:00
aliases:
viewCount: 3
projectURL: n/a
codeURL: n/a
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: n/a
imageURL: https://bangsluke-assets.netlify.app/images/projects/Bookshelf-Dashboard.png
dateStart: 2025-12-16
dateEnd: 2026-01-07
technologies:
  - "[[Python]]"
  - "[[pip]]"
  - "[[Power BI]]"
  - "[[VBA]]"
  - "[[Excel]]"
  - "[[VS Code]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
  - "[[Ford]]"
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Ford]]"
powerShellAlias: bookshelf
version: 1
portfolioOrder: 5
shortDescription: "A gathering of files and folders from across various team <span class=\"theme-link\">SharePoint</span> sites into a combined <span class=\"theme-link\">Power BI</span> report enabling search and filtering."
longDescription: "This project was built for a vehicle program that was paused where the customer wanted the progress and data saved for possible use again in the future.<br><br>My implemented solution used a <span class=\"theme-link\">VBA</span> script to loop through mapped <span class=\"theme-link\">SharePoint</span> sites and generate a <span class=\"theme-link\">CSV</span> of the sites structure, storing folder and file meta data.<br><br>The <span class=\"theme-link\">CSV</span>s were then passed through a <span class=\"theme-link\">Python</span> script, which used fuzzy matching to generate a set of tags for the files and clean any data ready for the <span class=\"theme-link\">Power BI</span> report.<br><br>A <span class=\"theme-link\">Power BI</span> report was then built to display the various <span class=\"theme-link\">SharePoint</span> data, using filters for site location, tags and file types to allow the user to sift through the data. Users could search the database of folders and files using their own search text and could follow the URL links to the specific item."
lessonsLearned: "This project taught me how to use fuzzy matching with the correct fine tuning to extract usable tags from a list of data.<br><br>It also helped me improve my <span class=\"theme-link\">Power BI</span> skills, ensuring I set up the project from start to finish rather than modifying an existing report as had previously been the case."
name: "Bookshelf Project"
---
# Bookshelf Project

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

A gathering of files and folders from across various team [[SharePoint]] sites into a combined [[Power BI]] report enabling search and filtering.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

This project was built for a vehicle program that was paused where the customer wanted the progress and data saved for possible use again in the future.

My implemented solution used a [[VBA]] script to loop through mapped [[SharePoint]] sites and generate a [[CSV]] of the sites structure, storing folder and file meta data.

The [[CSV]]s were then passed through a [[Python]] script, which used fuzzy matching to generate a set of tags for the files and clean any data ready for the [[Power BI]] report.

A [[Power BI]] report was then built to display the various [[SharePoint]] data, using filters for site location, tags and file types to allow the user to sift through the data. Users could search the database of folders and files using their own search text and could follow the URL links to the specific item.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Power BI]]
- Back end/Datasource: [[SharePoint]], [[VBA]], [[Python]]
- Hosting: [[Microsoft]]
- Security: [[Microsoft]]
- Authentication: [[Microsoft]]

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

- See the physical [[Excel]] and [[Power BI]] report within my Coding Projects folder

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project taught me how to use fuzzy matching with the correct fine tuning to extract usable tags from a list of data.

It also helped me improve my [[Power BI]] skills, ensuring I set up the project from start to finish rather than modifying an existing report as had previously been the case.

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