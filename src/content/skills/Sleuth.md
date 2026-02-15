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
modified: 2026-02-11T15:11:09+00:00
viewCount: 2
aliases:
  - Sleuth.io
skillRating: 5
skillDescription: Aware of the concept of the tool for analysing productivity.
logoFileName: sleuth.svg
---
# Sleuth

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Sleuth is an **AI‑powered engineering intelligence platform** that helps engineering teams and executives **align engineering work with business outcomes**, improve delivery performance, and remove friction from the development process.

It sits in the same problem space as [[LinearB]], [[Haystack]], and Swarmia, but with a stronger emphasis on **business alignment**, **review workflows**, and **AI‑assisted engineering operations**.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Sleuth \| Align business and engineering](https://www.sleuth.io/)

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