---
tags:
  - tag
  - software
  - skill
  - portfolio
created: 2023-08-18T15:45:00
modified: 2025-07-05T08:04:52+01:00
viewCount: 8
aliases: 
skillRating: 80
skillDescription: Absolutely obsessed with Obsidian as my PKM and use it frequently daily, even using it as my data source for my Portfolio Site data.
logoFileName: obsidian.svg
---
# Obsidian

> [!back] Link back to [[Skills Notes]]

> [[PKMS|Personal Knowledge Management System]] - Language: [[Markdown]]

## Table of Contents 

```table-of-contents
```

## Links

- [Todoist link](https://todoist.com/app/project/Obsidian-Updates-6XF5Hq5W4vhCFw4q)

>[!top] [Back to top](#Table%20of%20Contents)

## Plugins List

```dataview
TABLE WITHOUT ID
	file.link as "Plugin",
	length(file.inlinks) AS "Mentions",
	viewCount as "View Count"
FROM #plugin 
SORT length(file.inlinks) DESC
```

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