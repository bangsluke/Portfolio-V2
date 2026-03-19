---
tags:
  - tag
  - skill
  - concept
  - product
  - portfolio
  - portfolio/planningDelivery
created: 2026-03-05
modified: 2026-03-19T07:47:20+00:00
viewCount: 4
aliases:
skillRating: 10
skillDescription: TBC
logoFileName: n/a
---
# North Star Metric

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Description

The North Star Metric is a **single, guiding measure** that captures the core value your product delivers to customers. It aligns teams around a shared definition of success and helps ensure that day‑to‑day decisions contribute to long‑term growth. It's often paired with supporting inputs (like activation or retention) but remains the primary indicator of whether the product is truly creating value.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Every Product Needs a North Star Metric: Here's How to Find Yours - Amplitude](https://amplitude.com/blog/product-north-star-metric)
- [North Star Metric Resources - Amplitude](https://amplitude.com/north-star-hub)
- [The North Star Playbook - Amplitude](https://drive.google.com/file/d/1sxetG7xkNnPPZhKRKT4co-Qj6zG2Xj7X/view?usp=drivesdk)

>[!top] [Back to top](#Table%20of%20Contents)

## Skill

```meta-bind  
INPUT[progressBar(title(Skill Rating), minValue(0), maxValue(100)):skillRating]  
```

>[!top] [Back to top](#Table%20of%20Contents)

## Skill Description

`=this.skillDescription`

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