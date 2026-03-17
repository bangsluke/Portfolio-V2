---
tags:
  - tag
  - software
  - coding
  - AI
  - skill
  - portfolio
modified: 2026-03-12T14:32:49+00:00
viewCount: 5
aliases:
skillRating: 65
skillDescription: Used daily as part of my workflow process, handing over basic tasks to the integrated AI agent, scoped to work within my defined rules and building out on the planning feature within the tool.
logoFileName: cursor.svg
---
# Cursor

> [!back] Link back to [[Skills Notes]]

> [[AI]] integrated coding IDE

## Table of Contents

```table-of-contents
```

## Help/Guide

### MCP integration in Cursor

[[MCP]] servers extend Cursor's Agent mode with external tools. Configuration goes in a [[JSON]] file at either the **project level** (`.cursor/mcp.json`) or **global level** (`~/.cursor/mcp.json`):
 
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your-token" }
    },
    "supabase": {
      "url": "https://mcp.supabase.com"
    }
  }
}
```

You can also configure servers through the UI: **Cursor Settings → Tools & MCP → New MCP Server**. Many popular servers now offer "Add to Cursor" one-click buttons on their documentation pages.

**Important limitation:** Keep **~40 active tools or fewer** across all connected MCP servers. Beyond that threshold, the agent's ability to select the right tool degrades. Disable servers you're not actively using.

MCP tools only work in **Agent mode** (not Ask mode). After adding a server, you may need to click the refresh button in Tools & MCP settings to populate the tool list.

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