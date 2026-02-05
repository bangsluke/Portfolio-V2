---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
created: 2026-02-05
modified: 2026-02-05T17:38:30+00:00
viewCount: 2
aliases:
skillRating: 5
skillDescription: Familiar with the concept without yet trying the software myself.
logoFileName: terraform.svg
---
# Terraform

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Terraform, created by HashiCorp, is an Infrastructure‑as‑Code ([[IaC]]) tool that allows teams to define, provision, and manage cloud and on‑premises infrastructure using human‑readable configuration files. It enables reproducible, version‑controlled infrastructure deployments across multiple providers such as [[AWS]], [[Azure]], and [[Google Cloud]]. Terraform uses a declarative model: you specify the desired end state, and Terraform determines the necessary steps to achieve it. This approach reduces manual configuration, minimizes errors, and improves scalability. Terraform's modular design and provider ecosystem make it a powerful tool for automating complex infrastructure lifecycles.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Terraform \| HashiCorp Developer](https://developer.hashicorp.com/terraform)

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