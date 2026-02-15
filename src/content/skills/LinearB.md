---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
  - analysis
created: 2026-02-11
modified: 2026-02-11T14:59:17+00:00
viewCount: 2
aliases:
skillRating: 5
skillDescription: Aware of the concept of the tool for analysing productivity.
logoFileName: linearb.svg
---
# LinearB

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

LinearB is an **AI‑powered engineering productivity platform** designed for **engineering leaders, DevEx teams, and platform teams**. Its purpose is to give visibility into how software delivery actually works in practice—where work gets stuck, how long things take, and how to improve flow.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [LinearB \| The AI productivity platform for engineering leaders](https://linearb.io/)

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