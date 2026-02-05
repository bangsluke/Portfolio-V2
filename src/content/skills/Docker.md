---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
created: 2025-05-16T15:38:00
modified: 2026-02-05T17:32:41+00:00
viewCount: 6
aliases:
skillRating: 15
skillDescription: Utilised on the SDP project, introducing me to the concept of images and containerisation.
logoFileName: docker.svg
---
# Docker

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Docker is an open platform that enables developers to build, ship, and run applications inside lightweight, isolated containers. It standardizes environments by packaging code with all required dependencies, ensuring consistent behavior across development, testing, and production. Docker simplifies deployment, accelerates delivery cycles, and supports scalable microservices architectures. Its core engine manages container lifecycle operations, allowing teams to run multiple applications reliably on the same host. Docker has become a foundational technology in modern [[DevOps]] workflows, enabling reproducibility, portability, and efficient resource usage.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Docker: Accelerated Container Application Development](https://www.docker.com/)

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