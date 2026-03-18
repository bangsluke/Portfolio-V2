---
tags:
  - tag
  - skill
  - portfolio/planningDelivery
  - portfolio
  - product
created: 2026-03-18
modified: 2026-03-18T08:57:06+00:00
viewCount: 2
aliases:
  - Retrospective
  - retrospectives
  - retrospective
  - retro
skillRating: 55
skillDescription: Facilitated regular retrospectives to surface blockers, celebrate wins, and drive continuous improvement. Focused on actionable outcomes rather than open-ended discussion.
logoFileName: n/a
---
# Retrospectives

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

A regular team ceremony held at the end of a [[Scrum]] sprint or project phase to reflect on what went well, what didn't, and what to change. The goal is continuous improvement through honest discussion and concrete action items.

Uses software and tools like [[Azure DevOps]].

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [What are agile retrospectives? \| Atlassian](https://www.atlassian.com/agile/scrum/retrospectives)

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