---
tags:
  - project
  - notes
  - sport
  - project/parked
  - portfolio
  - golf
created: 2025-07-13 16:48
modified: 2026-01-28T17:14:52+00:00
aliases:
viewCount: 11
projectURL: https://golf-shot-distances.netlify.app/
codeURL: https://github.com/bangsluke/golf-shot-distances
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/golf-shot-distances/overview
folderURL: n/a
logoURL: https://bangsluke-assets.netlify.app/images/project-logos/Golf-Shot-Distances.png
imageURL: https://bangsluke-assets.netlify.app/images/projects/Golf-Shot-Distances.png
dateStart: 2025-07-13
dateEnd: 2025-07-14
technologies:
  - "[[Google Sheets]]"
  - "[[Cursor]]"
  - "[[Netlify]]"
  - "[[ESLint]]"
  - "[[Prettier]]"
  - "[[Typescript]]"
  - "[[React]]"
  - "[[Vite.js]]"
  - "[[Express.js]]"
  - "[[Tailwind CSS]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Sport]]"
  - "[[Golf]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 6
shortDescription: "An investigation into how far I could get without writing any code, by using <span class=\"theme-link\">Cursor</span> <span class=\"theme-link\">AI</span> to generate the codebase."
longDescription: "I used this mini project as a small explorative test into how far <span class=\"theme-link\">AI</span> has developed inside <span class=\"theme-link\">Cursor</span> so far, aiming to build the site I had in mind only writing prompts and avoiding writing any code myself.<br><br>The site is a simple visualisation of golf club distances including flat carry and roll, taking into consideration conditions and displaying them in a graph, with a CRUD functionality with the <span class=\"theme-link\">Google Sheets</span> file behind it using their <span class=\"theme-link\">API</span>. It is also a <span class=\"theme-link\">PWA</span> to allow me to add it to my phone <span class=\"theme-link\">iOS</span> home screen."
lessonsLearned: "Firstly I learned just how powerful the integrated <span class=\"theme-link\">AI</span> inside <span class=\"theme-link\">Cursor</span> is and how impressively fast it can generate code. But as I got deeper into the project, the <span class=\"theme-link\">AI</span> needed more and more specific prompts and often tried backtracking to re attempt fixes that were undesirable.<br><br>It also failed to cover many edge cases and tried to convince me it had them covered.<br><br>So overall it was a great experience but ultimately showed me that we still need people who understand coding to get good results out of prompting code."
name: "Golf Shot Distances Site"
---
# Golf Shot Distances Site

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

A visual site and [[PWA]] to display how far I hit each [[Golf|golf]] club.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

An investigation into how far I could get without writing any code, by using [[Cursor]] [[AI]] to generate the codebase.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

I used this mini project as a small explorative test into how far [[AI]] has developed inside [[Cursor]] so far, aiming to build the site I had in mind only writing prompts and avoiding writing any code myself.

The site is a simple visualisation of golf club distances including flat carry and roll, taking into consideration conditions and displaying them in a graph, with a CRUD functionality with the [[Google Sheets]] file behind it using their [[API]]. It is also a [[PWA]] to allow me to add it to my phone [[iOS]] home screen.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Vite.js]], [[React]]
- Back end/Datasource: [[Google Sheets]]
- Hosting: [[GitHub]] (see [Repositories](#repositories)), [[Netlify]]
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

- Began with the concept of the stats from the [Golf Information original Google Sheet](https://docs.google.com/spreadsheets/d/1U9CN0NXLQWBXewaoWzYtrm9JQJSbtu4Bax-IrPojwp8/edit?usp=drivesdk), requested the column chart to be rotated to a bar chart and then let [[AI]] design the rest of it.

### Starting AI Prompt

- I have a Google Sheet file that lists golf clubs on each row, along with details of how far I hit each one. Build a single page application that visualises each one of these club distances as a stacked bar chart. The bar chart should be hoverable and display a tooltip with all the club details on it
- Use tailwind to develop the design and create a modern design
- For each club, have an edit button that when clicked, opens up a modal to allow the user to update the distances hit. This data should be pushed back to the Google Sheet file
- Once done, detail out what has been set up in the repo README including details on how to connect the front end website to the Google Sheet file via the fastest method for getting the data from the sheet to the site

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Golf Information original Google Sheet](https://docs.google.com/spreadsheets/d/1U9CN0NXLQWBXewaoWzYtrm9JQJSbtu4Bax-IrPojwp8/edit?usp=drivesdk)
- [Project overview \| golf-shot-distances \| Netlify](https://app.netlify.com/projects/golf-shot-distances/overview)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Firstly I learned just how powerful the integrated [[AI]] inside [[Cursor]] is and how impressively fast it can generate code. But as I got deeper into the project, the [[AI]] needed more and more specific prompts and often tried backtracking to re attempt fixes that were undesirable.

It also failed to cover many edge cases and tried to convince me it had them covered.

So overall it was a great experience but ultimately showed me that we still need people who understand coding to get good results out of prompting code.

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