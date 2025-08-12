---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
modified: 2025-08-12T11:54:36+01:00
viewCount: 10
aliases:
  - Sales Chatbot
projectURL: https://rle-sales-details.netlify.app/
codeURL: https://github.com/bangsluke/rle-sales-details
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/rle-sales-details/overview
folderURL: n/a
logoURL: https://i.imgur.com/13pPwzp.png
imageURL: https://i.imgur.com/yJOei4e.png
dateStart: 2023-04-01
dateEnd: 2023-04-30
technologies:
  - "[[Vite.js]]"
  - "[[OpenAI]]"
  - "[[React]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Dominic Ede]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[GPMO]]"
  - "[[AI]]"
  - "[[RFQ]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 5
shortDescription: "A chat bot that takes on content such as an <span class=\"theme-link\">RFQ</span> block of text and then allows the user to query the text via chat."
longDescription: "A simple website, demonstrating the power of integrating <span class=\"theme-link\">AI</span> into Automotive processes and day to day workflows, providing a simple interface for using a chat bot for quickly summarising the content of an <span class=\"theme-link\">RFQ</span> or querying information or extractions of logic from it."
lessonsLearned: "This project was a test of using <span class=\"theme-link\">OpenAI</span>'s <span class=\"theme-link\">API</span> and the setup process involving tokens and cost behind it.<br><br>It also was my first integration of a chat bot component into a project."
name: "RLEGPT"
---
# RLEGPT

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

A chat bot that takes on content such as an [[RFQ]] block of text and then allows the user to query the text via chat.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A simple website, demonstrating the power of integrating [[AI]] into Automotive processes and day to day workflows, providing a simple interface for using a chat bot for quickly summarising the content of an [[RFQ]] or querying information or extractions of logic from it. 

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[React]], [[Vite.js]]
- Back end/Datasource: [[OpenAI]]
- Hosting: [[GitHub]] (see [Repositories](#repositories))
- Security: n/a
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

- [[GPMO]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project was a test of using [[OpenAI]]'s [[API]] and the setup process involving tokens and cost behind it.

It also was my first integration of a chat bot component into a project.

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