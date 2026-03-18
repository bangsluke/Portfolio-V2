---
tags:
  - tag
  - skill
  - concept
  - acronym
  - software
  - portfolio
  - portfolio/planningDelivery
created: 2026-02-03
modified: 2026-03-18T09:29:13+00:00
viewCount: 4
aliases:
  - CI/CD
skillRating: 50
skillDescription: Configured CI/CD pipelines across GitHub Actions and GitLab CI for personal and professional projects, automating build, test, and deployment steps. Used Netlify's GitHub integration to set up automatic deployments across multiple site configurations, and incorporated security scanning tools like Snyk and Dependabot into pipelines to catch vulnerabilities before they reach production.
logoFileName: n/a
---
# Continuous Integration & Deployment

> [!back] Link back to [[Skills Notes]]

> Continuous Integration & Deployment (CI/CD)

## Table of Contents

```table-of-contents
```

## Description

### Definition

Continuous Integration and Continuous Deployment - the practice of automatically building, testing, and deploying code changes as they are committed. Reduces the gap between writing code and getting it in front of users, catching issues early through automated checks rather than manual review.

- **Continuous Integration (CI):** Developers merge code frequently into a shared repository, triggering automated builds and tests.
- **Continuous Delivery/Deployment (CD):** Automates the release of validated code to production or staging environments.

Used with software/tools like [[GitHub]], [[GitLab]], [[Netlify]], [[Snyk]] and [[Dependabot]].

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- n/a

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