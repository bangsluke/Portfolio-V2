---
tags:
  - tag
  - software
  - skill
  - portfolio
modified: 2025-07-20T12:52:02+01:00
viewCount: 7
skillRating: 0
skillDescription: TBC
logoFileName: google_sheets.svg
---

# Google Sheets

> [!back] Link back to <span class="theme-link">Skills Notes</span>

> <span class="theme-link">Google</span> Sheets

## Table of Contents

```table-of-contents
```

## Tips

- Autofill: On <span class="theme-link">Apple</span> iPad, to autofill formulas down, you need to:
	- Clear all of the cells you want to autofill into
	- Create the formula in the top cell
	- Select all cells including the formula cell
	- Click on the selected cells
	- Choose ‘Autofill’ (or ‘More’)

 >[!top] [Back to top](#Table%20of%20Contents)

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