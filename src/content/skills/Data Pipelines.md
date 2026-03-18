---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/automationTooling
  - software
created: 2026-03-18
modified: 2026-03-18T09:18:35+00:00
viewCount: 1
aliases:
  - data pipelines
skillRating: 70
skillDescription: Designed and built Python-based data pipelines to consolidate multiple data sources into single reporting views. Experience with scheduled data processing, error handling, and feeding structured outputs into Power BI dashboards.
logoFileName: n/a
---
# Data Pipelines

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

Automated processes that extract data from one or more sources, transform it into a usable format, and load it into a destination such as a dashboard or database. Designed to run reliably on a schedule with minimal manual intervention.

Used with software/tools like [[VBA]], [[Python]], [[Power Automate]], [[Power BI]] and n8n.

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