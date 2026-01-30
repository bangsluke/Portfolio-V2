---
tags:
  - project
  - portfolio
  - notes
  - travel
  - project/archived
  - coding
created: 2025-05-29 18:06
modified: 2025-07-19T10:46:19+01:00
aliases:
viewCount: 12
projectURL: https://bangsluke-my-travel-journal.netlify.app/
codeURL: https://github.com/bangsluke/my-travel-journal
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/bangsluke-my-travel-journal/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.postimg.cc/TwnB7vFg/my-travel-journal-V1.png
dateStart: 2022-06-09
dateEnd: 2023-08-14
technologies:
  - "[[Markdown]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Snyk]]"
  - "[[npm]]"
  - "[[VS Code]]"
  - "[[React]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Holidays & Travel]]"
  - "[[Travel Notes]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 7
shortDescription: "A website built to display the notes I had taken across various holidays I had been on."
longDescription: "A site dedicated to my travel explorations, providing details on what my wife and I did whilst abroad for several holidays with a picture from each trip."
lessonsLearned: "This site taught me a few extra skills such as working with <span class=\"theme-link\">Markdown</span> data; parsing it and extracting the relevant pieces. As this site was built purely on several markdown files providing the data, saved directly into the repository, this inspired me to go further and develop the <a href=\"/projects/travel-website\" class=\"theme-link\">Travel Website</a> which dynamically loads in data via a <span class=\"theme-link\">Neo4j</span> graph."
name: "My Travel Journal"
---
# My Travel Journal

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

A website built to display the notes I had taken across various holidays I had been on.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A site dedicated to my travel explorations, providing details on what my wife and I did whilst abroad for several holidays with a picture from each trip.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[React]]
- Back end/Datasource: [[Markdown]]
- Hosting: [[GitHub]] (see [Repositories](#repositories)), [[Netlify]]
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

- [[Travel Website]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This site taught me a few extra skills such as working with [[Markdown]] data; parsing it and extracting the relevant pieces. As this site was built purely on several markdown files providing the data, saved directly into the repository, this inspired me to go further and develop the [[Travel Website]] which dynamically loads in data via a [[Neo4j]] graph.

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

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