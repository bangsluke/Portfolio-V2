---
tags:
  - portfolio
  - education
  - university
  - notes
  - tag
created: 2025-02-08 13:47
modified: 2025-07-21T19:11:09+01:00
viewCount: 13
dateStart: 2011-09-05
dateEnd: 2014-06-27
logoURL: https://media.licdn.com/dms/image/v2/C561BAQEo3Ke2CIHRbA/company-background_10000/company-background_10000/0/1617176515173/loughborough_university_cover?e=2147483647&v=beta&t=TabCtm4ROKsS0ZXjH0ioh6D4bemFR556N8rzoabbFo8
qualifications: "BEng. Automotive Engineering. Second Class Honours, Upper Division (2:1)"
additionalDetails: "Large range of engineering topics, exploring multiple engineering fundamentals from structures and materials to vehicle aerodynamics. Final year project conducted on the numerical analysis of CNG, LPG and Hydrogen turbulent premixed flames data from experiments conducted in <span class=\"theme-link\">Sydney</span>."
---

# Loughborough University

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

BEng. Automotive Engineering. Second Class Honours, Upper Division (2:1)

>[!top] [Back to top](#Table%20of%20Contents)

## Additional Details

Large range of engineering topics, exploring multiple engineering fundamentals from structures and materials to vehicle aerodynamics. Final year project conducted on the numerical analysis of CNG, LPG and Hydrogen turbulent premixed flames data from experiments conducted in <span class="theme-link">Bryony</span> and some other decent chaps in <span class="theme-link">Matt</span>, <span class="theme-link">Andy</span> and <span class="theme-link">Steve</span> in <span class="theme-link">Bry</span> in the freezing snow
	- Being the first student to get kicked out of a lab session for turning up in flip flops
	- Having my thermodynamics grade go from 75% to 5% when the lecturer corrected his spreadsheet name error
- Second Year
	- Living at <span class="theme-link">Matt</span>, <span class="theme-link">Steve</span> and Rob
	- The incredible house party we threw with the flame thrower and spitting fire
	- Our Christmas Day at the girls house and the huge roast 
- Third Year
	- Living at <span class="theme-link">7 Burleigh Road</span> with Naomi, Olivia & Rebecca
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