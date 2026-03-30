---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/technicalBridge
  - software
created: 2026-03-18
modified: 2026-03-24T09:18:11+00:00
viewCount: 3
aliases:
  - technical documentation
skillRating: 80
skillDescription: Built and maintained a Docusaurus-based documentation site to standardise SDLC processes across engineering teams. Comfortable writing technical guides, API references, and onboarding material for both technical and non-technical audiences.
logoFileName: n/a
---
# Technical Documentation

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

Written material that explains how a system works, how to use it, or how to contribute to it. Covers [[API]] references, onboarding guides, architecture decision records, and process documentation that reduces knowledge silos within teams.

Used with software/tools like [[Docusaurus]].

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [[Docusaurus]]
- [[bangsluke Documentation|Documentation Site]]

>[!top] [Back to top](#Table%20of%20Contents)

## Skill

```meta-bind  
INPUT[progressBar(title(Skill Rating), minValue(0), maxValue(100)):skillRating]  
```

>[!top] [Back to top](#Table%20of%20Contents)

## Skill Description

`=this.skillDescription`

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Linked Projects

>[!projects] Linked Projects
>```dataview
TABLE WITHOUT ID file.link as "Linked Project", file.mday as "Last Modified"
FROM #project 
WHERE contains(technologies, this.file.link)
SORT length(file.inlinks) DESC
>```

>[!top] [Back to top](#Table%20of%20Contents)

### Unread Links

>[!reading] Unread Reading List
>```dataview
TASK
WHERE !completed AND !contains(file.path, "Template") AND text != "" AND contains(text, this.file.name)
GROUP BY file.link
LIMIT 100

>[!top] [Back to top](#Table%20of%20Contents)

### Read Links

>[!reading] Completed Reading List
>```dataview
TASK
WHERE completed AND !contains(file.path, "Template") AND text != "" AND contains(text, this.file.name)
GROUP BY file.link
LIMIT 100

>[!top] [Back to top](#Table%20of%20Contents)

### Total Count

```dataview
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"
```

>[!top] [Back to top](#Table%20of%20Contents)

### Last Mentioned

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5
```

>[!top] [Back to top](#Table%20of%20Contents)

### All Mentions

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
```

>[!top] [Back to top](#Table%20of%20Contents)