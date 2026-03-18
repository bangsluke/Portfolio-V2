---
tags:
  - tag
  - skill
  - portfolio/planningDelivery
  - portfolio
  - product
created: 2026-03-18
modified: 2026-03-18T08:53:42+00:00
viewCount: 2
aliases:
  - sprint planning
skillRating: 60
skillDescription: Experienced in breaking down epics into deliverable sprint goals, estimating effort with development teams, and balancing capacity against priority. Managed sprints across Azure DevOps for teams of varying size.
logoFileName: n/a
---
# Sprint Planning

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

A recurring ceremony at the start of each [[Scrum]] sprint where the team agrees on what work to commit to. Involves reviewing the backlog, estimating effort, clarifying acceptance criteria, and setting a realistic sprint goal based on team capacity.

Uses software and tools like [[Azure DevOps]].

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Sprint Planning \| Atlassian](https://www.atlassian.com/agile/scrum/sprint-planning)

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