---
tags:
  - project
  - portfolio
  - notes
  - project/completed
  - coding
created: 2025-05-29 18:03
modified: 2025-07-22T09:29:13+01:00
aliases: 
viewCount: 7
projectURL: https://group-page.netlify.app/
codeURL: https://github.com/bangsluke/Group-Page
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/group-page/overview
folderURL: https://drive.google.com/drive/folders/1wnM7858WTLTL7RqmvdoRSki5CHLn8V19?usp=drive_link
logoURL: n/a
imageURL: https://i.imgur.com/QWmSObb.png
dateStart: 2022-04-09
dateEnd: 2023-10-30
technologies:
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[JavaScript]]"
  - "[[Google Sheets]]"
  - "[[GitHub]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - Stats
powerShellAlias: n/a
version: 1
portfolioOrder: 6
shortDescription: "An early site that I built as a laugh for my friends displaying statistics for each person to fuel our competitive nature."
longDescription: "My first real project with multiple pages and functionalities, the site was designed for a laugh amongst my friendship group given our high levels of competitiveness.\nThe data was stored in manageable <span class=\"theme-link\">Google Sheets</span> which I could update easily after any sports or competitions we did as a group and this would generate an overall ranking for the group.\nThe site also contained features such as a shared calendar embedded for us to send events to and help plan get togethers."
lessonsLearned: "This site helped me start processing external data into a front end, which I did rather inefficiently using papa parse to gather the <span class=\"theme-link\">CSV</span> data.\nIt also taught me how to embed components like Google Calendar and widgets, and allowed me to understand theme switching for <span class=\"theme-link\">CSS</span>."
---

# Group Page

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

An early site that I built as a laugh for my friends displaying statistics for each person to fuel our competitive nature.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

My first real project with multiple pages and functionalities, the site was designed for a laugh amongst my friendship group given our high levels of competitiveness.

The data was stored in manageable <span class="theme-link">Google Sheets</span> which I could update easily after any sports or competitions we did as a group and this would generate an overall ranking for the group.

The site also contained features such as a shared calendar embedded for us to send events to and help plan get togethers.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="theme-link">HTML</span>, <span class="theme-link">CSS</span>, <span class="theme-link">JavaScript</span>
- Back end/Datasource: <span class="theme-link">Google Sheets</span>
- Hosting: <span class="theme-link">GitHub</span> (see [Repositories](#repositories))
- Security: n/a
- Authentication: Manual

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

- [Tits Group Page Data - Google Sheets](https://docs.google.com/spreadsheets/d/1nMirJYChG8t2DC_C_esM7zeviuQ9YtIQLKDQ5LbuP-w/edit?usp=drivesdk)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This site helped me start processing external data into a front end, which I did rather inefficiently using papa parse to gather the <span class="theme-link">CSV</span> data.

It also taught me how to embed components like Google Calendar and widgets, and allowed me to understand theme switching for <span class="theme-link">CSS</span>.

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