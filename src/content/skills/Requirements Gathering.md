---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/discoveryRequirements
created: 2026-03-18
modified: 2026-03-18T08:46:38+00:00
viewCount: 2
aliases:
  - requirements gathering
  - requirement gathering
  - Requirement Gathering
skillRating: 65
skillDescription: Able to translate ambiguous business problems into clear, structured requirements ready for development. Comfortable working across formats including user stories, acceptance criteria, process maps, and data dictionaries.
logoFileName: n/a
---
# Requirements Gathering

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

The process of identifying, documenting, and validating what a product or feature needs to do. Covers functional requirements (what it does), non-functional requirements (how well it does it), and constraints that shape the solution.

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