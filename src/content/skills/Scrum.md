---
tags:
  - tag
  - skill
  - concept
  - software
  - portfolio
  - portfolio/planningDelivery
created: 2026-03-05
modified: 2026-03-18T08:32:36+00:00
viewCount: 5
aliases:
  - SCRUM
skillRating: 50
skillDescription: Led delivery using Scrum across several projects at RLE International, owning sprint planning, backlog refinement, and retrospectives. Experienced in adapting sprint length and ceremony cadence based on team needs, and comfortable operating in both the Product Owner and delivery lead capacity within the framework.
logoFileName: n/a
---
# Scrum

> [!back] Link back to [[Skills Notes]]

> Scrum is a lightweight [[Agile]] framework

## Table of Contents

```table-of-contents
```

## Description

Scrum is a lightweight [[Agile]] framework that provides **roles, events, and artefacts** to help teams deliver work in short cycles called **sprints**.  
Key elements include:

- **Roles** - Product Owner, Scrum Master, Developers.
- **Events** - [[Sprint Planning]], Daily Scrum, Sprint Review, Sprint [[Retrospectives|Retrospective]].
- **Artefacts** - Product Backlog, Sprint Backlog, Increment.

Scrum focuses on **empiricism** (transparency, inspection, adaptation) and helps teams deliver value incrementally with frequent feedback loops.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Home \| Scrum.org](https://www.scrum.org/)

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