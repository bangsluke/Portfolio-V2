---
tags:
  - project
  - portfolio
  - notes
  - SDP
created: 2025-06-27 10:45
modified: 2026-02-16T07:40:47+00:00
aliases:
  - Scalable Development Plan
viewCount: 22
projectURL: https://sdp.labs.rle.de/sdpweb/
codeURL: https://git.rle.de/sdp/sdp-3
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: https://rleint.sharepoint.com/sites/SDP-Titans/Freigegebene%20Dokumente/Forms/AllItems.aspx
logoURL: n/a
imageURL: https://i.postimg.cc/hGkH1tyG/SDP.png
dateStart: 2019-07-01
dateEnd: 2022-05-30
technologies:
  - "[[Neo4j]]"
  - "[[Cypher]]"
  - "[[GitLab]]"
  - "[[SQL]]"
  - "[[Excel]]"
  - "[[VBA]]"
  - "[[Google Sheets]]"
  - "[[Google Apps Script]]"
  - "[[NeoDash]]"
  - "[[Google Cloud]]"
  - "[[C++]]"
  - "[[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]]"
  - "[[VS Code]]"
  - "[[React]]"
  - "[[Docker]]"
  - "[[Kubernetes]]"
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
shortDescription: "Developed a scalable development planning tool using graph technology, dropping the planning timing for Automotive projects from months to days."
longDescription: "SDP - Scalable Development Plan - was an internal tool developed within <span class=\"theme-link\">RLE International</span> that brought together the various automotive process knowledge that the company had gathered over years of work with various <span class=\"theme-link\">OEMs</span>.<br><br>It was a web application that gathered project inputs from users and could then calculate a full project timing plan, split across various swimlanes for the given project details. After this, users could further update the plan within the tool to fully align it to their own expectations or export the data for using in external tools such as <span class=\"theme-link\">Microsoft Project</span>.<br><br>I was involved in collating the data and architecting a method of storing it. I gathered the data by conducting  interviews with technical specialists and mapping their defined process into whiteboard drawings which I later exported into <span class=\"theme-link\">Excel</span> in a custom built file with <span class=\"theme-link\">VBA</span> scripts to support the large datasets. The scripts also processed the data into an <span class=\"theme-link\">SQL</span> database, ready to be consumed by the <span class=\"theme-link\">Java</span> code for the calculations."
lessonsLearned: "I was fully in charge of the <span class=\"theme-link\">SQL</span> backend database, meaning I had to learn how to write <span class=\"theme-link\">SQL</span> queries. I optimised this by storing the data that we collected day to day in <span class=\"theme-link\">Excel</span> and then writing a <span class=\"theme-link\">VBA</span> script to automate creating the <span class=\"theme-link\">SQL</span> queries to update the database quickly.<br><br>This lead to a complete rebuild when our company migrated from <span class=\"theme-link\">Microsoft</span> to <span class=\"theme-link\">Google</span>, meaning I had to migrate the data and automations into <span class=\"theme-link\">Google Sheets</span> and use <span class=\"theme-link\">Google Apps Script</span>.<br><br>There was a brief period where we began consider rebuilding the frontend in <span class=\"theme-link\">React</span> and as such, I was involved in discussing the requirements and helping with the interview process, although the development of this stopped relatively quickly when the whole project was scaled back.<br><br>As well as the main app, we also developed several <span class=\"theme-link\">NeoDash</span> dashboards off of the <span class=\"theme-link\">Neo4j</span> data for ongoing maintenance to check on the data, teaching me about this tool and getting me further involved with writing <span class=\"theme-link\">Cypher</span> queries."
name: "SDP"
---
# SDP

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

Developed a scalable development planning tool using graph technology, dropping the planning timing for Automotive projects from months to days.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

SDP - Scalable Development Plan - was an internal tool developed within [[RLE International]] that brought together the various automotive process knowledge that the company had gathered over years of work with various [[OEMs]].

It was a web application that gathered project inputs from users and could then calculate a full project timing plan, split across various swimlanes for the given project details. After this, users could further update the plan within the tool to fully align it to their own expectations or export the data for using in external tools such as [[Project|Microsoft Project]].

I was involved in collating the data and architecting a method of storing it. I gathered the data by conducting  interviews with technical specialists and mapping their defined process into whiteboard drawings which I later exported into [[Excel]] in a custom built file with [[VBA]] scripts to support the large datasets. The scripts also processed the data into an [[SQL]] database, ready to be consumed by the [[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]] code for the calculations.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]]/[[React]]
- Back end/Datasource: [[Neo4j]], [[Cypher]], [[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]], [[SQL]], [[Excel]], [[VBA]], [[Google Sheets]], [[Google Apps Script]]
- Hosting: [[GitLab]] (see [Repositories](#repositories))
- Security: n/a
- Authentication: [[Google Cloud|GCP]]

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

- The planning and design of the frontend was done before I joined the project as we mainly developed the later apps to match the styling of the initial prototype.

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [SDP GitLab](https://git.rle.de/sdp)
- [[SDP Consultant Pages]]
- [Digital Engineering GitLab](https://git.rle.de/DigitalEngineering)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

I was fully in charge of the [[SQL]] backend database, meaning I had to learn how to write [[SQL]] queries. I optimised this by storing the data that we collected day to day in [[Excel]] and then writing a [[VBA]] script to automate creating the [[SQL]] queries to update the database quickly.

This lead to a complete rebuild when our company migrated from [[Microsoft]] to [[Google]], meaning I had to migrate the data and automations into [[Google Sheets]] and use [[Google Apps Script]].

There was a brief period where we began consider rebuilding the frontend in [[React]] and as such, I was involved in discussing the requirements and helping with the interview process, although the development of this stopped relatively quickly when the whole project was scaled back.

As well as the main app, we also developed several [[NeoDash]] dashboards off of the [[Neo4j]] data for ongoing maintenance to check on the data, teaching me about this tool and getting me further involved with writing [[Cypher]] queries.

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