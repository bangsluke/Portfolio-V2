---
tags:
  - portfolio
  - education
  - notes
  - tag
created: 2025-02-04 18:53
modified: 2025-07-20T19:44:44+01:00
viewCount: 12
dateStart: 2009-09-01
dateEnd: 2011-06-24
imageURL: https://www.ashcombe.surrey.sch.uk/Admissions/23_07_13_Ashcombe_Facade___74A1923_WEB.jpg
qualifications: "4 A Levels"
additionalDetails: "A Levels in Mathematics (A), Physics (A) and History (A), AS Level in Economics (A)"
---
# Ashcombe Sixth Form College

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

4 A Levels

>[!top] [Back to top](#Table%20of%20Contents)

## Additional Details

A Levels in Mathematics (A), Physics (A) and History (A), AS Level in Economics (A)

>[!top] [Back to top](#Table%20of%20Contents)

## Key Memories

- Sixth form being some of the best years of my life
- History with Mrs Vellucci being incredible, including the lesson she segregated us by physical features to demonstrate what the Nazis did

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