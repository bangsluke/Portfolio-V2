---
tags:
  - project
  - portfolio
  - notes
  - project/completed/work
  - coding
  - work
created: 2025-05-30 09:57
modified: 2025-09-08T10:30:13+01:00
viewCount: 18
aliases:
projectURL: https://gpmo.rle.international/
codeURL: https://dev.azure.com/RLEGPMO/_git/GPMO%20Documentation
codeMultipleRepos: false
deploymentServiceURL: https://dev.azure.com/RLEGPMO/GPMO%20Documentation
folderURL: n/a
logoURL: n/a
imageURL: https://i.postimg.cc/s2kt4g6d/GPMO-Documentation-Site.png
dateStart: 2024-02-01
dateEnd: 2024-07-31
technologies:
  - "[[React]]"
  - "[[Docusaurus]]"
  - "[[Markdown]]"
  - "[[GitLab]]"
  - "[[Azure]]"
  - "[[VS Code]]"
  - "[[DevOps]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Haydn Baker]]"
developers:
  - "[[Luke Bangs]]"
  - "[[Alex Sheers]]"
topicTags:
  - "[[Work]]"
  - "[[GPMO]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 2
shortDescription: "A full documentation site for all tools developed by the <span class=\"theme-link\">GPMO</span> team, using <span class=\"theme-link\">Docusaurus</span> and static <span class=\"theme-link\">Markdown</span> files maintained by the tool developers."
longDescription: "The documentation behind all <span class=\"theme-link\">GPMO</span> processes and tools, helping users and future developers understand how to use and update data and the tools themselves.<br><br>Maintained by the tool developers, the site is built using <span class=\"theme-link\">Docusaurus</span> which collates the documentation written in <span class=\"theme-link\">Markdown</span>, with special components written in <span class=\"theme-link\">React</span> to provide extended functionality beyond the available <span class=\"theme-link\">Docusaurus</span> features."
lessonsLearned: "This project taught me how to integrate <span class=\"theme-link\">React</span> components into a <span class=\"theme-link\">Docusaurus</span> site - as previously I had only built sites using the core <span class=\"theme-link\">Docusaurus</span> functionality.<br><br>I also had to investigate into our company's <span class=\"theme-link\">Azure</span> set up to ensure the site was accessible by internal employees only and set up a custom domain to make the site easier to find for users.<br><br>We also utilised the blog feature of <span class=\"theme-link\">Docusaurus</span> to provide regular <span class=\"theme-link\">GPMO</span> updates to the company which was a new feature for me to work with."
name: "GPMO Documentation Site"
---
# GPMO Documentation Site

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

A full documentation site for all tools developed by the [[GPMO]] team, using [[Docusaurus]] and static [[Markdown]] files maintained by the tool developers.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The documentation behind all [[GPMO]] processes and tools, helping users and future developers understand how to use and update data and the tools themselves.

Maintained by the tool developers, the site is built using [[Docusaurus]] which collates the documentation written in [[Markdown]], with special components written in [[React]] to provide extended functionality beyond the available [[Docusaurus]] features.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[React]], [[Docusaurus]]
- Back end/Datasource: [[Markdown]]
- Hosting: [[GitLab]] (see [Repositories](#repositories)), [[Azure]]
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

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [[GPMO]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project taught me how to integrate [[React]] components into a [[Docusaurus]] site - as previously I had only built sites using the core [[Docusaurus]] functionality.

I also had to investigate into our company's [[Azure]] set up to ensure the site was accessible by internal employees only and set up a custom domain to make the site easier to find for users.

We also utilised the blog feature of [[Docusaurus]] to provide regular [[GPMO]] updates to the company which was a new feature for me to work with.

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