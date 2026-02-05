---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
created: 2026-02-05
modified: 2026-02-05T17:50:04+00:00
viewCount: 2
aliases:
skillRating: 5
skillDescription: Familiar with the concept without yet trying the software myself.
logoFileName: prometheus.svg
---
# Prometheus

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Prometheus is an open‑source monitoring and alerting toolkit optimized for reliability and scalability in dynamic, cloud‑native environments. It collects metrics as time‑series data, storing values alongside timestamps and labels for flexible querying. Prometheus uses a pull‑based model, scraping metrics from instrumented services, and includes a powerful query language (PromQL) for analysis. It integrates seamlessly with [[Kubernetes]] and other modern systems, providing real‑time insights into performance, availability, and resource usage. Prometheus is widely adopted for its simplicity, strong ecosystem, and robust alerting capabilities.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Prometheus - Monitoring system & time series database](https://prometheus.io/)

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