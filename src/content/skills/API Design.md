---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/technicalBridge
  - software
created: 2026-03-18
modified: 2026-03-24T09:08:22+00:00
viewCount: 3
aliases:
  - API design
skillRating: 45
skillDescription: Designed and built RESTful and GraphQL APIs to serve front-end applications, with a focus on clean data contracts and predictable behaviour. Experienced in defining API schemas that balance developer experience with performance.
logoFileName: n/a
---
# API Design

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

The process of defining how software components communicate with each other through structured interfaces. Involves choosing patterns ([[REST]], [[GraphQL]]), designing clear data contracts, and balancing usability for consuming developers with performance and security.

Used with software/tools like [[Postman]].

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [[REST]]
- [[GraphQL]]

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