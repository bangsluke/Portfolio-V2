---
tags:
  - tag
  - software
  - language
  - skill
  - notes
  - portfolio
created: 2024-06-13T11:18:00
modified: 2025-06-29T17:16:05+01:00
viewCount: 5
aliases:
  - Apps Script
  - GAS
skillRating: 0
skillDescription: TBC
imageURL: 
---
# Google Apps Script

> **back:** Link back to [Skills Notes](Skills Notes)

> Language developed by [Google](Google). Form of [JavaScript](JavaScript)

## Table of Contents

```table-of-contents
```

## Links

- n/a

> **top:** [Back to top](#Table%20of%20Contents)

## Skill

```meta-bind  
INPUT[progressBar(title(Skill Rating), minValue(0), maxValue(100)):skillRating]  
```

> **top:** [Back to top](#Table%20of%20Contents)

## Skill Description

`=this.skillDescription`

> **top:** [Back to top](#Table%20of%20Contents)

## Analysis

### Linked Projects

> **projects:** Linked Projects
>```dataview
TABLE WITHOUT ID file.link as "Linked Project", file.mday as "Last Modified"
FROM #project 
WHERE contains(technologies, this.file.link)
SORT length(file.inlinks) DESC
>```

> **top:** [Back to top](#Table%20of%20Contents)

### Unread Links

> **reading:** Unread Reading List
>```dataview
TASK
WHERE !completed AND !contains(file.path, "Template") AND text != "" AND contains(text, this.file.name)
GROUP BY file.link
LIMIT 100

> **top:** [Back to top](#Table%20of%20Contents)

### Read Links

> **reading:** Completed Reading List
>```dataview
TASK
WHERE completed AND !contains(file.path, "Template") AND text != "" AND contains(text, this.file.name)
GROUP BY file.link
LIMIT 100

> **top:** [Back to top](#Table%20of%20Contents)

### Total Count

```dataview
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"
```

> **top:** [Back to top](#Table%20of%20Contents)

### Last Mentioned

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5
```

> **top:** [Back to top](#Table%20of%20Contents)

### All Mentions

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
```

> **top:** [Back to top](#Table%20of%20Contents)