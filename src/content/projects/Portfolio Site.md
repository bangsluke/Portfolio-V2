---
tags:
  - project
  - portfolio
  - notes
  - work
  - project/completed
  - coding
  - "[HTML](#html)"
  - "[CSS](#css)"
  - "[JavaScript](#javascript)"
  - "[GitHub](#github)"
  - "[Netlify](#netlify)"
  - "[Synk](#synk)"
  - n/a
  - "[Luke Bangs](#luke-bangs)"
  - "[Work](#work)"
---
# Portfolio Site

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

A note for storing ideas on building the first version of my Portfolio site.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

The portfolio site was my initial attempt at creating a marketing page for myself as a developer, showcasing my skills and contact information.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

The portfolio site showcased all the information I believed to be relevant for possible hirers, clients or collaborators, providing details on my ambitions, my self-assessed skill level in several languages and technologies, my education and former work experience and finally my contact details.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [HTML](#html), [CSS](#css) and [JavaScript](#javascript)
- Back end/Datasource: n/a
- Hosting: [GitHub](#github) (see [Repositories](#repositories)), [Netlify](#netlify)
- Security: [Synk](#synk)
- Authentication: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a
- [Netlify](#netlify): https://app.netlify.com/projects/bangsluke-portfolio-v1/overview

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [PowerShell](#powershell) alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- For page headers, use the below / style for each page.
- Also add the language bubble tags for each project

<!-- Image removed during sync: 20231009 PageHeaderInspiration.jpeg (20231009-pageheaderinspiration.jpeg) -->

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Portfolio Site page Todoist list](https://todoist.com/showTask?id=5773759872&sync_id=6506087454)
- [Portfolio Card](#portfolio-card)
- [Portfolio Site V2](#portfolio-site-v2)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The key lesson learned for this project was how useful it is to create re-usable components for a site - a skill I only began using after building this site. As such, this site became a challenge to maintain and ultimately broke, leading me to the decision to rebuild it entirely.

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