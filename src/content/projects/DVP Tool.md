---
tags:
  - project
  - portfolio
  - notes
  - work
  - project/completed/work
  - coding
created: 2025-05-29 18:05
modified: 2025-07-19T09:58:59+01:00
aliases:
  - DVP Prototype
viewCount: 14
projectURL: https://dvp-fe.icypebble-0bf96993.germanywestcentral
codeURL: TBC
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: n/a
imageURL: 
dateStart: ""
dateEnd: ""
technologies:
  - "[[React]]"
  - "[[JavaScript]]"
  - "[[Neo4j]]"
  - "[[GitLab]]"
  - "[[Azure]]"
  - "[[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]]"
  - "[[Next.js]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Uwe Kloss]]"
developers:
  - "[[Elena Kohlwey]]"
  - "[[Kevin Tim Gruner]]"
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[DVP]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 3
shortDescription: "The <span class=\"theme-link\">DVP</span> project was a short demonstration of using <span class=\"theme-link\">Neo4j</span> graphs for running optimisation calculations for the Automotive industry."
longDescription: "<span class=\"theme-link\">RLE</span>’s <span class=\"theme-link\">DVP</span> tool was a working demonstration tool for how problems such as automatically generating a vehicle <span class=\"theme-link\">DVP</span> could be done from inputs and running optimisation algorithms to generate a Pareto curve of the importance of each input."
lessonsLearned: "The lessons learned for me were mainly in data visualisation in the front end, as I received various data points from the backend <span class=\"theme-link\">Java</span> calculations and had to plot the results on a 3D graph to best demonstrate the tradeoffs between results, allowing the user to select the floating 3D point and see the data inputs behind its generation.\nIt also taught me a lot about passing large objects of states from one page to the next."
---

# DVP Tool

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

The <span class="theme-link">RLE</span>’s <span class="theme-link">Java</span>
- Hosting: <span class="theme-link">Java</span> calculations and had to plot the results on a 3D graph to best demonstrate the tradeoffs between results, allowing the user to select the floating 3D point and see the data inputs behind its generation.

It also taught me a lot about passing large objects of states from one page to the next.

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