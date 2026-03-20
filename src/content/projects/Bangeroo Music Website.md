---
tags:
  - project
  - notes
  - project/active
  - portfolio
created: 2026-03-12 15:16
modified: 2026-03-19T12:34:24+00:00
aliases:
viewCount: 3
projectURL: https://bangeroo-music-website.netlify.app/
codeURL: https://github.com/bangsluke/Bangeroo-Music-Website
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/bangeroo-music-website/overview
folderURL: n/a
logoURL: https://bangsluke-assets.netlify.app/images/project-logos/Bangeroo-Site-Logo.png
imageURL:
dateStart: 2026-03-12
dateEnd: ""
technologies:
  - "[[Vite.js]]"
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[JavaScript]]"
  - "[[Netlify]]"
  - "[[GitHub]]"
  - "[[Supabase]]"
projectCategory: MVP
linkedCompany:
  - n/a
toolOwner: "[[Martin Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Music]]"
  - "[[Spotify]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 6
shortDescription: "Tested out several visual designs for a client via A/B testing in an <span class=\"theme-link\">MVP</span>.<br><br>TBC"
longDescription: "An <span class=\"theme-link\">SPA</span> for displaying my father's musical interests, embedding his <span class=\"theme-link\">Spotify</span> songs into an edgy modern and chaotic design.<br><br>Given a lack of initial design direction, I initially built an <span class=\"theme-link\">MVP</span> of four varying designs of the same content as a form of A/B testing (or A/B/C/D if you will), deciding that seeing visual ideas would help align him to a style rather than via verbal communication.<br><br>TBC"
lessonsLearned: "From a product viewpoint, this project allowed me to conduct some initial A/B testing on various page designs, creating 4 variants for the client to review and select from.<br><br>From a technical standpoint, it taught me how to connect up a simple <span class=\"theme-link\">Supabase</span> backend, creating the tables in the <span class=\"theme-link\">SQL</span> editor and sorting out row level security. It was also my first time using the <span class=\"theme-link\">Spotify</span> developer <span class=\"theme-link\">API</span>, using it to display a 30 second refreshing status of if the client was online or offline and what they were listening to.<br><br>TBC"
name: "Bangeroo Music Website"
---
# Bangeroo Music Website

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

> [[Supabase]] Database: <https://supabase.com/dashboard/project/jqsjvsakcfxewylwattk>

## Table of Contents

```table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

Tested out several visual designs for a client via A/B testing in an [[MVP]].

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

An [[02 Tags/Acronyms and Tool Categories/SPA|SPA]] for displaying my father's musical interests, embedding his [[Spotify]] songs into an edgy modern and chaotic design.

Given a lack of initial design direction, I initially built an [[MVP]] of four varying designs of the same content as a form of A/B testing (or A/B/C/D if you will), deciding that seeing visual ideas would help align him to a style rather than via verbal communication.

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Vite.js]], [[HTML]], [[CSS]], [[JavaScript]]
- Back end/Datasource: [[Supabase]]
- Hosting: [[GitHub]] (see [Repositories](#repositories)), [[Netlify]]
- Security: TBC
- Authentication: TBC

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

- All initial planning done in [[Claude]]

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

From a product viewpoint, this project allowed me to conduct some initial A/B testing on various page designs, creating 4 variants for the client to review and select from.

From a technical standpoint, it taught me how to connect up a simple [[Supabase]] backend, creating the tables in the [[SQL]] editor and sorting out row level security. It was also my first time using the [[Spotify]] developer [[API]], using it to display a 30 second refreshing status of if the client was online or offline and what they were listening to.

TBC

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