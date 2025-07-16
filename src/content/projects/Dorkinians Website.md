---
tags:
  - project
  - coding
  - project/completed
  - sport
  - portfolio
  - notes
  - "[HTML](#html)"
  - "[CSS](#css)"
  - "[JavaScript](#javascript)"
  - "[Google Sheets](#google-sheets)"
  - "[GitHub](#github)"
  - "[Netlify](#netlify)"
  - "[Synk](#synk)"
  - "[Dorkinians FC](#dorkinians-fc)"
  - "[Luke Bangs](#luke-bangs)"
  - "[Dorkinians FC](#dorkinians-fc)"
  - "[Football](#football)"
---
# Dorkinians Website

> **BACK:** Link back to [Projects](#01-projects)

>[!website-link] Links
> 
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID this.projectURL as "Project URL Link"
WHERE file = this.file
>
-->

>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID this.codeURL as "Codebase URL Link"
WHERE file = this.file
>
-->

>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID choice(this.codeMultipleRepos = true, link("#repositories","True - Click for link"), "False") as "Multiple Repos"
WHERE file = this.file

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents


-->
table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Introduction

A note for storing details on the first version of the [Dorkinians FC](#dorkinians-fc) website.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A sport stats website for displaying performance data for [Dorkinians FC](#dorkinians-fc) players and teams

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A sports stats site for displaying performance data for [Dorkinians FC](#dorkinians-fc) players and teams, my local [football](#football) club which I play for. What initially started as an [Excel](#excel) spreadsheet with stats posted on our club WhatsApp each week was the perfect opportunity for me to try and develop into my first real public website. I even wrote a [Dev article](https://dev.to/bangsluke/building-a-stats-website-for-a-sports-club-4g5m) explaining how I built the stats site.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: Vanilla [HTML](#html), [CSS](#css) and [JavaScript](#javascript)
- Back end/Datasource: [Google Sheets](#google-sheets)
- Hosting: [GitHub](#github) (see [Repositories](#repositories)) and [Netlify](#netlify)
- Security: [Synk](#synk)
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [PowerShell](#powershell) alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Dorkinians Website V2](#dorkinians-website-v2)
- [Dorkinians Mobile Site](#dorkinians-mobile-site)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project taught me several things:
- Retrospectively taught me the importance of components for reusability for long term maintainability. All of this project was built within a single [HTML](#html) and [JavaScript](#javascript) file (and [CSS](#css)) before I knew how to work properly with components, meaning everything is copied out and manually edited over and over again, making maintenance a nightmare
- Reviewing the speed of the website through analysis tools helped me learn I need to reduce the number of [HTML](#html) elements in the future by being smarter and more efficient in components
- Taught me that parsing a [CSV](#csv) using the method I used is too slow for large amounts of data, especially when the data continues growing. The project needs to be rebuilt faster with a new method
- Allowed me to learn how to work with [SVG](#svg) files used as the images on the TOTW page
- Helped me creatively come up with ideas to keep users engaged whilst data was loading, leading to the various random humorous quotes I have appearing on the main loading screen
All of the above led me to begin work on [Dorkinians Website V2](#dorkinians-website-v2) to overcome the problems listed above.

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Last Mentioned in Daily Notes


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID file.link as "Last Mentioned in Daily Note"
FROM [[]]
WHERE contains(tags, "daily")
SORT file.ctime DESC
LIMIT 1

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Total Count


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"

-->


### Last Mentioned


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5

-->


### All Mentions


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC

-->


>[!top] [Back to top](#Table%20of%20Contents)