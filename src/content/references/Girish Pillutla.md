---
tags:
  - tag
  - person
  - colleague
  - work
  - portfolio
  - reference
modified: 2025-07-21T11:14:32+01:00
viewCount: 4
aliases:
  - Girish
birthday: 
died: 
partneredWith: Raji
marriageDate: 
relatedTo:
  - Meirav
friendOf:
  - "[[Luke Bangs]]"
education: 
linkedCompany:
  - "[[RLE International]]"
  - "[[RLE UK]]"
  - Waymo
referenceRole: Lead Engineer
referenceEmail: Girish.Pillutla@gmail.com
referenceNumber: "+16693429918"
referenceAddress: RLE UK, Essex
portfolioOrder: 3
---

# Girish Pillutla

> [!back] Link back to <span class="theme-link">People Notes</span>

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