---
tags:
  - tag
  - work
  - company
  - portfolio
  - notes
  - subsidiary
created: 2025-05-30T11:25:00
modified: 2025-07-10T19:01:49+01:00
viewCount: 4
aliases: 
dateStart: 2014-09-01
dateEnd: ""
logoURL: https://i.imgur.com/WlMzHZX.png
---
# RLE UK

> **back:** Link back to [Company Notes](Company Notes)

>[!website-link] Links
>```dataview
TABLE WITHOUT ID elink("https://en.wikipedia.org/wiki/"+replace(this.file.name, " ", "_"), this.file.name + " Wiki") as "Wikipedia Link"
WHERE file = this.file

> Subsidiary of [RLE International](RLE International) based in the [United Kingdom](United Kingdom)

## Table of Contents
```table-of-contents
```

## Details

> **details:** `=this.file.name`
>`=choice(this.dateStart = null | this.dateStart = "","","<br>Start date: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>End date: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "","","<br>Employment duration: " + (date(this.dateEnd) - date(this.dateStart)))`

> **top:** [Back to top](#Table%20of%20Contents)

## Analysis

### Linked Personnel

```dataview
TABLE WITHOUT ID
	file.link as "Person",
	length(file.inlinks) as "Note Mentions",
	referenceRole as "Reference Role"
FROM
	#person
WHERE
	contains(linkedCompany, [[]])
SORT
	file.name ASC
```

> **top:** [Back to top](#Table%20of%20Contents)

### Role Descriptions

```dataview
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
```

> **top:** [Back to top](#Table%20of%20Contents)

### Linked Projects

```dataview
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
```

> **top:** [Back to top](#Table%20of%20Contents)

### Total Count

```dataview
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"
```

> **top:** [Back to top](#Table%20of%20Contents)

### Last Mentioned

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5
```

> **top:** [Back to top](#Table%20of%20Contents)

### All Mentions

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
```

> **top:** [Back to top](#Table%20of%20Contents)