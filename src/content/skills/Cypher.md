---
tags:
  - tag
  - coding
  - language
  - software
  - skill
  - portfolio
  - notes
created: 2025-06-13T08:16:00
modified: 2025-07-28T07:36:48+01:00
viewCount: 10
aliases:
skillRating: 55
skillDescription: Able to write basic and more advanced queries for interacting with Neo4j data.
logoFileName: neo4j_cypher.svg
---
# Cypher

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Skill

```meta-bind  
INPUT[progressBar(title(Skill Rating), minValue(0), maxValue(100)):skillRating]  
```

>[!top] [Back to top](#Table%20of%20Contents)

## Skill Description

`=this.skillDescription`

>[!top] [Back to top](#Table%20of%20Contents)

## Cypher commands

- `Match (n) return n` - Shows every type of node and their edges.
- `Match (n:Activity) return n` - Shows all activity nodes.
- `Match (n:Activity) return n LIMIT 50` - Shows 50 activity nodes.
- `Match (a:Activity) where a.swimlaneName = "Engineering Design (ED)" or a.swimlaneName = "Virtual Validation (VV)" return a` - Shows all activity nodes that belong to the Engineering Design or the Virtual Development swim lanes.
- `Match (n:Activity), (e:End), (p:Property) return n,e,p` - Shows all activity nodes, the start and end node and the dependencies of the activity nodes.
- `Match (n:Activity {number: "A0171"}) return n` - Shows the activity node with the number "A0171".
- `Match (n:Activity {name: "Creation of first test & build plan"}) return n` - Shows the activity node with the name "Creation of first test & build plan".
- `Match (n:Activity) detach delete n` - Delete all activities.
- `Match (a:Activity) WHERE NOT (:Activity) --> (a) return a` - Shows all nodes that do not have a predecessor.
- `match(t:Level1Team) return t.name, t.cumulativeResourceDistribution` - Return an array of headcounts for all level 1 teams against timing in days.

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Linked Projects

>[!projects] Linked Projects
>```dataview
TABLE WITHOUT ID file.link as "Linked Project", file.mday as "Last Modified"
FROM #project 
WHERE contains(technologies, this.file.link)
SORT length(file.inlinks) DESC
>```

>[!top] [Back to top](#Table%20of%20Contents)

### Unread Links

>[!reading] Unread Reading List
>```dataview
TASK
WHERE !completed AND !contains(file.path, "Template") AND text != "" AND contains(text, this.file.name)
GROUP BY file.link
LIMIT 100

>[!top] [Back to top](#Table%20of%20Contents)

### Read Links

>[!reading] Completed Reading List
>```dataview
TASK
WHERE completed AND !contains(file.path, "Template") AND text != "" AND contains(text, this.file.name)
GROUP BY file.link
LIMIT 100

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