---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
  - validation
created: 2026-02-11
modified: 2026-02-11T15:29:29+00:00
viewCount: 2
aliases:
  - circleci
skillRating: 5
skillDescription: Aware of the tool for code validation but not yet used.
logoFileName: circleci.svg
---
# Circle CI

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

CircleCI is a **continuous integration and continuous delivery (CI/CD) platform** that helps engineering teams **build, test, and deploy code automatically and reliably**. It’s one of the most widely used CI/CD services in modern DevOps.

It has fast, scalable pipelines and isn't tied to an ecosystem like [[GitHub]] or [[GitLab]] so it can be used for tools like BitBucket.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Autonomous validation for the AI era - CircleCI](https://circleci.com/)

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

### Last Mentioned

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5
```

### All Mentions

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
```

>[!top] [Back to top](#Table%20of%20Contents)