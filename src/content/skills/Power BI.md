---
tags:
  - tag
  - software
  - skill
  - portfolio
  - portfolio/discoveryRequirements
modified: 2026-05-31T16:43:46+02:00
viewCount: 1
aliases:
  - Microsoft Power BI
skillRating: 50
skillDescription: Led the design and development of several Power BI reports for internal management review from existing data models.
logoFileName: power_bi.svg
---
# Power BI

> [!back] Link back to [[Skills Notes]]

> [[Microsoft]] Power BI

## Table of Contents

```table-of-contents
```

## Links

- <https://app.powerbi.com>
- [Microsoft Learn - Training for Power BI](https://learn.microsoft.com/en-us/training/powerplatform/power-bi) - official, free, structured role-based paths from fundamentals to data modelling - best starting point for systematic learning.
- [Microsoft Learn - Guidance documentation - Power BI](https://learn.microsoft.com/en-us/power-bi/guidance/) - authoritative best-practice articles - best for the “right way” to model and optimise.
- [Guy in a Cube - YouTube](https://www.youtube.com/@GuyInACube) - short practical videos - best for troubleshooting refresh, gateways, and service questions. - [[YouTube]]
	- [Getting Started with Power BI - Guy in a Cube - YouTube](https://youtube.com/playlist?list=PLv2BtOtLblH13vCbf99BptWWk-EWx7QQG&si=7axwmQ7KZTPX25Ex)
- [Articles - SQLBI](https://www.sqlbi.com/articles/) - deep, rigorous free articles and videos on DAX and modelling - best for understanding star schemas and DAX correctly.

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