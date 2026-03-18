---
tags:
  - tag
  - skill
  - portfolio/planningDelivery
  - portfolio
  - product
created: 2026-03-18
modified: 2026-03-18T08:55:10+00:00
viewCount: 2
aliases:
  - roadmapping
skillRating: 65
skillDescription: Built and maintained product roadmaps to align stakeholders on delivery timelines and strategic direction. Used roadmaps as a communication tool to manage expectations across engineering, management, and end users.
logoFileName: n/a
---
# Roadmapping

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

The practice of creating a high-level plan that communicates what a product team intends to deliver and roughly when. Used to align stakeholders, set expectations, and connect day-to-day delivery work back to longer-term strategic goals.

Uses software and tools like [[Project|Microsoft Project]] and [[Azure DevOps]].

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- TBC

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