---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
  - planning
  - tracking
created: 2026-02-11
modified: 2026-02-11T15:14:17+00:00
viewCount: 2
aliases:
  - Jira
skillRating: 5
skillDescription: Aware of the tool for project and issue tracking but have only used Azure DevOps so far.
logoFileName: jira.svg
---
# JIRA

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Jira is **Atlassian's industry‑leading project and issue‑tracking platform**, used by software teams, IT teams, and business teams to **plan, track, and deliver work**. It's one of the most widely adopted tools for Agile development.

According to Atlassian, Jira is a **"project management tool that brings every team together to plan, track, and deliver any type of project with confidence."**

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Jira \| Issue & Project Tracking Software \| Atlassian](https://www.atlassian.com/software/jira)

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