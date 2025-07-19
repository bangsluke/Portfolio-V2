---
tags:
  - project
  - portfolio
  - notes
  - project/completed
  - coding
created: 2025-05-29 17:09
modified: 2025-07-19T09:59:36+01:00
aliases:
  - Homepage
viewCount: 17
projectURL: https://bangsluke.github.io/Homepage.html
codeURL: https://github.com/bangsluke/bangsluke.github.io
codeMultipleRepos: false
deploymentServiceURL: https://github.com/bangsluke
folderURL: n/a
logoURL: n/a
imageURL: 
dateStart: 2021-01-15
dateEnd: 2021-01-24
technologies:
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[JavaScript]]"
  - "[[GitHub]]"
  - "[[Synk]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - Coding
powerShellAlias: n/a
version: 1
portfolioOrder: 3
shortDescription: "An early site built as a homepage for storing links to all my projects and showing a widget with the weather in my area."
longDescription: "A single point of focus for where the links to all my projects were stored, as well as a weather widget for my area."
lessonsLearned: "Main lesson was understanding and adjusting an existing codebase and learning how to correctly modify an online widget to receive my location and correct styling."
---
# Homepage Website

> [!back] Link back to <p class="mint-link">Projects</p>

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

An early site built as a homepage for storing links to all my projects and showing a widget with the weather in my area.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A single point of focus for where the links to all my projects were stored, as well as a weather widget for my area.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <p class="mint-link">New Tab</p>

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Main lesson was understanding and adjusting an existing codebase and learning how to correctly modify an online widget to receive my location and correct styling.

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