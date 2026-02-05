---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
created: 2026-02-05
modified: 2026-02-05T17:33:22+00:00
viewCount: 2
aliases:
  - K8s
skillRating: 5
skillDescription: Utilised on the SDP project, introducing me to the concept.
logoFileName: kubernetes.svg
---
# Kubernetes

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Kubernetes is an open‑source container orchestration platform designed to automate the deployment, scaling, and management of containerized applications. Originally developed by [[Google]], it provides a resilient, self‑healing system that ensures applications remain available even as workloads shift. Kubernetes abstracts infrastructure complexity by managing clusters of machines and distributing workloads efficiently. It supports declarative configuration, rolling updates, service discovery, and automated scaling. As a cornerstone of cloud‑native architecture, Kubernetes enables teams to run applications reliably across hybrid and multi‑cloud environments while maintaining high performance and operational consistency.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Kubernetes](https://kubernetes.io/)

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