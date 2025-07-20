---
tags:
  - project
  - portfolio
  - notes
  - coding
  - sport
  - project/parked
created: 2025-05-30 09:40
modified: 2025-07-19T09:39:19+01:00
aliases: 
viewCount: 14
projectURL: TBC
codeURL: TBC
codeMultipleRepos: false
deploymentServiceURL: TBC
folderURL: n/a
logoURL: n/a
imageURL: TBC
dateStart: ""
dateEnd: ""
technologies: 
projectCategory: Personal Design
linkedCompany:
  - "[[Dorkinians FC]]"
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Dorkinians FC]]"
  - "[[Football]]"
powerShellAlias: TBC
version: 2
portfolioOrder: 4
shortDescription: "TBC\nthe next version of the <span class=\"theme-link\">Dorkinians FC</span> website, following on from <a href=\"/portfolio/projects/Dorkinians Website\" class=\"theme-link\">Dorkinians Website</a>"
longDescription: "TBC"
lessonsLearned: "TBC"
---
# Dorkinians Website V2

> [!back] Link back to <span class="theme-link">Projects</span>

>[!website-link] Links
> ```dataview
TABLE WITHOUT ID this.projectURL as "Project URL Link"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID this.codeURL as "Codebase URL Link"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID choice(this.codeMultipleRepos = true, link("#repositories","True - Click for link"), "False") as "Multiple Repos"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID this.deploymentServiceURL as "Deployment Service Link"
WHERE file = this.file

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents

```table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

TBC

the next version of the <span class="theme-link">Dorkinians FC</span> website, following on from <a href="/portfolio/projects/Dorkinians Website" class="theme-link">Dorkinians Website</a>

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: TBC
- Back end/Datasource: TBC
- Hosting: <span class="theme-link">GitHub</span> (see [Repositories](#repositories)), TBC
- Security: TBC
- Authentication: TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the <span class="theme-link">PowerShell</span> alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- TBC

>[!top] [Back to top](#Table%20of%20Contents)

### ChatGPT Prompt

```chatgpt prompt

I am building a website for a sports team. Please act as a senior software architect and take my requirements in below and provide a recommendation for the best tech stack that will deliver the best results. Provide as much detail and sources to any suggestions for the frontend and backend setup.


Data: The data is stored in a Google Sheets file. It somehow needs to be drawn in from this sheet with some pre-processing scripts if required

Data size: The Google Sheets file is tens of thousands of rows and up to 50 columns 

Developer Details: The website will be built by a single developer who has experience in JavaScript including React, Vite and Next and has some experience in Python, however he would be willing to learn new technologies. Hosting wise, he has used Netlify and GitHub pages before.

Site Requirements: The site should be fast to load and accessible on weaker connections. Costs for hosting should be kept to a minimum.

Authentication: The site should be secure behind a single password.

```

>[!top] [Back to top](#Table%20of%20Contents)

### Technical Questions

- How do I store the stats data ready for the website to quickly retrieve and display the information?
	- Requirements 
		- Keep using <span class="theme-link">Google Sheets</span> for stat input 
		- Automatically update the database daily from the <span class="theme-link">Google Sheets</span>
- How do I make the website easily packaged and customisable for other clubs?
	- Config file
	- Pick a club logo
	- Select a colour scheme
	- Select number of teams
	- Select which stats to show

>[!top] [Back to top](#Table%20of%20Contents)

### Pages

#### TOTW

- When clicking on a player, in the pop up, show what team(s) they played for that week
- Have FTP players of the Month below
- TBC

>[!top] [Back to top](#Table%20of%20Contents)

#### Player Stats

!<span class="theme-link">20241201 Player Stats Page Design.jpeg</span>

- Two swipable tabs;
	- This Season 
	- All Time
- Top Info Section 
	- Show an icon that shows a GK, DEF, MID or a FWD based on the position the player has played most 
	- Player Name
	- Show what team each player has played for most for the current season and list them in that team
- Middle Stats Section
	- Have main stats listed (e.g. goals, apps, assists etc) and then hide more advanced stats details like goals per game in a hover over
	- Points per game - value between 0 and 3
	- Most played with player (find some form of max function that allows this?)
- Bottom Graph Section
	- Display below all the main stats as part of scrollable screen
	- Graph like pictured showing goal distribution per team

>[!top] [Back to top](#Table%20of%20Contents)

#### Team Stats

- Points per game - value between 0 and 3
- Top 5 player appearances 

>[!top] [Back to top](#Table%20of%20Contents)

#### Club Stats

- Points per game - value between 0 and 3 !<span class="theme-link">20241001 - PointsPerGame.jpeg</span>
- Top 5 player appearances 
- Have the below background behind the stats? !<span class="theme-link">20241001 - Stats Background.png</span>

>[!top] [Back to top](#Table%20of%20Contents)

#### Comparison

- Allow comparison of players and also teams
- Style similar to Player Stats screen

>[!top] [Back to top](#Table%20of%20Contents)

#### Match Information

- Investigate if the FA have improved their API for pulling in leagues and fixtures - if not, remove as a page

>[!top] [Back to top](#Table%20of%20Contents)

#### Club Information

- Don’t show as full page in main nav, but have it in the expanded sidebar
- List club captains
- List awards
- Have a list dedicated to key links for players

>[!top] [Back to top](#Table%20of%20Contents)

### Ideas

#### Easy Ideas

- Login
	- Optional pop up to select a player - stored in cookies. Then filters the site down to that players team first
		- If player selected, go to that players stats
		- If no player selected, go to TOTW
- For stats filtering, follow the guidance in [this article](https://uxmovement.medium.com/how-to-handle-a-massive-filter-with-over-100-options-dc8b1966d3c7) 
	- !<span class="theme-link">20241001 - Stats Filters.png</span>

>[!top] [Back to top](#Table%20of%20Contents)

#### Medium Ideas

- Every time a player, team or club is mentioned on a screen, provide a hyperlink to it
- Turn into downloadable PWA - https://christianheilmann.com/2022/01/13/turning-a-github-page-into-a-progressive-web-app/

>[!top] [Back to top](#Table%20of%20Contents)

#### Crazy Ideas

- Show the players that each player has played with most - likely needs a graph db
- Add a chatbot to the site that allows a user to chat to the database. Write a statement such as "How many times has <span class="theme-link">Kieran Mackrell</span> played against Wandsworth?" and then the text is identified into a cypher query and sent to the database and returns the answer. Should display the generated cypher query for debugging purposes.
	- Not sure this is possible unless I am able to find a way to use a <span class="theme-link">OpenAI</span> API call to create a <span class="theme-link">GraphQL</span> query in the client
- Have a map component that looks up the locations that each player has played at (using the locations postcodes) to show where the player has played. Bigger circle on the map shows more times played

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Dorkinians Website Tasks](https://todoist.com/app/section/Dorkinians-Website-6C4XfJFRgpfFpJgC) - <span class="theme-link">Todoist</span>
- [Medium Stories list](https://medium.com/@bangsluke/list/410a590e0a2b)
- https://dribbble.com/
- https://mobbin.com/browse/web/apps
- https://www.awwwards.com/
- [Reddit research custom feed](https://www.reddit.com/u/bangsy3/s/TH55ZZSU5J)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

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