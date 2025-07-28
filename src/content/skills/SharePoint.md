---
tags:
  - tag
  - software
  - skill
  - portfolio
viewCount: 3
aliases:
  - Microsoft SharePoint
skillRating: 50
skillDescription: Have worked with SharePoint for several years and am competent in working with it directly and indirectly through automation.
logoFileName: sharepoint.svg
---

# SharePoint

> [!back] Link back to <span class="theme-link">Skills Notes</span>

> <span class="theme-link">Microsoft</span> SharePoint

## Table of Contents

```table-of-contents
```

## Links

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

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