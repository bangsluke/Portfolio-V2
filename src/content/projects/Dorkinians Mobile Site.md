---
tags:
  - project
  - portfolio
  - notes
  - project/archived
  - sport
  - coding
created: 2025-05-29 17:44
modified: 2025-07-19T10:18:48+01:00
aliases:
  - Dorkinians Mobile Stats
viewCount: 13
projectURL: https://dorkinians-mobile-stats.netlify.app/main
codeURL: https://github.com/bangsluke/mobile-stats-dorkinians
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/dorkinians-mobile-stats/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.postimg.cc/0Q7hW1FJ/Dorkinians-Mobile-Site.png
dateStart: 2022-12-07
dateEnd: 2023-01-13
technologies:
  - "[[React]]"
  - "[[Google Sheets]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Snyk]]"
  - "[[Yarn]]"
  - "[[Prettier]]"
  - "[[ESLint]]"
  - "[[Typescript]]"
  - "[[Next.js]]"
  - "[[VS Code]]"
projectCategory: Personal Design
linkedCompany:
  - "[[Dorkinians FC]]"
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Dorkinians FC]]"
  - "[[Football]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 5
shortDescription: "A quick access, mobile friendly filterable stats site for <span class=\"theme-link\">Dorkinians FC</span> players."
longDescription: "After creating the initial <a href=\"/projects/dorkinians-website\" class=\"theme-link\">Dorkinians Website</a>, I would regularly be asked by players \"But how many goals were just in cup games/not friendlies/just league?\" Etc etc.<br><br>I therefore decided to play around with creating a filterable site so that players could answer these questions themselves."
lessonsLearned: "This project let me design my first filter <span class=\"theme-link\">UI</span> popup using <span class=\"theme-link\">React</span> and taught me methods of filtering the data received from the back end.<br><br>I also tried out a new <span class=\"theme-link\">API</span> method of retrieving data to the front end from <span class=\"theme-link\">Google Sheets</span>, using their available method instead of parsing generated <span class=\"theme-link\">CSV</span> data like I did on the <a href=\"/projects/dorkinians-website\" class=\"theme-link\">Dorkinians Website</a>."
name: "Dorkinians Mobile Site"
---
# Dorkinians Mobile Site

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

A quick access, mobile friendly filterable stats site for [[Dorkinians FC]] players.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

After creating the initial [[Dorkinians Website]], I would regularly be asked by players "But how many goals were just in cup games/not friendlies/just league?" Etc etc.

I therefore decided to play around with creating a filterable site so that players could answer these questions themselves.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[React]]
- Back end/Datasource: [[Google Sheets]]
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
- Some designs sketched out on paper

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- <https://dorkinians-mobile-stats.netlify.app/main>
- <https://github.com/bangsluke/mobile-stats-dorkinians>
- [[Dorkinians Website]]
- [[Dorkinians Website V3]]
- [[Todoist]] Lists
	- [Dorkinians Mobile Site](https://todoist.com/showTask?id=6496470356&sync_id=6506077820)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project let me design my first filter [[UI]] popup using [[React]] and taught me methods of filtering the data received from the back end.

I also tried out a new [[API]] method of retrieving data to the front end from [[Google Sheets]], using their available method instead of parsing generated [[CSV]] data like I did on the [[Dorkinians Website]].

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