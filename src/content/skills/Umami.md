---
tags:
  - skill
  - tag
  - portfolio
  - software
  - analytics
  - portfolio/discoveryRequirements
created: 2025-11-09 18:47
modified: 2026-04-14T17:47:21+01:00
aliases:
viewCount: 1
skillRating: 65
skillDescription: Utilised on a couple of projects, setting up and monitoring custom events to understand user usage for further ideation discovery.
logoFileName: umami.svg
---
# Umami

> [!back] Link back to [[Skills Notes]]

## Table of Contents 

```table-of-contents
```

## Locally Enabling/Disabling Umami

### Desktop

Use this if you just want your own browser visits excluded.

1. Open your website in the browser you use for testing.
2. Open Developer Tools (`F12` or right-click → Inspect).
3. Go to the Console tab.
4. Run: `localStorage.setItem('umami.disabled', 1);`
5. Refresh your site once.
6. Verify in Umami: browse your site for 1–2 minutes and confirm no new visits from your session are recorded.

To check that Umami is disabled, use `localStorage.getItem('umami.disabled')` and if it returns a 1, you have successfully turned off Umami.

To re-enable later: `localStorage.removeItem('umami.disabled');`

### Mobile

**Easiest mobile approach: bookmarklet**

1. On your phone, open any page and create a bookmark.
2. Edit that bookmark's URL to this: `javascript:localStorage.setItem('umami.disabled',1);alert('Umami disabled on this site');`
3. Go to your website in the same mobile browser.
4. Tap that bookmark once.
5. Refresh the page.

That browser on that phone is now excluded for that site.

To check that Umami is disabled, create and click a bookmark using `javascript:alert('Umami disabled on this site? ' + (localStorage.getItem('umami.disabled') === '1'));`. Click this to get a true/false about if Umami is tracking.

To re-enable later, use a second bookmarklet: `javascript:localStorage.removeItem('umami.disabled');alert('Umami enabled again');`

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Umami Documentation](https://umami.is/docs)

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