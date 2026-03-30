---
tags:
  - coding
  - skill
  - notes
  - tag
  - software
  - portfolio
  - monitoring
created: 2026-03-27
modified: 2026-03-27T18:58:45+00:00
viewCount: 2
aliases:
  - UptimeRobot
  - Uptime
skillRating: 15
skillDescription: Applied to a few projects to give me visibility to sites going down allowing fast response.
logoFileName: uptimerobot.svg
---
# Uptime Robot

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Description

Uptime Robot is a popular cloud-based service that monitors websites, servers, APIs, and ports in real-time, alerting users via email, SMS, or apps if their site goes down. It offers a free tier with 50 monitors checking every 5 minutes and paid plans for faster, more frequent, and detailed monitoring.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [UptimeRobot Monitors](https://dashboard.uptimerobot.com/monitors)
- [UptimeRobot Status page](https://stats.uptimerobot.com/ENAXkwlGcY)

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