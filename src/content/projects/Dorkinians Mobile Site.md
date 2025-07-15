---
tags:
  - project
  - portfolio
  - notes
  - project/archived
  - sport
  - coding
created: 2025-05-29 17:44
modified: 2025-07-11T15:59:40+01:00
aliases:
  - Dorkinians Mobile Stats
viewCount: 10
projectURL: https://dorkinians-mobile-stats.netlify.app/main
codeURL: https://github.com/bangsluke/mobile-stats-dorkinians
codeMultipleRepos: false
folderURL: n/a
imageURL: 
dateStart: 2022-12-07
dateEnd: 2023-01-13
technologies:
  - "[React](React)"
  - "[Google Sheets](Google Sheets)"
  - "[GitHub](GitHub)"
  - "[Netlify](Netlify)"
  - "[Synk](Synk)"
projectCategory: Personal Design
linkedCompany:
  - "[Dorkinians FC](Dorkinians FC)"
toolOwner: "[Luke Bangs](Luke Bangs)"
developers:
  - "[Luke Bangs](Luke Bangs)"
topicTags:
  - "[Dorkinians FC](Dorkinians FC)"
  - "[Football](Football)"
powerShellAlias: n/a
version: 1
---
# Dorkinians Mobile Site

> **back:** Link back to [01 Projects|Projects](01 Projects|Projects)

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

> **details:** `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents

```table-of-contents
```

> **top:** [Back to top](#Table%20of%20Contents)

## Introduction

A note for storing details on an accessible mobile stats site for [Dorkinians FC](Dorkinians FC).

> **top:** [Back to top](#Table%20of%20Contents)

## Short Description

A quick access filterable stats site for [Dorkinians FC|Dorkinians](Dorkinians FC|Dorkinians) players.

> **top:** [Back to top](#Table%20of%20Contents)

## Long Description

After creating the initial [Dorkinians Website](Dorkinians Website), I would regularly be asked by players “But how many goals were just in cup games/not friendlies/just league?” Etc etc.

I therefore decided to play around with creating a filterable site so that players could answer these questions themselves.

> **top:** [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [React](React)
- Back end/Datasource: [Google Sheets](Google Sheets)
- Hosting: [GitHub](GitHub) (see [Repositories](#repositories)), [Netlify](Netlify)
- Security: [Synk](Synk)
- Authentication: n/a

> **top:** [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

> **top:** [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [PowerShell](PowerShell) alias 

> `=this.powerShellAlias`

> **top:** [Back to top](#Table%20of%20Contents)

## Planning and Design

- n/a
- Some designs sketched out on paper

> **top:** [Back to top](#Table%20of%20Contents)

## Other Links

- https://dorkinians-mobile-stats.netlify.app/main
- https://github.com/bangsluke/mobile-stats-dorkinians
- [Dorkinians Website](Dorkinians Website)
- [Dorkinians Website V2](Dorkinians Website V2)
- [Todoist](Todoist) Lists
	- [Dorkinians Mobile Site](https://todoist.com/showTask?id=6496470356&sync_id=6506077820)

> **top:** [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project let me design my first filter [UI](UI) popup using [React](React) and taught me methods of filtering the data received from the back end.

I also tried out a new [API](API) method of retrieving data to the front end from [Google Sheets](Google Sheets), using their available method instead of parsing generated [CSV](CSV) data like I did on the [Dorkinians Website](Dorkinians Website).

> **top:** [Back to top](#Table%20of%20Contents)

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

> **top:** [Back to top](#Table%20of%20Contents)