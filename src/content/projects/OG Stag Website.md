---
tags:
  - project
  - portfolio
  - notes
  - coding
  - project/completed
created: 2025-05-30 10:00
modified: 2025-07-11T15:55:34+01:00
aliases: 
viewCount: 8
projectURL: https://og-stag.netlify.app/
codeURL: https://github.com/bangsluke/OG-stag
codeMultipleRepos: false
folderURL: n/a
logoURL: n/a
imageURL: 
dateStart: 2023-05-22
dateEnd: 2023-07-07
technologies:
  - "[[Vite.js]]"
  - "[[React]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Synk]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Oli Goddard]]"
powerShellAlias: n/a
version: 1
shortDescription: "A website detailing the itinerary for [[Oli Goddard]]'s stag do."
longDescription: "This site provided the stag attendees with the full itinerary of the stag, with timings and [[Google Maps]] links to each activity, designed for late attendees (or drunk attendees) to re-locate the group.\nThis site was a copy and rebrand from the [[JS Stag Website]] I had previously built."
lessonsLearned: "As this site was a copy of [[JS Stag Website]], the lessons learned were fewer, however it did highlight the usefulness of setting up a configurable colour scheme as I was able to quickly change the global colours across the site within minutes."
---
# OG Stag Website

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

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`
## Table of Contents

```table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Introduction

A website detailing the itinerary for [[Oli Goddard]]'s stag do.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A website detailing the itinerary for [[Oli Goddard]]'s stag do.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

This site provided the stag attendees with the full itinerary of the stag, with timings and [[Google Maps]] links to each activity, designed for late attendees (or drunk attendees) to re-locate the group.

This site was a copy and rebrand from the [[JS Stag Website]] I had previously built.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Vite.js]], [[React]]
- Back end/Datasource: n/a
- Hosting: [[GitHub]] (see [Repositories](#repositories)), [[Netlify]]
- Security: [[Synk]]
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

- [[JS Stag Website]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

As this site was a copy of [[JS Stag Website]], the lessons learned were fewer, however it did highlight the usefulness of setting up a configurable colour scheme as I was able to quickly change the global colours across the site within minutes.

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