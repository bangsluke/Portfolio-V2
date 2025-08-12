---
tags:
  - portfolio
  - education
  - school
  - notes
  - tag
created: 2025-02-04 18:53
modified: 2025-08-11T17:07:50+01:00
viewCount: 17
dateStart: 2003-09-01
dateEnd: 2009-07-17
imageURL: https://www.ashcombe.surrey.sch.uk/Admissions/23_07_13_Ashcombe_Facade___74A1923_WEB.jpg
qualifications: "9½ GCSE's all at grade B or higher"
additionalDetails: "- Mathematics: A*<br>- Science: A*<br>- Additional Science: A*<br>- English Literature: A<br>- English Language: B<br>- Art and Design: A<br>- History: A<br>- Geography: A<br>- French: A<br>- German (short course): B"
---
# Ashcombe School

> [!back] Link back to [[Education Notes]]

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

>[!top] [Back to top](#Table%20of%20Contents)

## Qualifications

9½ GCSE's all at grade B or higher

>[!top] [Back to top](#Table%20of%20Contents)

## Additional Details

- Mathematics: A*
- Science: A*
- Additional Science: A*
- English Literature: A
- English Language: B
- Art and Design: A
- History: A
- Geography: A
- French: A
- German (short course): B

>[!top] [Back to top](#Table%20of%20Contents)

## Key Memories

- Getting detention every other day for not having my shirt tucked in and then one day at detention during the register read out, hearing [[Ross Bangs|Ross]]' name read out after mine and being a proud big brother

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