---
tags:
  - portfolio
  - education
  - university
  - notes
  - tag
  - client
created: 2025-02-08 13:47
modified: 2025-07-29T11:58:30+01:00
viewCount: 12
dateStart: 2011-09-05
dateEnd: 2014-06-27
logoURL: https://i.imgur.com/V4J5S0P.png
qualifications: "BEng. Automotive Engineering. Second Class Honours, Upper Division (2:1)"
additionalDetails: "Large range of engineering topics, exploring multiple engineering fundamentals from structures and materials to vehicle aerodynamics. Final year project conducted on the numerical analysis of CNG, LPG and Hydrogen turbulent premixed flames data from experiments conducted in <span class=\"theme-link\">Sydney</span>."
---
# Loughborough University

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

## Qualifications

BEng. Automotive Engineering. Second Class Honours, Upper Division (2:1)

>[!top] [Back to top](#Table%20of%20Contents)

## Additional Details

Large range of engineering topics, exploring multiple engineering fundamentals from structures and materials to vehicle aerodynamics. Final year project conducted on the numerical analysis of CNG, LPG and Hydrogen turbulent premixed flames data from experiments conducted in [[Sydney]].

>[!top] [Back to top](#Table%20of%20Contents)

## Key Memories

- First Year
	- Meeting my incredible wife [[Bryony Lund|Bryony]] and some other decent chaps in [[Matt Dowty|Matt]], [[Andy Taylor|Andy]] and [[Steve Butler|Steve]] in [[Royce Hall Block 14]]
	- In halls where we had that incredible hot summer when after lectures we'd be drinking outside our halls
	- The winter after where I watched [[Bryony Lund|Bry]] in the freezing snow
	- Being the first student to get kicked out of a lab session for turning up in flip flops
	- Having my thermodynamics grade go from 75% to 5% when the lecturer corrected his spreadsheet name error
- Second Year
	- Living at [[2 Granville Street]] with [[Matt Dowty|Matt]], [[Steve Butler|Steve]] and Rob
	- The incredible house party we threw with the flame thrower and spitting fire
	- Our Christmas Day at the girls house and the huge roast 
- Third Year
	- Living at [[7 Burleigh Road]] with Naomi, Olivia & Rebecca
	- Spending hours measuring images of flames expanding in a tube for my dissertation
	- Finally handing in my dissertation

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