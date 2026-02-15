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
modified: 2026-02-11T15:09:42+00:00
viewCount: 2
aliases:
skillRating: 5
skillDescription: Aware of the concept of the tool for analysing productivity.
logoFileName: haystack.svg
---
# Haystack

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Haystack is an **engineering analytics platform** that turns [[Git]] and [[Jira]] data into **delivery‑focused metrics**, with a strong emphasis on [[DORA]], cycle time, and bottleneck detection. It sits in the same category as [[LinearB]], [[Sleuth]], and Swarmia, but it's known for being **simple, developer‑friendly, and DORA‑first**

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Delivery Ops for Product & Engineering Leaders \| Haystack](https://www.usehaystack.io/)

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