---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
created: 2026-02-05
modified: 2026-02-05T17:51:13+00:00
viewCount: 2
aliases:
skillRating: 5
skillDescription: Familiar with the concept without yet trying the software myself.
logoFileName: grafana.svg
---
# Grafana

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Grafana is an open‑source observability and data visualization platform that allows users to explore, query, and visualize metrics, logs, and traces from diverse data sources. It transforms time‑series data into interactive dashboards, enabling teams to monitor system health, analyze trends, and troubleshoot issues effectively. Grafana supports integrations with [[Prometheus]], Elasticsearch, [[SQL]] databases, and many others. Its flexible dashboarding, alerting features, and plugin ecosystem make it a central tool for building unified monitoring solutions. Grafana is widely used across [[DevOps]], SRE, and analytics teams for its power, extensibility, and intuitive interface.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Grafana: The open and composable observability platform \| Grafana Labs](https://grafana.com/)

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