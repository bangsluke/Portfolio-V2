---
tags:
  - tag
  - software
  - coding
  - testing
  - skill
  - portfolio
modified: 2026-01-15T18:25:24+00:00
viewCount: 7
aliases:
skillRating: 45
skillDescription: Used for a couple of projects to set up automated E2E testing, combined with GitHub actions for scheduled runs. Utilised both the basic testing and extended UI testing functionality for ensuring tests provide correct coverage.
logoFileName: playwright.svg
---
# Playwright

> [!back] Link back to [[Skills Notes]]

> [[JavaScript]] testing library

## Table of Contents

```table-of-contents
```

## Useful Commands

- `npx playwright test` - Runs all of the Playwright tests
- `npx playwright test --ui` - Run the tests visually in a specific Playwright test window (opens a new pop up)

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Playwright Documentation - Fast and reliable end-to-end testing for modern web apps](https://playwright.dev/)
- [Explore design patterns in Playwright - Microsoft Playwright Video Tutorial \| LinkedIn Learning](https://www.linkedin.com/learning/playwright-design-patterns/welcome) - [[Playwright]]

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