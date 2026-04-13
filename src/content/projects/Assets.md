---
tags:
  - project
  - notes
  - portfolio
  - project/completed
created: 2026-02-27 13:26
modified: 2026-03-11T17:34:28+00:00
aliases:
  - Images
viewCount: 1
projectURL: https://bangsluke-assets.netlify.app/
codeURL: https://github.com/bangsluke/Assets
codeMultipleRepos: false
deploymentServiceURL: https://app.netlify.com/projects/bangsluke-assets/overview
folderURL: n/a
logoURL: https://bangsluke-assets.netlify.app/images/project-logos/assets.png
imageURL: https://bangsluke-assets.netlify.app/images/projects/Assets.png
dateStart: 2026-02-27
dateEnd: 2026-02-27
technologies:
  - "[[HTML]]"
  - "[[Netlify]]"
  - "[[GitHub]]"
  - "[[Cursor]]"
  - "[[Node.js]]"
  - "[[JavaScript]]"
projectCategory: Reference
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - Assets
powerShellAlias: assets, images
version: 1
portfolioOrder: 7
shortDescription: "Static image hosting built after a third-party service deleted images used across my projects and documentation. Simple, reliable, self-controlled."
longDescription: "After my previous image hosting services <a href=\"https://imgur.com/\">Imgur</a> stopped being available in the UK and then my alternative, <a href=\"https://postimages.org/\">postimages</a> randomly began deleting my images, I  decided I needed a more robust setup for hosting my own assets, a solution that would give me control over my own files.<br><br>I built this simple static image hosting service within <span class=\"theme-link\">Netlify</span> to hold images for my projects and documentation, presenting the images in an easy to copy into documentation format."
lessonsLearned: "The key lesson I learned here was that <span class=\"theme-link\">Netlify</span> could be used as a CDN for my own assets, immediately removing my need o rely on 3rd party software."
name: "Assets"
---
# Assets

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

Static image hosting built after a third-party service deleted images used across my projects and documentation. Simple, reliable, self-controlled.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

After my previous image hosting services [Imgur](https://imgur.com/) stopped being available in the UK and then my alternative, [postimages](https://postimages.org/) randomly began deleting my images, I  decided I needed a more robust setup for hosting my own assets, a solution that would give me control over my own files.

I built this simple static image hosting service within [[Netlify]] to hold images for my projects and documentation, presenting the images in an easy to copy into documentation format. 

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[HTML]], [[JavaScript]]
- Back end/Datasource: [[Node.js]]
- Hosting: [[GitHub]] (see [Repositories](#repositories)), [[Netlify]]
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

- [Imgur image hosting](https://imgur.com/) - stopped being available in the UK
- [Postimages - free image hosting / image upload](https://postimages.org/) - randomly started deleting my images

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The key lesson I learned here was that [[Netlify]] could be used as a CDN for my own assets, immediately removing my need o rely on 3rd party software.

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