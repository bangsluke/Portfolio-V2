---
tags:
  - portfolio
  - company
  - notes
  - tag
created: 2026-04-23
modified: 2026-05-03T17:49:01+01:00
viewCount: 3
aliases:
  - Acre
dateStart: 2026-05-01
dateEnd:
logoURL: https://bangsluke-assets.netlify.app/images/company-logos/Acre.png
websiteURL: https://www.acresoftware.com/
---
# Acre Software

> [!back] Link back to [[Company Notes]]

>[!website-link] Links
>```dataview
TABLE WITHOUT ID elink("https://en.wikipedia.org/wiki/"+replace(this.file.name, " ", "_"), this.file.name + " Wiki") as "Wikipedia Link"
WHERE file = this.file

## Table of Contents
```table-of-contents
```

## Details

>[!details]  `=this.file.name`
>`=choice(this.dateStart = null | this.dateStart = "","","Start date: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>End date: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "","","<br>Employment duration: " + choice(this.dateEnd = null | this.dateEnd = "", (date(today) - date(this.dateStart)), (date(this.dateEnd) - date(this.dateStart)))) + choice(this.websiteURL = null | this.websiteURL = "","","<br>Website: " + this.websiteURL)`

> My email accounts:
> - luke.bangs@acresoftware.com
> - luke.bangs@clearscore.com

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Linked Personnel

```dataview
TABLE WITHOUT ID
	file.link as "Person",
	length(file.inlinks) as "Note Mentions", 	referenceRole as "Reference Role"
FROM
	#person
WHERE
	contains(linkedCompany, [[]])
SORT
	file.name ASC
```

>[!top] [Back to top](#Table%20of%20Contents)

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

>[!top] [Back to top](#Table%20of%20Contents)

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