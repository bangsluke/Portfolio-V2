---
tags:
  - tag
  - framework
  - coding
  - software
  - notes
  - portfolio
  - skill
modified: 2025-07-07T21:59:26+01:00
created: 2023-10-13T07:42:00
viewCount: 5
aliases: 
skillRating: 0
skillDescription: TBC
imageURL: 
---
# Nest.JS

> **back:** Link back to [Skills Notes](Skills Notes)

A framework for [JavaScript](JavaScript)

## Table of Contents 

```table-of-contents
```

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