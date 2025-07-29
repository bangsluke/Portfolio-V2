---
tags:
  - tag
  - person
  - colleague
  - work
  - portfolio
  - reference
modified: 2025-07-24T14:31:29+01:00
viewCount: 5
aliases:
  - Dom Ede
  - Dom
birthday: 
died: 
partneredWith: 
marriageDate: 
relatedTo:
  - Sophie
  - Seb
friendOf: 
education: 
linkedCompany:
  - "[[RLE International]]"
  - "[[RLE UK]]"
  - "[[GPMO]]"
referenceRole: Senior Project Consultant
referenceEmail: dominic.ede@icloud.com
referenceNumber: +44 7989 423267
referenceAddress: RLE UK, Essex
portfolioOrder: 1
---
# Dominic Ede

> [!back] Link back to [[People Notes]]

## Table of Contents 

```table-of-contents
```

## Details

>[!details]  `=this.file.name`
>`=choice(this.birthday = null | this.birthday = "","","<br>Birthday: " + this.birthday) + choice(this.died = null | this.died = "","","<br>Died: " + this.died) + choice(this.birthday = null | this.birthday = "", "", choice(this.died = "", "<br>Age: " + string(date(today) - date(this.birthday)), "<br>Age: " + string(date(this.died) - date(this.birthday)))) + choice(this.partneredWith = null | this.partneredWith = "","","<br>Partner: " + this.partneredWith) + choice(this.togetherDate = null | this.togetherDate = "","","<br>Got together: " + this.togetherDate) + choice(this.togetherDate = "" | this.togetherDate = null, "", choice(this.died = "" | this.died = null, "<br>Time together: " + choice(this.togetherDate = "" | this.togetherDate = null, "", date(today) - date(this.togetherDate)), "")) + choice(this.marriageDate = null | this.marriageDate = "","","<br>Married date: " + this.marriageDate) + choice(this.marriageDate = "" | this.marriageDate = null, "", choice(this.died = "" | this.died = null, "<br>Time married: " + choice(this.marriageDate = "" | this.marriageDate = null, "", date(today) - date(this.marriageDate)), "")) + choice(this.relatedTo = null | this.relatedTo = "","","<br>Related to: " + this.relatedTo) + choice((length(this.friendOf) > 0), "<br>Friend of: " + join(this.friendOf, ", "), "") + choice((length(this.education) > 0), "<br>Education: " + join(this.education, ", "), "") + choice(this.linkedCompany = null | this.linkedCompany = "","","<br>Companies: " + this.linkedCompany)`

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Last Mentioned in Daily Notes

```dataview
TABLE WITHOUT ID file.link as "Last Mentioned in Daily Note"
FROM [[]]
WHERE contains(tags, "daily")
SORT file.ctime DESC
LIMIT 1
```

>[!top] [Back to top](#Table%20of%20Contents)

### Total Count

```dataview
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"
```

### Last Mentioned

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5
```

### All Mentions

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
```

>[!top] [Back to top](#Table%20of%20Contents)