---
tags:
  - portfolio
  - education
  - school
  - notes
  - tag
---
# Ashcombe School

> **BACK:** Link back to [Education Notes](#education-notes)

>[!website-link] Links
>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID elink("https://en.wikipedia.org/wiki/"+replace(this.file.name, " ", "_"), this.file.name + " Wiki") as "Wikipedia Link"
WHERE file = this.file

## Table of Contents

-->
table-of-contents
```

## Details

>[!details]  `=this.file.name`
>`=choice(this.dateStart = null | this.dateStart = "","","<br>Start date: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>End date: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "","","<br>Education duration: " + (date(this.dateEnd) - date(this.dateStart)))`

>[!top] [Back to top](#Table%20of%20Contents)

## Qualifications

9½ GCSE's:  3 A*s (Incl. Mathematics), 5 A's (Incl. English Literature), 1½ B's (Incl. English Language)

>[!top] [Back to top](#Table%20of%20Contents)

## Additional Details

TBC - Add full details

>[!top] [Back to top](#Table%20of%20Contents)

## Key Memories

- Getting detention every other day for not having my shirt tucked in and then one day at detention during the register read out, hearing [Ross](#ross-bangs)’ name read out after mine and being a proud big brother

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Students


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Student",
	length(file.inlinks) as "Note Mentions"
FROM
	#person
WHERE
	contains(education, this.file.link)
SORT
	file.name ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Total Count


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Last Mentioned


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5

-->


>[!top] [Back to top](#Table%20of%20Contents)

### All Mentions


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC

-->


>[!top] [Back to top](#Table%20of%20Contents)