---
tags:
  - tag
  - software
  - skill
  - portfolio
created: 2025-07-02
modified: 2025-07-02T14:28:25+01:00
viewCount: 6
aliases:
skillRating: 15
skillDescription: Used the API on a single project to track the geolocations of locations visited.
logoFileName: googlemaps.svg
---
# Google Maps

> [!back] Link back to [[Skills Notes]]

> [[Google]]'s map and navigation software

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