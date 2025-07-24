---
tags:
  - project
  - portfolio
  - notes
created: 2025-06-27 10:45
modified: 2025-07-22T09:21:04+01:00
aliases:
  - Scalable Development Plan
viewCount: 14
projectURL: TBC
codeURL: TBC
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: n/a
imageURL: 
dateStart: 2019-07-01
dateEnd: 2022-05-30
technologies:
  - "[[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]]"
  - "[[React]]"
  - "[[Neo4j]]"
  - "[[Cypher]]"
  - "[[GitLab]]"
  - "[[Google Cloud|GCP]]"
  - "[[SQL]]"
  - "[[Excel]]"
  - "[[VBA]]"
  - "[[Google Sheets]]"
  - "[[Google Apps Script]]"
  - "[[NeoDash]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Uwe Kloss]]"
developers:
  - "[[Adele Donaldson-Logan]]"
  - "[[Elena Kohlwey]]"
  - "[[Karsten Maylahn]]"
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[Digital Engineering]]"
powerShellAlias: n/a
version: 3
portfolioOrder: 3
shortDescription: "Scalable Development Plan to automatically building a full development timing plan based on a number of inputs.\nTBC"
longDescription: "TBC"
lessonsLearned: "TBC\nI was fully in charge of the <span class=\"theme-link\">SQL</span> backend database, meaning I had to learn how to write <span class=\"theme-link\">SQL</span> queries. I optimised this by storing the data that we collected day to day in <span class=\"theme-link\">Excel</span> and then writing a <span class=\"theme-link\">VBA</span> script to automate creating the <span class=\"theme-link\">SQL</span> queries to update the database quickly.\nThis lead to a complete rebuild when our company migrated from <span class=\"theme-link\">Microsoft</span> to <span class=\"theme-link\">Google</span>, meaning I had to migrate the data and automations into <span class=\"theme-link\">Google Sheets</span> and use <span class=\"theme-link\">Google Apps Script</span>.\nThere was a brief period where we began consider rebuilding the frontend in <span class=\"theme-link\">React</span> and as such, I was involved in discussing the requirements and helping with the interview process, although the development of this stopped relatively quickly when the whole project was scaled back.\nAs well as the main app, we also developed several <span class=\"theme-link\">NeoDash</span> dashboards off of the <span class=\"theme-link\">Neo4j</span> data for ongoing maintenance to check on the data."
---

# SDP

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

Scalable Development Plan to automatically building a full development timing plan based on a number of inputs.

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="theme-link">Java</span>/<span class="theme-link">Java</span>, <span class="theme-link">GCP</span>

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

- The planning and design of the frontend was done before I joined the project as we mainly developed the later apps to match the styling of the initial prototype.

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- <a href="/portfolio/projects/SDP Consultant Pages" class="theme-link">SDP Consultant Pages</a>

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

I was fully in charge of the <span class="theme-link">SQL</span> backend database, meaning I had to learn how to write <span class="theme-link">SQL</span> queries. I optimised this by storing the data that we collected day to day in <span class="theme-link">Excel</span> and then writing a <span class="theme-link">VBA</span> script to automate creating the <span class="theme-link">SQL</span> queries to update the database quickly.

This lead to a complete rebuild when our company migrated from <span class="theme-link">Microsoft</span> to <span class="theme-link">Google</span>, meaning I had to migrate the data and automations into <span class="theme-link">Google Sheets</span> and use <span class="theme-link">Google Apps Script</span>.

There was a brief period where we began consider rebuilding the frontend in <span class="theme-link">React</span> and as such, I was involved in discussing the requirements and helping with the interview process, although the development of this stopped relatively quickly when the whole project was scaled back.

As well as the main app, we also developed several <span class="theme-link">NeoDash</span> dashboards off of the <span class="theme-link">Neo4j</span> data for ongoing maintenance to check on the data.

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