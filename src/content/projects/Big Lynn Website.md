---
tags:
  - project
  - portfolio
  - notes
  - project/completed
  - coding
created: 2025-05-29 17:57
modified: 2025-07-19T09:57:02+01:00
aliases: 
viewCount: 13
projectURL: https://biglynn.netlify.app/info
codeURL: https://github.com/bangsluke/BigLynn2023
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/biglynn/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.imgur.com/a6FT0Ya.png
dateStart: 2022-09-06
dateEnd: 2023-07-26
technologies:
  - "[[Next.js]]"
  - "[[Google Sheets]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Snyk]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Golf]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 3
shortDescription: "A stats and information website about an annual <span class=\"mint-link\">golf</span> competition that I am involved in."
longDescription: "A site I developed for an annual <span class=\"mint-link\">golf</span> competition that I play in, where I displayed details for the 2023 competition that I was in charge of organising and then I collected past years data and displayed this for each player as well as predictions for the upcoming year."
lessonsLearned: "This project let me take an existing Berry Material <span class=\"mint-link\">UI</span> template and extend and develop it into the site I required. It helped me integrate animations and stats components like graphs into the site using libraries like d3."
---
# Big Lynn Website

> [!back] Link back to <span class="mint-link">Projects</span>

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

A stats and information website about an annual <span class="mint-link">golf</span> competition that I am involved in.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A site I developed for an annual <span class="mint-link">golf</span> competition that I play in, where I displayed details for the 2023 competition that I was in charge of organising and then I collected past years data and displayed this for each player as well as predictions for the upcoming year.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="mint-link">Next.js</span>
- Back end/Datasource: <span class="mint-link">Google Sheets</span>
- Hosting: <span class="mint-link">GitHub</span> (see [Repositories](#repositories)), <span class="mint-link">Netlify</span>
- Security: <span class="mint-link">Snyk</span>
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the <span class="mint-link">PowerShell</span> alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- The main template of the frontend was a Berry Material <span class="mint-link">UI</span> template
- Some designs sketched out on paper

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Big Lynn Website Tasks](https://todoist.com/app/section/Big-Lynn-6C4XgHCXxqhRx95j) - <span class="mint-link">Todoist</span>
- [Old website link](https://biglynn2023.netlify.app/info)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project let me take an existing Berry Material <span class="mint-link">UI</span> template and extend and develop it into the site I required. It helped me integrate animations and stats components like graphs into the site using libraries like d3.

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