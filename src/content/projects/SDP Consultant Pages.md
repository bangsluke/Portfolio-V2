---
tags:
  - project
  - portfolio
  - notes
  - project/completed/work
  - coding
  - work
created: 2025-06-02 17:16
modified: 2025-07-19T10:10:51+01:00
aliases:
  - SDP Dev Sites
viewCount: 16
projectURL: https://sdp-dev-sites.netlify.app/pages/sdp-acronyms
codeURL: TBC
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/sdp-dev-sites/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.imgur.com/GoZ1rp5.png
dateStart: ""
dateEnd: ""
technologies:
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[JavaScript]]"
  - "[[GitLab]]"
  - "[[Azure]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Uwe Kloss]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[SDP]]"
  - "[[Work]]"
  - "[[Digital Engineering]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 4
---

# SDP Consultant Pages

> [!back] Link back to <span class="theme-link">Projects</span>

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

A site for the consultants working with the tool, showing the acronyms and definitions used across the <span class="theme-link">RLE</span> and also by clients. The site also included pages dedicated to documentation of the tool and providing an encyclopaedia of the terms used.

The <span class="theme-link">SDP</span>

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Provided good learning for getting correct anchor points in <span class="theme-link">HTML</span> for jumping to the correct acronym letters. Also pushed me to colour and gap match to the main <a href="/portfolio/projects/SDP" class="theme-link">SDP</a> tool to provide a visual connection.

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