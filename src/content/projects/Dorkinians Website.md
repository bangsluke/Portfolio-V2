---
tags:
  - project
  - coding
  - project/completed
  - sport
  - portfolio
  - notes
created: 2022-04-10T09:28:00
modified: 2025-08-15T14:05:17+01:00
viewCount: 37
aliases:
projectURL: https://dorkinians-stats-site.netlify.app
codeURL: https://github.com/bangsluke/Dorkinians-Dev-Site
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/dorkinians-stats-site/overview
folderURL: n/a
logoURL: n/a
imageURL: https://bangsluke-assets.netlify.app/images/projects/Dorkinians-Website.png
dateStart: 2022-04-10
dateEnd: 2023-10-23
technologies:
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[JavaScript]]"
  - "[[Google Sheets]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Snyk]]"
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
powerShellAlias: dorkinians
version: 2
portfolioOrder: 7
shortDescription: "A sport stats website for displaying performance data for <span class=\"theme-link\">Dorkinians FC</span> players and teams."
longDescription: "A sports stats site for displaying performance data for <span class=\"theme-link\">Dorkinians FC</span> players and teams, my local <span class=\"theme-link\">football</span> club which I play for. What initially started as an <span class=\"theme-link\">Excel</span> spreadsheet with stats posted on our club WhatsApp each week was the perfect opportunity for me to try and develop into my first real public website. I even wrote a <a href=\"https://dev.to/bangsluke/building-a-stats-website-for-a-sports-club-4g5m\">Dev article</a> explaining how I built the stats site."
lessonsLearned: "This project taught me several things:<br>- Retrospectively taught me the importance of components for reusability for long term maintainability. All of this project was built within a single <span class=\"theme-link\">HTML</span> and <span class=\"theme-link\">JavaScript</span> file (and <span class=\"theme-link\">CSS</span>) before I knew how to work properly with components, meaning everything is copied out and manually edited over and over again, making maintenance a nightmare<br>- Reviewing the speed of the website through analysis tools helped me learn I need to reduce the number of <span class=\"theme-link\">HTML</span> elements in the future by being smarter and more efficient in components<br>- Taught me that parsing a <span class=\"theme-link\">CSV</span> using the method I used is too slow for large amounts of data, especially when the data continues growing. The project needs to be rebuilt faster with a new method<br>- Allowed me to learn how to work with <span class=\"theme-link\">SVG</span> files used as the images on the TOTW page<br>- Helped me creatively come up with ideas to keep users engaged whilst data was loading, leading to the various random humorous quotes I have appearing on the main loading screen<br><br>All of the above led me to begin work on <a href=\"/projects/dorkinians-website-v3\" class=\"theme-link\">Dorkinians Website V3</a> to overcome the problems listed above."
name: "Dorkinians Website"
---
# Dorkinians Website

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

A sport stats website for displaying performance data for [[Dorkinians FC|Dorkinians FC]] players and teams.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A sports stats site for displaying performance data for [[Dorkinians FC|Dorkinians FC]] players and teams, my local [[Football|football]] club which I play for. What initially started as an [[Excel]] spreadsheet with stats posted on our club WhatsApp each week was the perfect opportunity for me to try and develop into my first real public website. I even wrote a [Dev article](https://dev.to/bangsluke/building-a-stats-website-for-a-sports-club-4g5m) explaining how I built the stats site.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: Vanilla [[HTML]], [[CSS]] and [[JavaScript]]
- Back end/Datasource: [[Google Sheets]]
- Hosting: [[GitHub]] (see [Repositories](#repositories)) and [[Netlify]]
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

- [[Dorkinians Website V3]]
- [[Dorkinians Mobile Site]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project taught me several things:
- Retrospectively taught me the importance of components for reusability for long term maintainability. All of this project was built within a single [[HTML]] and [[JavaScript]] file (and [[CSS]]) before I knew how to work properly with components, meaning everything is copied out and manually edited over and over again, making maintenance a nightmare
- Reviewing the speed of the website through analysis tools helped me learn I need to reduce the number of [[HTML]] elements in the future by being smarter and more efficient in components
- Taught me that parsing a [[CSV]] using the method I used is too slow for large amounts of data, especially when the data continues growing. The project needs to be rebuilt faster with a new method
- Allowed me to learn how to work with [[SVG]] files used as the images on the TOTW page
- Helped me creatively come up with ideas to keep users engaged whilst data was loading, leading to the various random humorous quotes I have appearing on the main loading screen
All of the above led me to begin work on [[Dorkinians Website V3]] to overcome the problems listed above.

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