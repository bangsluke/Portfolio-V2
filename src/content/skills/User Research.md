---
tags:
  - tag
  - skill
  - portfolio/planningDelivery
  - portfolio
  - product
created: 2026-03-18
modified: 2026-03-18T08:47:02+00:00
viewCount: 2
aliases:
  - user research
skillRating: 65
skillDescription: Practical experience using analytics tools and direct user feedback to inform product decisions. Used Umami event tracking and user behaviour data to prioritise features and validate assumptions on live products serving 600+ users.
logoFileName: n/a
---
# User Research

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

Methods for understanding how real users behave, what they need, and where they struggle. Ranges from quantitative approaches like analytics and A/B testing to qualitative methods like interviews, surveys, and usability testing.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- TBC

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