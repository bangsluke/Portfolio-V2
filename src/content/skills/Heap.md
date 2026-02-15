---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
  - analytics
  - testing
created: 2026-02-11
modified: 2026-02-11T15:18:38+00:00
viewCount: 2
aliases:
skillRating: 5
skillDescription: Aware of the tool for A/B testing but not yet used.
logoFileName: heap.svg
---
# Heap

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Heap is a **digital product analytics platform** designed to give companies a **complete, automatic view of user behavior** across their websites and apps. Its core promise is simple:

**Heap captures every user interaction automatically — no manual event tracking required.**

This makes it very different from tools like Google Analytics, [[Amplitude]], or [[Mixpanel]], which require manual instrumentation.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Heap - Better Insights. Faster. \| Heap](https://www.heap.io/)

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