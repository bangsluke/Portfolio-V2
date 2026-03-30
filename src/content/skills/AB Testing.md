---
tags:
  - tag
  - skill
  - portfolio
  - product
  - portfolio/discoveryRequirements
created: 2026-03-18
modified: 2026-03-25T14:40:04+00:00
viewCount: 1
aliases:
  - A/B Testing
  - A/B testing
  - A/B Tests
  - A/B tests
skillRating: 30
skillDescription: Practical experience running A/B tests to inform product and design decisions. Used variant testing on an MVP to evaluate visual designs with real users before committing to a final direction.
logoFileName: n/a
---
# A/B Testing

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

A method of comparing two versions of a product, feature, or piece of content by exposing different user groups to each variant and measuring which performs better against a defined metric. Used to make evidence-based decisions rather than relying on opinion or assumption.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [A/B tests guide for Product Management - GoPractice](https://gopractice.io/product/ab-tests-guide-for-product-managers/)

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