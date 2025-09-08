---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
created: 2025-07-24T16:02:00
modified: 2025-09-08T11:37:38+01:00
viewCount: 3
aliases:
projectURL: https://rleint.sharepoint.com/:x:/r/sites/DeloittePMTool/Shared%20Documents/CEER%20DevPlan.xlsb?d=w96a37936195d4126a22329f260501438&csf=1&web=1&e=Xm5aFR
codeURL: https://git.rle.de/deloitte/deloitte-pm-tool
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: https://rleint.sharepoint.com/sites/DeloittePMTool/Shared%20Documents/Forms/AllItems.aspx
logoURL: n/a
imageURL: https://i.imgur.com/TsQv9Z2.png
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
  - "[[Deloitte]]"
toolOwner: "[[Ian Digman]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[Centre of Excellence|CoE]]"
  - Tools
powerShellAlias: n/a
version: 1
portfolioOrder: 6
shortDescription: "Automation of generating populated <span class=\"theme-link\">PowerPoint</span> and <span class=\"theme-link\">Visio</span> slides from an <span class=\"theme-link\">Excel</span> data source."
longDescription: "The VDP Automation project was an <span class=\"theme-link\">Excel</span> based data source populated with Automotive deliverables and processes by consultants within <span class=\"theme-link\">RLE International</span>, which then had scripts written by me to run through the data and generate hyperlinked and navigable <span class=\"theme-link\">PowerPoint</span> slides showing workflows, whilst simultaneously generating <span class=\"theme-link\">Visio</span> workflows and an exported PDF for mapping out a full Automotive workflow process for the development of a vehicle.<br><br>The tool was successful enough to be utilised by a new start-up Automotive company in defining their deliverable and process documentation providing me an opportunity to travel to <span class=\"theme-link\">Saudi Arabia</span> in the process."
lessonsLearned: "This project taught me a lot about working with the object libraries within <span class=\"theme-link\">PowerPoint</span> and <span class=\"theme-link\">Visio</span> within the <span class=\"theme-link\">VBA</span> environment. It also gave me a great comparison of how powerful <span class=\"theme-link\">Python</span> can be when I was able to re-write a section of my code from <span class=\"theme-link\">VBA</span> to <span class=\"theme-link\">Python</span> and run the script in less than a tenth of the time."
name: "VDP Automation"
---
# VDP Automation

> [!back] Link back to [[01 Projects|Projects]]

> VDP - Vehicle Development Process

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

Automation of generating populated [[PowerPoint]] and [[Visio]] slides from an [[Excel]] data source.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The VDP Automation project was an [[Excel]] based data source populated with Automotive deliverables and processes by consultants within [[RLE International]], which then had scripts written by me to run through the data and generate hyperlinked and navigable [[PowerPoint]] slides showing workflows, whilst simultaneously generating [[Visio]] workflows and an exported PDF for mapping out a full Automotive workflow process for the development of a vehicle.

The tool was successful enough to be utilised by a new start-up Automotive company in defining their deliverable and process documentation providing me an opportunity to travel to [[Saudi Arabia]] in the process.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[PowerPoint]], [[Visio]]
- Back end/Datasource: [[Excel]], [[VBA]], [[Python]]
- Hosting: n/a
- Security: [[VBA]]
- Authentication: n/a

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

- [Deloitte Documents](https://rleint.sharepoint.com/:f:/r/sites/Deloitte/Freigegebene%20Dokumente/General?csf=1&web=1&e=37O9Sy)
- [Excel Generator Tool](https://rleint.sharepoint.com/:f:/r/sites/DeloittePMTool/Shared%20Documents/Excel%20Generator%20Tool?csf=1&web=1&e=lhVeB7)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project taught me a lot about working with the object libraries within [[PowerPoint]] and [[Visio]] within the [[VBA]] environment. It also gave me a great comparison of how powerful [[Python]] can be when I was able to re-write a section of my code from [[VBA]] to [[Python]] and run the script in less than a tenth of the time.

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