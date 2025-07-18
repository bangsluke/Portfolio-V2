---
tags:
  - project
  - portfolio
  - notes
  - work
  - project/completed
  - coding
created: 2025-05-29 17:59
modified: 2025-07-11T15:55:54+01:00
aliases: 
viewCount: 14
projectURL: https://bangsluke-portfolio.netlify.app/
codeURL: https://github.com/bangsluke/Portfolio
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/bangsluke-portfolio-v1/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.imgur.com/fMd3zzE.png
dateStart: 2022-04-09
dateEnd: 2024-02-02
technologies:
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[JavaScript]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Synk]]"
projectCategory: Portfolio
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 3
shortDescription: "The portfolio site was my initial attempt at creating a marketing page for myself as a developer, showcasing my skills and contact information."
longDescription: "The portfolio site showcased all the information I believed to be relevant for possible hirers, clients or collaborators, providing details on my ambitions, my self-assessed skill level in several languages and technologies, my education and former work experience and finally my contact details."
lessonsLearned: "The key lesson learned for this project was how useful it is to create re-usable components for a site - a skill I only began using after building this site. As such, this site became a challenge to maintain and ultimately broke, leading me to the decision to rebuild it entirely."
---
# Portfolio Site

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

## Introduction

A note for storing ideas on building the first version of my Portfolio site.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

The portfolio site was my initial attempt at creating a marketing page for myself as a developer, showcasing my skills and contact information.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The portfolio site showcased all the information I believed to be relevant for possible hirers, clients or collaborators, providing details on my ambitions, my self-assessed skill level in several languages and technologies, my education and former work experience and finally my contact details.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[HTML]], [[CSS]] and [[JavaScript]]
- Back end/Datasource: n/a
- Hosting: [[GitHub]] (see [Repositories](#repositories)), [[Netlify]]
- Security: [[Synk]]
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a
- [[Netlify]]: https://app.netlify.com/projects/bangsluke-portfolio-v1/overview

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [[PowerShell]] alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- For page headers, use the below / style for each page.
- Also add the language bubble tags for each project

![[20231009 PageHeaderInspiration.jpeg]]

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Portfolio Site page Todoist list](https://todoist.com/showTask?id=5773759872&sync_id=6506087454)
- [[Portfolio Card]]
- [[Portfolio Site V2]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The key lesson learned for this project was how useful it is to create re-usable components for a site - a skill I only began using after building this site. As such, this site became a challenge to maintain and ultimately broke, leading me to the decision to rebuild it entirely.

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