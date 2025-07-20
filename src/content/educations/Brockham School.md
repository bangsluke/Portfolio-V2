---
tags:
  - portfolio
  - education
  - school
  - notes
  - tag
created: 2025-03-31T23:59:00
modified: 2025-07-20T19:46:28+01:00
viewCount: 9
dateStart: 1996-09-01
dateEnd: 2002-07-17
imageURL: https://www.northdowns.surrey.sch.uk/_site/data/files/images/slideshow/2/4952A86E2A8478097467ECD264682D1D.jpg
qualifications: "n/a"
additionalDetails: "n/a"
---
# Brockham School

> [!back] Link back to <span class="theme-link">Education Notes</span>

>[!website-link] Links
>```dataview
TABLE WITHOUT ID elink("https://en.wikipedia.org/wiki/"+replace(this.file.name, " ", "_"), this.file.name + " Wiki") as "Wikipedia Link"
WHERE file = this.file

## Table of Contents
```table-of-contents
```

## Details

>[!details]  `=this.file.name`
>`=choice(this.dateStart = null | this.dateStart = "","","<br>Start date: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>End date: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "","","<br>Education duration: " + (date(this.dateEnd) - date(this.dateStart)))`

## Qualifications

n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Additional Details

n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Key Memories

- TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Students

```dataview
TABLE WITHOUT ID
	file.link as "Student",
	length(file.inlinks) as "Note Mentions"
FROM
	#person
WHERE
	contains(education, this.file.link)
SORT
	file.name ASC
```

>[!top] [Back to top](#Table%20of%20Contents)

### Linked Holidays

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]] AND #holiday 
SORT file.ctime DESC
```

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