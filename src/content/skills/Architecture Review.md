---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/technicalBridge
  - software
created: 2026-03-18
modified: 2026-03-24T09:08:34+00:00
viewCount: 3
aliases:
  - architecture review
skillRating: 50
skillDescription: Able to participate meaningfully in technical architecture discussions, assessing trade-offs between approaches and ensuring alignment with product goals. Contributed to architecture decisions across full-stack projects using React, Next.js, Neo4j, and Node.js.
logoFileName: n/a
---
# Architecture Review

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

The process of evaluating a system's technical design to ensure it meets current requirements and can accommodate future needs. Involves assessing trade-offs between approaches, identifying risks, and ensuring alignment between technical decisions and product goals.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- n/a

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