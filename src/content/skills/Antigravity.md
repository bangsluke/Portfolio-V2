---
tags:
  - tag
  - software
  - coding
  - AI
  - skill
  - portfolio
modified: 2026-04-10T10:04:47+01:00
viewCount: 6
aliases:
skillRating: 40
skillDescription: Used with a single project initially to establish the similarities and differences to Cursor and VS Code as an IDE.
logoFileName: antigravity.svg
---
# Antigravity

> [!back] Link back to [[Skills Notes]]

> [[Google]]'s [[AI]] integrated coding IDE

## Table of Contents

```table-of-contents
```

## Help/Guide

### MCP integration

Antigravity fully supports [[MCP]] and includes a **built-in MCP Store** - a marketplace where you can browse and one-click install servers for Firebase, Figma, Google Cloud services, and more.

To configure custom MCP servers, navigate to the Agent pane → `...` menu → MCP Servers → Manage MCP Servers → View Raw Config. This opens `~/.gemini/antigravity/mcp_config.json`:

```json
{
  "mcpServers": {
    "firebase": {
      "command": "npx",
      "args": ["-y", "firebase-mcp-server@latest", "mcp"]
    },
    "google-docs": {
      "serverUrl": "https://developerknowledge.googleapis.com/mcp"
    }
  }
}
```

The format mirrors the standard MCP configuration pattern used by Claude Desktop and Cursor. Per-workspace MCP configuration is not yet fully supported - it's a requested feature.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- n/a

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