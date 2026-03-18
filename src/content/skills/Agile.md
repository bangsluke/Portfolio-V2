---
tags:
  - tag
  - skill
  - concept
  - software
  - portfolio/planningDelivery
  - portfolio
created: 2026-03-05
modified: 2026-03-18T08:33:10+00:00
viewCount: 4
aliases:
  - agile
skillRating: 55
skillDescription: Worked within Agile principles across multiple delivery roles, adapting the approach to suit team size and project maturity. Comfortable operating in environments where requirements evolve and priorities shift, using iterative delivery to maintain momentum and reduce risk.
logoFileName: n/a
---
# Agile

> [!back] Link back to [[Skills Notes]]

> Agile is a broad **mindset and approach to delivering work iteratively**

## Table of Contents

```table-of-contents
```

## Description

Agile is a philosophy for managing work that emphasises:

- **Iterative delivery** - breaking work into small, usable increments.
- **Customer collaboration** - adapting based on feedback rather than following a rigid plan.
- **Responding to change** - embracing uncertainty and adjusting as you learn.
- **Cross‑functional teamwork** - people working together closely to deliver value.

It's defined by the _Agile Manifesto_, which values individuals, working solutions, collaboration, and adaptability.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [What is Agile - Understanding the Agile methodology](https://www.atlassian.com/agile)

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