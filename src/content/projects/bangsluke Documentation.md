---
tags:
  - project
  - portfolio
  - notes
  - coding
  - project/completed
created: 2024-02-20T09:27:00
modified: 2025-07-19T09:52:56+01:00
aliases:
  - Documentation Site
  - bangsluke-documentation
viewCount: 18
projectURL: https://bangsluke-documentation.netlify.app/
codeURL: https://github.com/bangsluke/bangsluke.github.io
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/bangsluke-documentation/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.imgur.com/fWB09PQ.png
dateStart: 2023-06-04
dateEnd: 2024-07-14
technologies:
  - "[[React]]"
  - "[[Docusaurus]]"
  - "[[Markdown]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Snyk]]"
  - "[[Algolia]]"
projectCategory: Documentation
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - Documentation
  - Coding
powerShellAlias: bangsluke
version: 1
portfolioOrder: 3
shortDescription: "A personal documentation site storing key links to the software I use, articles I find useful, and a section on <span class=\"theme-link\">Homepage</span> and <a href=\"/portfolio/projects/New Tab Website\" class=\"theme-link\">New Tab</a> pages."
longDescription: "Broken out into several sections, my documentation site provides me top level links to key softwares and guides me through each project, from planning, installation and set up to develop, testing and deployment.\nI regularly keep it updated with new links and processes I find so that it remains relevant to the work I am doing."
lessonsLearned: "This project introduced me to the concept of documentation sites, the ease and brilliance of <span class=\"theme-link\">Markdown</span> and led me to notice how many different softwares either use <span class=\"theme-link\">Docusaurus</span> or a very similar type static site builder for their documentation."
---

# bangsluke Documentation

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

A personal documentation site storing key links to the software I use, articles I find useful, and a section on <span class="theme-link">Homepage</span> and <a href="/portfolio/projects/New Tab Website" class="theme-link">New Tab</a> pages.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

Broken out into several sections, my documentation site provides me top level links to key softwares and guides me through each project, from planning, installation and set up to develop, testing and deployment.

I regularly keep it updated with new links and processes I find so that it remains relevant to the work I am doing.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="theme-link">React</span> using <span class="theme-link">Docusaurus</span>, <span class="theme-link">Algolia</span>
- Back end/Datasource: <span class="theme-link">Markdown</span>
- Hosting: <span class="theme-link">GitHub</span> (see [Repositories](#repositories)), <span class="theme-link">Netlify</span>
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

- All built and designed using <span class="theme-link">Docusaurus</span> structures with minimal additional styling added.

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- <https://docusaurus.io/>

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project introduced me to the concept of documentation sites, the ease and brilliance of <span class="theme-link">Markdown</span> and led me to notice how many different softwares either use <span class="theme-link">Docusaurus</span> or a very similar type static site builder for their documentation.

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