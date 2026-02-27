---
tags:
  - project
  - portfolio
  - notes
  - work
  - project/completed/work
  - coding
created: 2025-05-29 18:05
modified: 2026-01-30T15:03:16+00:00
aliases:
  - DVP Prototype
viewCount: 21
projectURL: https://dvp-fe.icypebble-0bf96993.germanywestcentral
codeURL: https://git.rle.de/DigitalEngineering/externalpocs/dvp
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: n/a
imageURL: https://i.postimg.cc/7LFpnZsJ/DVP-Tool.png
dateStart: 2022-06-01
dateEnd: 2022-12-31
technologies:
  - "[[JavaScript]]"
  - "[[Neo4j]]"
  - "[[GitLab]]"
  - "[[Azure]]"
  - "[[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]]"
  - "[[Cypress]]"
  - "[[VS Code]]"
  - "[[npm]]"
  - "[[React]]"
  - "[[Next.js]]"
  - "[[Nest.JS]]"
  - "[[Postman]]"
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
powerShellAlias: dvp
version: 1
portfolioOrder: 2
shortDescription: "Designed and shipped a web-based tool as a demonstration of using <span class=\"theme-link\">Neo4j</span> graphs for running optimisation calculations for <span class=\"theme-link\">DVP</span>'s the Automotive industry."
longDescription: "<span class=\"theme-link\">RLE</span>'s <span class=\"theme-link\">DVP</span> tool was a working demonstration tool for how problems such as automatically generating a vehicle <span class=\"theme-link\">DVP</span> could be done from inputs and running optimisation algorithms to generate a Pareto curve of the importance of each input.<br><br>I was the sole front end developer on this project, selecting <span class=\"theme-link\">Next.js</span> as a suitable framework based on it's folder based routing system to pair well with the multiple page architecture of the <span class=\"theme-link\">DVP</span> prototype. I then integrated 3D visualisation libraries into the app to demonstrate the 3D data received from the <span class=\"theme-link\">Java</span> and <span class=\"theme-link\">Neo4j</span> calculations."
lessonsLearned: "The lessons learned for me were mainly in data visualisation in the front end, as I received various data points from the backend <span class=\"theme-link\">Neo4j</span> and <span class=\"theme-link\">Java</span> calculations and had to plot the results on a 3D graph to best demonstrate the tradeoffs between results, allowing the user to select the floating 3D point and see the data inputs behind its generation.<br><br>It also taught me a lot about passing large objects of states from one page to the next through <span class=\"theme-link\">React</span>."
name: "DVP Tool"
---
# DVP Tool

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

Designed and shipped a web-based tool as a demonstration of using [[Neo4j]] graphs for running optimisation calculations for [[DVP]]'s the Automotive industry.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

[[RLE International|RLE]]'s [[DVP]] tool was a working demonstration tool for how problems such as automatically generating a vehicle [[DVP]] could be done from inputs and running optimisation algorithms to generate a Pareto curve of the importance of each input.

I was the sole front end developer on this project, selecting [[Next.js]] as a suitable framework based on it's folder based routing system to pair well with the multiple page architecture of the [[DVP]] prototype. I then integrated 3D visualisation libraries into the app to demonstrate the 3D data received from the [[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]] and [[Neo4j]] calculations.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[React]], [[JavaScript]], [[Next.js]]
- Back end/Datasource: [[Nest.JS]], [[Neo4j]], [[Cypher]], [[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]]
- Hosting: [[GitLab]] (see [Repositories](#repositories))
- Security: n/a
- Authentication: [[Azure]]

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

- The main template of the frontend was a Berry Material [[UI]] template

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Digital Engineering GitLab](https://git.rle.de/DigitalEngineering)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The lessons learned for me were mainly in data visualisation in the front end, as I received various data points from the backend [[Neo4j]] and [[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]] calculations and had to plot the results on a 3D graph to best demonstrate the tradeoffs between results, allowing the user to select the floating 3D point and see the data inputs behind its generation.

It also taught me a lot about passing large objects of states from one page to the next through [[React]].

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