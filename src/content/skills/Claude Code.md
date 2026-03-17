---
tags:
  - tag
  - software
  - coding
  - AI
  - skill
  - portfolio
modified: 2026-03-12T14:31:16+00:00
viewCount: 8
aliases:
skillRating: 45
skillDescription: Used for a couple of small automation projects to test out its capabilities with impressively good outcomes when utilised correctly.
logoFileName: claude_code.svg
---
# Claude Code

> [!back] Link back to [[Skills Notes]]

> [[Anthropic]]'s agentic coding tool using [[Claude]]

## Table of Contents

```table-of-contents
```

## Help/Guide

### Key Commands

#### Best Practices

| Practice                                     | Why it matters                                                                     |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| Initialise Claude using `/init`              | Creates the `CLAUDE.md` set up and provides the project context to [[Claude Code]] |
| Keep `CLAUDE.md` short and specific          | Long files cause important rules to be missed                                      |
| Use `/plan` before complex changes           | Review the approach before any code is written                                     |
| Use `/clear` between unrelated tasks         | Prevents context bleed; keeps responses accurate                                   |
| Provide a way to verify success              | Give Claude a test or expected output to check its own work                        |
| Use `@filename` instead of copy-pasting code | More reliable and saves context space                                              |
| Paste images with `Ctrl+V`                   | Include screenshots or mockups as visual context                                   |
| Use `Esc` to course-correct early            | Stops generation mid-stream; context is preserved                                  |
| Use `/compact` proactively                   | Compress long sessions before context fills up                                     |
| Name sessions with `/rename`                 | Makes it easy to `/resume` specific projects later                                 |

>[!top] [Back to top](#Table%20of%20Contents)

#### Slash Commands

##### Session

| Command | Description |
|---|---|
| `/clear` | Reset context window — use between unrelated tasks |
| `/compact [focus]` | Compress the conversation to free up context |
| `/resume [session]` | Resume a previous session by name or ID |
| `/rename <name>` | Name the current session for easy future reference |
| `/rewind` | Restore code and conversation to a previous state |
| `/exit` | Exit Claude Code |

##### Visibility 

| Command | Description |
|---|---|
| `/cost` | Show token usage and cost for this session |
| `/context` | Visualise how full the context window is |
| `/tasks` | List background tasks in progress |
| `/todos` | Show current TODO items |
| `/doctor` | Check Claude Code installation health |

##### Configuration

| Command | Description |
|---|---|
| `/model` | Switch model (Sonnet / Opus / Haiku) |
| `/plan` | Enter Plan Mode — read-only exploration before making changes |
| `/permissions` | Configure which tools run without prompting |
| `/memory` | Edit `CLAUDE.md` files |
| `/init` | Bootstrap a project by creating a `CLAUDE.md` |
| `/vim` | Toggle vim-style editing mode |

#### Utilities

| Command | Description |
|---|---|
| `/copy` | Copy the last response to clipboard |
| `/export [file]` | Save the conversation to a file |

---

#### Keyboard Shortcuts

| Shortcut | Description |
|---|---|
| `Ctrl+C` | Cancel input or stop generation |
| `Ctrl+D` | Exit Claude Code |
| `Esc` `Esc` | Rewind to a previous state or summarise from a selected message |
| `Shift+Tab` | Cycle permission modes (Auto → Plan → Normal) |
| `Shift+Enter` | New line in multi-line input |
| `Ctrl+G` | Open the current prompt in your external editor |
| `Ctrl+R` | Reverse-search command history |
| `Ctrl+L` | Clear the terminal screen (keeps conversation history) |

---

#### In-Prompt Shortcuts

| Syntax | Description |
|---|---|
| `@filename` | Reference a file — Claude reads it automatically |
| `!command` | Run a shell command directly, bypassing Claude |
| `/` at start | Browse and filter slash commands |

---

#### CLI Flags

| Flag | Description |
|---|---|
| `-p "prompt"` | Non-interactive (print) mode — run one prompt and exit |
| `-c` | Continue the most recent conversation |
| `-r "name"` | Resume a specific session by name or ID |
| `--model <name>` | Set the model (`sonnet`, `opus`, `haiku`) |
| `--permission-mode plan` | Start in Plan Mode |
| `--output-format json` | Return JSON output (useful in scripts and CI/CD) |

>[!top] [Back to top](#Table%20of%20Contents)

### MCP setup in Claude Code

[[Claude Code]] supports [[MCP]] servers at **three scopes** — local (just you, just this project), project (shared via git), and user/global (you, all projects):

```bash
# Add a GitHub MCP server globally
claude mcp add --scope user --transport stdio github \
  -- npx -y @modelcontextprotocol/server-github

# Add a Notion server for the current project (shared with team)
claude mcp add --scope project --transport http notion \
  https://mcp.notion.com/mcp

# List all configured servers
claude mcp list

# Remove a server
claude mcp remove github
```

Alternatively, edit the config files directly. User-scoped servers go in `~/.claude.json`; project-scoped servers go in `.mcp.json` at the project root. The [[JSON]] format is identical to Claude Desktop's:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token" }
    }
  }
}
```

Inside an active session, type `/mcp` to view the status of all connected servers.

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Claude Code overview - Claude Code Docs](https://code.claude.com/docs)

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