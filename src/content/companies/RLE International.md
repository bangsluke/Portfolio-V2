---
tags:
  - company
  - notes
  - tag
  - portfolio
  - RLE
---
# RLE International

> **BACK:** Link back to [Company Notes](#company-notes)

>[!website-link] Links
>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID elink("https://en.wikipedia.org/wiki/"+replace(this.file.name, " ", "_"), this.file.name + " Wiki") as "Wikipedia Link"
WHERE file = this.file

## Table of Contents

-->
table-of-contents
```

## Folder Contents

%% Begin Waypoint %%
- **[RLE International](#rle-international)**
	- [Centre of Excellence](#centre-of-excellence)
	- [Digital Engineering](#digital-engineering)
	- [FutureMotiv](#futuremotiv)
	- [GPMO](#gpmo)
	- [Recotech](#recotech)
	- [RLE China](#rle-china)
	- [RLE Germany](#rle-germany)
	- [RLE Iberia](#rle-iberia)
	- [RLE India](#rle-india)
	- [RLE UK](#rle-uk)
	- [RLE USA](#rle-usa)
	- [VESOFTx](#vesoftx)

%% End Waypoint %%

## Details

>[!details]  `=this.file.name`
>`=choice(this.dateStart = null | this.dateStart = "","","<br>Start date: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>End date: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "","","<br>Employment duration: " + (date(this.dateEnd) - date(this.dateStart)))`

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Linked Personnel


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID
	file.link as "Person",
	length(file.inlinks) as "Note Mentions", 	referenceRole as "Reference Role"
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
	#project OR #tool 
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