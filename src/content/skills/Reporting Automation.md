---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/automationTooling
  - software
created: 2026-03-18
modified: 2026-03-18T09:19:59+00:00
viewCount: 2
aliases:
  - reporting automations
skillRating: 80
skillDescription: Automated the generation and distribution of reports using Power BI, Excel, and Google Apps Script. Built systems that replaced manual data gathering with live, filterable dashboards used in weekly senior leadership reviews.
logoFileName: n/a
---
# Reporting Automation

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

The practice of replacing manual report creation with automated systems that gather data, apply formatting, and distribute finished reports to stakeholders. Reduces lag between data availability and decision-making.

Used with software/tools like [[VBA]], [[Python]], [[Google Apps Script]], [[Power Automate]] and [[Power BI]].

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- n/a

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