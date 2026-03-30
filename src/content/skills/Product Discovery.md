---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/discoveryRequirements
created: 2026-03-18
modified: 2026-03-25T14:40:35+00:00
viewCount: 1
aliases:
  - product discovery
skillRating: 50
skillDescription: Experienced in continuous discovery practices, using analytics data and user behaviour to inform product decisions. Applied Umami event tracking on a couple of keys sites to identify which features drove engagement and prioritise the roadmap.
logoFileName: n/a
---
# Product Discovery

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

The ongoing process of determining what to build and why - validating that a problem is real, that users want a solution, and that a proposed solution will actually work before committing to full development. Distinct from delivery; it runs continuously rather than as a one-off phase.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Product Discovery Basics: Everything You Need to Know](https://www.producttalk.org/product-discovery/)
- [[Continuous Discovery Habits]]
- [Product Discovery](https://bangsluke-documentation.netlify.app/docs/product-management/product-discovery) - [[bangsluke Documentation]]

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