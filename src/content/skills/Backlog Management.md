---
tags:
  - tag
  - skill
  - portfolio/planningDelivery
  - portfolio
  - product
created: 2026-03-18
modified: 2026-03-18T08:57:53+00:00
viewCount: 2
aliases:
  - backlog management
skillRating: 80
skillDescription: Owned and maintained product backlogs across multiple concurrent projects, prioritising based on user value, stakeholder input, and technical dependencies. Skilled at keeping backlogs lean and actionable rather than aspirational.
logoFileName: n/a
---
# Backlog Management

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

The ongoing process of maintaining a prioritised list of work items for a product. Includes writing and refining user stories, ordering items by value and urgency, removing stale entries, and ensuring the backlog reflects current strategic priorities.

Uses software and tools like [[Azure DevOps]].

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Product backlog: Tips for creation and prioritization \| Atlassian](https://www.atlassian.com/agile/scrum/backlogs)
- [What is Backlog Refinement? \| Atlassian](https://www.atlassian.com/agile/scrum/backlog-refinement)

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