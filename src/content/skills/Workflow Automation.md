---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/automationTooling
  - software
created: 2026-03-18
modified: 2026-03-18T09:17:01+00:00
viewCount: 2
aliases:
  - workflow automation
skillRating: 75
skillDescription: Built automated workflows that replace repetitive manual processes, using a combination of Python scripts, Power Automate flows, and VBA macros. Focus on reliability and maintainability so automations outlast the person who built them.
logoFileName: n/a
---
# Workflow Automation

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

Building systems that perform repetitive tasks automatically, reducing human effort and error. Can range from simple scheduled scripts to complex multi-step flows that connect different tools and data sources together.

Used with software/tools like [[VBA]], [[Python]], [[Power Automate]], n8n.

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