---
tags:
  - project
  - notes
  - project/completed
  - portfolio
created: 2025-08-13 12:24
modified: 2025-08-13T13:13:10+01:00
aliases:
  - Dissertation
viewCount: 2
projectURL: https://drive.google.com/file/d/14lZuALado2j_CpgzZbOzX4wg_3zoowuD/view
codeURL: n/a
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: https://drive.google.com/drive/folders/1jWWvDz7psSgYMiZfwO-1E6LVFRKeUODk?usp=drive_link
logoURL: n/a
imageURL: https://i.imgur.com/L1GD3ZA.png
dateStart: 2013-10-07
dateEnd: 2014-05-30
technologies:
  - n/a
projectCategory: Reference
linkedCompany:
  - "[[Loughborough University]]"
toolOwner: Dr Salah Ibrahim
developers:
  - "[[Luke Bangs]]"
topicTags:
  - CNG
  - LPG
  - Hydrogen
powerShellAlias: n/a
version: 1
shortDescription: "My final year project of my Automotive Engineering degree at <span class=\"theme-link\">Loughborough University</span> analysing the combustion of three fuels."
longDescription: "An analysis on the combustion of CNG, LPG and Hydrogen turbulent premixed flames, analysing a study conducted by the University of <span class=\"theme-link\">Sydney</span>, submitted as my final year project for my Automotive Engineering degree at <span class=\"theme-link\">Loughborough University</span>.<br><br>Within the project, I analysed hundreds of images of flame combustion propagating through various chambers designed to induce turbulence, to measure the flame structure, speed and stretch factor of each fuel, chosen due to their growing relevance to automotive products."
lessonsLearned: "The project taught me a lot about combustion for the three studied fuels and also how to structure and present an academic paper, for which I received a high grade for my work.<br><br>Had I conducted the project after I had gained coding experience, I would have attempted to automate a large amount of the manual measurement work I did, to both verify my manual attempts and gain a higher level of accuracy from the study."
name: "Final Year Project"
---
# Final Year Project

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

My final year project of my Automotive Engineering degree at [[Loughborough University]] analysing the combustion of three fuels.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

An analysis on the combustion of CNG, LPG and Hydrogen turbulent premixed flames, analysing a study conducted by the University of [[Sydney]], submitted as my final year project for my Automotive Engineering degree at [[Loughborough University]].

Within the project, I analysed hundreds of images of flame combustion propagating through various chambers designed to induce turbulence, to measure the flame structure, speed and stretch factor of each fuel, chosen due to their growing relevance to automotive products.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: n/a
- Back end/Datasource: n/a
- Hosting: [[Google Drive]]
- Security: n/a
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

- All planning and other details are in the [Google Drive folder](https://drive.google.com/drive/folders/1jWWvDz7psSgYMiZfwO-1E6LVFRKeUODk?usp=drive_link)

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Google Drive folder](https://drive.google.com/drive/folders/1jWWvDz7psSgYMiZfwO-1E6LVFRKeUODk?usp=drive_link)
- [[Loughborough University]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The project taught me a lot about combustion for the three studied fuels and also how to structure and present an academic paper, for which I received a high grade for my work.

Had I conducted the project after I had gained coding experience, I would have attempted to automate a large amount of the manual measurement work I did, to both verify my manual attempts and gain a higher level of accuracy from the study.

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