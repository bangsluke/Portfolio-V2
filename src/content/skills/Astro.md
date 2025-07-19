---
tags:
  - tag
  - framework
  - coding
  - software
  - notes
  - portfolio
  - skill
created: 2025-05-16T19:59:00
modified: 2025-07-16T12:18:20+01:00
viewCount: 7
aliases: 
skillRating: 0
skillDescription: TBC
logoFileName: astro.svg
---

# Astro

> [!back] Link back to <span class="mint-link">Skills Notes</span>

A framework for <span class="mint-link">JavaScript</span>

## Table of Contents 

```table-of-contents
```

## Links

- [Astro Build Documentation](https://astro.build/)
- [Astro Docs - Guides, resources, and API references to help you build with Astro](https://docs.astro.build/en/getting-started/)

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