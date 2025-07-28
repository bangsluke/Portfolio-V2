---
tags:
  - project
  - portfolio
  - notes
  - project/completed/work
  - coding
  - work
created: 2025-05-30 09:57
modified: 2025-07-28T07:35:11+01:00
aliases:
  - interview-test Repo
viewCount: 19
projectURL: TBC
codeURL: https://github.com/bangsluke/interview-test
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: n/a
imageURL: 
dateStart: 2022-05-01
dateEnd: 2022-05-31
technologies:
  - "[[React]]"
  - "[[GitHub]]"
  - "[[Snyk]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Uwe Kloss]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 8
shortDescription: "An interview test written for possibly hiring a <span class=\"theme-link\">RLE</span> with <span class=\"theme-link\">Uwe Kloss</span>."
longDescription: "A simple <span class=\"theme-link\">React</span> website that contained several <span class=\"theme-link\">React</span> development challenges for giving to potential hires to test their skills within the interview process.\nThe site was provided to a few possible <span class=\"theme-link\">RLE India</span> potential hires when considering upgrading the <a href=\"/portfolio/projects/SDP\" class=\"theme-link\">SDP</a> front end to <span class=\"theme-link\">React</span>."
lessonsLearned: "This project mainly challenged me to consider what requirements we needed within our <a href=\"/portfolio/projects/SDP\" class=\"theme-link\">SDP</a> project that would challenge possible developers and design a quick test that was clearly documented for remote completion and submission."
name: "Interview Test Repo"
---

# Interview Test Repo

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

An interview test written for possibly hiring a <span class="theme-link">RLE</span> with <span class="theme-link">Uwe Kloss</span>.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A simple <span class="theme-link">React</span> website that contained several <span class="theme-link">React</span> development challenges for giving to potential hires to test their skills within the interview process.

The site was provided to a few possible <span class="theme-link">RLE India</span> potential hires when considering upgrading the <a href="/portfolio/projects/SDP" class="theme-link">SDP</a> front end to <span class="theme-link">React</span>.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="theme-link">React</span>
- Back end/Datasource: n/a
- Hosting: <span class="theme-link">GitHub</span> (see [Repositories](#repositories))
- Security: <span class="theme-link">Snyk</span>
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

- <span class="theme-link">Digital Engineering</span>

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project mainly challenged me to consider what requirements we needed within our <a href="/portfolio/projects/SDP" class="theme-link">SDP</a> project that would challenge possible developers and design a quick test that was clearly documented for remote completion and submission.

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