---
tags:
  - tag
  - framework
  - coding
  - software
  - synced
  - portfolio
  - notes
  - skill
  - library
created: 2025-07-14T21:22:00
modified: 2025-07-18T11:51:42+01:00
viewCount: 4
aliases: 
skillRating: 0
skillDescription: TBC
logoFileName: preact.svg
---

# Preact

> [!back] Link back to <span class="mint-link">Skills Notes</span>

> Language: <span class="mint-link">JavaScript</span>. Lightweight version of <span class="mint-link">React</span>

## Table of Contents

```table-of-contents
```

## Links

- [Link to Documentation site](https://bangsluke-documentation.netlify.app/docs/Project%20Set%20Up%20to%20Release/4Development#react)
- [React.dev - Learning documentation](https://react.dev/learn)
- [React.gg Visualized - A visual exploration of core React concepts](https://react.gg/visualized)

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