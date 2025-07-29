---
tags:
  - project
  - portfolio
  - notes
  - project/completed
  - coding
created: 2025-05-29 17:42
modified: 2025-07-19T09:38:40+01:00
aliases:
  - New Tab
viewCount: 17
projectURL: https://bangsluke.github.io/pages/NewTab.html
codeURL: https://github.com/bangsluke/bangsluke.github.io
codeMultipleRepos: false
deploymentServiceURL: https://github.com/bangsluke
folderURL: n/a
logoURL: n/a
imageURL: https://i.imgur.com/2WGZP2P.png
dateStart: 2021-01-15
dateEnd: 2021-01-24
technologies:
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[JavaScript]]"
  - "[[GitHub]]"
  - "[[Snyk]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - Coding
  - Navigation
powerShellAlias: n/a
version: 1
portfolioOrder: 3
shortDescription: "An early website I developed to be my new tab page across browsers, providing me fast links to my key sites and a link back to my <a href=\"/portfolio/projects/homepage-website\" class=\"theme-link\">Homepage Website</a>."
longDescription: "A site that opens up for new tabs across my browsers, developed from a theme I found online which stores my key site links and several images I have saved on the page in a masonry layout."
lessonsLearned: "This was a very early project, with the main lesson being having to read another developers code to understand it (as I copied the <span class=\"theme-link\">CSS</span> file from online) and then making it my own."
name: "New Tab Website"
---
# New Tab Website

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

An early website I developed to be my new tab page across browsers, providing me fast links to my key sites and a link back to my [[Homepage Website]].

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A site that opens up for new tabs across my browsers, developed from a theme I found online which stores my key site links and several images I have saved on the page in a masonry layout.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[HTML]], [[CSS]] and [[JavaScript]]
- Back end/Datasource: n/a
- Hosting: [[GitHub]] (see [Repositories](#repositories))
- Security: [[Snyk]]
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

- [[Homepage Website]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This was a very early project, with the main lesson being having to read another developers code to understand it (as I copied the [[CSS]] file from online) and then making it my own.

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