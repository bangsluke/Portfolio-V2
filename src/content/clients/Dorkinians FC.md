---
tags:
  - tag
  - entertainment
  - sport
  - football
  - client
  - portfolio
  - club
  - Dorkinians
---
# Dorkinians FC

> **BACK:** Link back to [Sport](#sport)

>[!website-link] Links
>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID elink("https://en.wikipedia.org/wiki/"+replace(this.file.name, " ", "_"), this.file.name + " Wiki") as "Wikipedia Link"
WHERE file = this.file

> The best amateur [football](#football) team in the world

## Table of Contents

-->
table-of-contents
```

## Details

>[!details]  `=this.file.name`
>`=choice(this.dateStart = null | this.dateStart = "","","<br>Start date: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>End date: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "","","<br>Playing duration: " + (date(this.dateEnd) - date(this.dateStart)))`

>[!top] [Back to top](#Table%20of%20Contents)

## Key Links

- [Google Drive link](https://drive.google.com/drive/folders/1GU8jzw2HPEfEE-u540vNUl0DXPMoS6-j)
- [Todoist link](https://todoist.com/app/project/Dorkinians-6QmW4w5xpMhW9gPh)

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Linked Personnel


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Person"
FROM
	#person
WHERE
	contains(linkedCompany, [[]])
SORT
	file.name ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Role Descriptions


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Role Name",
	dateStart as "Start Date",
	dateEnd as "End Date"
FROM
	#role
WHERE
	contains(linkedCompany, [[]])
SORT
	file.name ASC

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Linked Projects


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Project Name",
	dateStart as "Start",
	dateEnd as "End",
	projectCategory as "Category"
FROM
	#project
WHERE
	contains(file.outlinks, [[]])
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