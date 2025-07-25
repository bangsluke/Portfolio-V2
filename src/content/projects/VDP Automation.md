---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
created: 2025-07-24T16:02:00
modified: 2025-07-24T16:12:53+01:00
viewCount: 2
aliases: 
projectURL: n/a
codeURL: n/a
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: TBC
logoURL: TBC
imageURL: TBC
dateStart: 2023-11-22
dateEnd: 2024-02-19
technologies:
  - "[[VBA]]"
  - "[[Excel]]"
  - "[[PowerPoint]]"
  - "[[Visio]]"
  - "[[Python]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
  - "[[CEER Automotive]]"
toolOwner: "[[Ian Digman]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[Centre of Excellence|CoE]]"
  - Tools
powerShellAlias: n/a
version: 1
portfolioOrder: 4
shortDescription: "Automation of generating populated <span class=\"theme-link\">PowerPoint</span> and <span class=\"theme-link\">Visio</span> slides from an <span class=\"theme-link\">Excel</span> data source."
longDescription: "The VDP Automation project was an <span class=\"theme-link\">Excel</span> based data source populated with Automotive deliverables and processes by consultants within <span class=\"theme-link\">RLE International</span>, which then had scripts written by me to run through the data and generate hyperlinked and navigable <span class=\"theme-link\">PowerPoint</span> slides showing workflows, whilst simultaneously generating <span class=\"theme-link\">Visio</span> workflows and an exported PDF for mapping out a full Automotive workflow process for the development of a vehicle.\nThe tool was successful enough to be utilised by a new start-up Automotive company in defining their deliverable and process documentation providing me an opportunity to travel to <span class=\"theme-link\">Saudi Arabia</span> in the process."
lessonsLearned: "This project taught me a lot about working with the object libraries within <span class=\"theme-link\">PowerPoint</span> and <span class=\"theme-link\">Visio</span> within the <span class=\"theme-link\">VBA</span> environment. It also gave me a great comparison of how powerful <span class=\"theme-link\">Python</span> can be when I was able to re-write a section of my code from <span class=\"theme-link\">VBA</span> to <span class=\"theme-link\">Python</span> and run the script in less than a tenth of the time."
name: "VDP Automation"
---

# VDP Automation

> [!back] Link back to <span class="theme-link">Projects</span>

> VDP - TBC what it stands for (Vehicle Development Plan?)

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

Automation of generating populated <span class="theme-link">PowerPoint</span> and <span class="theme-link">Visio</span> slides from an <span class="theme-link">Excel</span> data source.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The VDP Automation project was an <span class="theme-link">Excel</span> based data source populated with Automotive deliverables and processes by consultants within <span class="theme-link">RLE International</span>, which then had scripts written by me to run through the data and generate hyperlinked and navigable <span class="theme-link">PowerPoint</span> slides showing workflows, whilst simultaneously generating <span class="theme-link">Visio</span> workflows and an exported PDF for mapping out a full Automotive workflow process for the development of a vehicle.

The tool was successful enough to be utilised by a new start-up Automotive company in defining their deliverable and process documentation providing me an opportunity to travel to <span class="theme-link">Saudi Arabia</span> in the process.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="theme-link">PowerPoint</span>, <span class="theme-link">Visio</span>
- Back end/Datasource: <span class="theme-link">Excel</span>, <span class="theme-link">VBA</span>, <span class="theme-link">Python</span>
- Hosting: n/a
- Security: <span class="theme-link">VBA</span>
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the <span class="theme-link">PowerShell</span> alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project taught me a lot about working with the object libraries within <span class="theme-link">PowerPoint</span> and <span class="theme-link">Visio</span> within the <span class="theme-link">VBA</span> environment. It also gave me a great comparison of how powerful <span class="theme-link">Python</span> can be when I was able to re-write a section of my code from <span class="theme-link">VBA</span> to <span class="theme-link">Python</span> and run the script in less than a tenth of the time.

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