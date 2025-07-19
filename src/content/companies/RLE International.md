---
tags:
  - company
  - notes
  - tag
  - portfolio
created: 2025-05-30T09:49:00
modified: 2025-07-18T08:06:33+01:00
viewCount: 11
aliases:
  - RLE
dateStart: ""
dateEnd: ""
logoURL: https://i.imgur.com/YO94MEL.png
---

# RLE International

> [!back] Link back to <span class="mint-link">Company Notes</span>

>[!website-link] Links
>```dataview
TABLE WITHOUT ID elink("https://en.wikipedia.org/wiki/"+replace(this.file.name, " ", "_"), this.file.name + " Wiki") as "Wikipedia Link"
WHERE file = this.file

## Table of Contents
```table-of-contents
```

## Folder Contents

%% Begin Waypoint %%
- **<span class="mint-link">RLE International</span>**
	- <span class="mint-link">Centre of Excellence</span>
	- <span class="mint-link">Digital Engineering</span>
	- <span class="mint-link">FutureMotiv</span>
	- <span class="mint-link">GPMO</span>
	- <span class="mint-link">Recotech</span>
	- <span class="mint-link">RLE China</span>
	- <span class="mint-link">RLE Germany</span>
	- <span class="mint-link">RLE Iberia</span>
	- <span class="mint-link">RLE India</span>
	- <span class="mint-link">RLE UK</span>
	- <span class="mint-link">RLE USA</span>
	- <span class="mint-link">VESOFTx</span>

%% End Waypoint %%

## Details

>[!details]  `=this.file.name`
>`=choice(this.dateStart = null | this.dateStart = "","","<br>Start date: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>End date: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "","","<br>Employment duration: " + (date(this.dateEnd) - date(this.dateStart)))`

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
	#project OR #tool 
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