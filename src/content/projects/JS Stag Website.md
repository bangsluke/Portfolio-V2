---
tags:
  - project
  - portfolio
  - notes
  - coding
  - project/completed
created: 2025-05-30 10:00
modified: 2025-07-19T10:11:15+01:00
aliases: 
viewCount: 11
projectURL: https://js-stag.netlify.app/
codeURL: https://github.com/bangsluke/JS-stag
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/js-stag/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.imgur.com/Ve95p8R.png
dateStart: 2023-03-23
dateEnd: 2023-05-11
technologies:
  - "[[Vite.js]]"
  - "[[React]]"
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
  - "[[Jonny Sourris]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 5
shortDescription: "A website detailing the itinerary for <span class=\"theme-link\">Jonny Sourris</span>'s stag do."
longDescription: "This site provided the stag attendees with the full itinerary of the stag, with timings and <span class=\"theme-link\">Google Maps</span> links to each activity, designed for late attendees (or drunk attendees) to re-locate the group."
lessonsLearned: "There were a few lessons learned from this project;\n- Learning how to use <span class=\"theme-link\">Vite.js</span> for the first time\n- Writing a website using <span class=\"theme-link\">Typescript</span> for the first time\n- Implementing a timeline component and targeting mobile screen size\n- Correctly setting up hyperlinks from the users location to the next activity in <span class=\"theme-link\">Google Maps</span>"
---

# JS Stag Website

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

A website detailing the itinerary for <span class="theme-link">Jonny Sourris</span>'s stag do.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

This site provided the stag attendees with the full itinerary of the stag, with timings and <span class="theme-link">Google Maps</span> links to each activity, designed for late attendees (or drunk attendees) to re-locate the group.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="theme-link">Vite.js</span>, <span class="theme-link">React</span>
- Back end/Datasource: n/a
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

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- <a href="/portfolio/projects/OG Stag Website" class="theme-link">OG Stag Website</a>

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

There were a few lessons learned from this project;
- Learning how to use <span class="theme-link">Vite.js</span> for the first time
- Writing a website using <span class="theme-link">Typescript</span> for the first time
- Implementing a timeline component and targeting mobile screen size
- Correctly setting up hyperlinks from the users location to the next activity in <span class="theme-link">Google Maps</span>

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