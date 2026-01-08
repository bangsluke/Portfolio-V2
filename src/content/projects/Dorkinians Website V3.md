---
tags:
  - project
  - notes
  - coding
  - sport
  - project/active
  - portfolio
created: 2025-05-30 09:40
modified: 2026-01-07T11:06:29+00:00
aliases:
viewCount: 35
projectURL: https://dorkinians-website-v3.netlify.app/
codeURL: https://github.com/bangsluke/Dorkinians-Website-V3
codeMultipleRepos: true
deploymentServiceURL: https://app.netlify.com/projects/dorkinians-website-v3/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.postimg.cc/Yq7Xvd7n/Dorkinians-Website.png
dateStart: 2025-08-14
dateEnd: ""
technologies:
  - "[[Next.js]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Node.js]]"
  - "[[Heroku]]"
  - "[[Google Apps Script]]"
  - "[[Google Sheets]]"
  - "[[Neo4j]]"
  - "[[Neo4j Aura]]"
  - "[[Snyk]]"
  - "[[Umami]]"
  - "[[Zustand]]"
projectCategory: Personal Design
linkedCompany:
  - "[[Dorkinians FC]]"
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Dorkinians FC]]"
  - "[[Football]]"
powerShellAlias: dorkinians
version: 3
portfolioOrder: 2
shortDescription: "The next version of the <span class=\"theme-link\">Dorkinians FC</span> stats website, following on from <a href=\"/projects/dorkinians-website\" class=\"theme-link\">Dorkinians Website</a>."
longDescription: "Building on the foundations of the previous <a href=\"/projects/dorkinians-website\" class=\"theme-link\">Dorkinians Website</a>, the new site aims to provide deeper analysis of the available stats and clearer display across player, team and club statistics.<br><br>It is built as a <span class=\"theme-link\">PWA</span>, allowing a more native experience with a chatbot key feature for users to ask questions to."
lessonsLearned: "One of the lessons learned was learning how to deal with <span class=\"theme-link\">Netlify</span>'s 30 second timeout limit for functions, where my initial script was timing out on every run. Splitting the database seeding code out into <span class=\"theme-link\">Heroku</span> and optimising the script run time was sufficient to get the script up working remotely with email notifications and job id tracking for status updates.<br><br>I also learned how to set up a <span class=\"theme-link\">PWA</span> to work across <span class=\"theme-link\">iOS</span> and Android mobile devices and feel like a native app, whilst working on desktop as well.<br><br>To make the chat bot work, I utilised test driven development, defining the tests for questions and answers expected and then developing the chat bot logic from that.<br><br>I learned how to test and check memory build ups to avoid crashes within the <span class=\"theme-link\">Heroku</span> limit I was working within and set up an Admin dashboard within the site for job monitoring and triggering.<br><br>For the table data, I discovered the FA Site to have a very good bot detection system but an awful <span class=\"theme-link\">API</span> for developers to use and so automating the data updates was a pain point I had to use an external ScraperAPI service for.<br><br>In the frontend, I was able to implement skeleton loaders and optimise data fetching orders to prioritise important visible data to users to make the app feel fast and efficient.<br><br>TBC"
name: "Dorkinians Website V3"
---
# Dorkinians Website V3

> [!back] Link back to [[01 Projects|Projects]]

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

> - [Analytics Tracking - Umami](https://cloud.umami.is/analytics/eu/websites/351bdc1f-abd3-4b55-8e6f-23b3693b13b4)

## Table of Contents

```table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

The next version of the [[Dorkinians FC]] stats website, following on from [[Dorkinians Website]].

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

Building on the foundations of the previous [[Dorkinians Website]], the new site aims to provide deeper analysis of the available stats and clearer display across player, team and club statistics.

It is built as a [[PWA]], allowing a more native experience with a chatbot key feature for users to ask questions to.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Next.js]]
- Back end/Datasource: [[Node.js]], [[Neo4j]], [[Neo4j Aura]], [[Google Sheets]], [[Google Apps Script]]
- Hosting: [[GitHub]] (see [Repositories](#repositories)), [[Netlify]], [[Heroku]]
- Security: [[Snyk]], TBC
- Authentication: n/a
- Analytics: [[Umami]]

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: <https://github.com/bangsluke/Database-Dorkinians>

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [[PowerShell]] alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

> See [Dorkinians Website V3 - Canva](https://www.canva.com/design/DAGwJMmyAK4/YfKMelRI9L8Vzz-vAeUC7Q/edit?utm_content=DAGwJMmyAK4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) for the design

>[!top] [Back to top](#Table%20of%20Contents)

### AI Prompt

#### Initial Prompt

```
Act as a senior software architect and take in all my information before coming to any decisions. I will outline frontend and backend/data information. Do not start writing any code yet, but feel free to summarise my request into a file for future you to read if that helps.

I am building a statistics website for a sports team. Please act as a senior software architect and take my requirements in below and provide a recommendation for the best tech stack that will deliver the best results. Provide as much detail and sources to any suggestions for the frontend and backend setup.

The ultimate dream is to have a PWA chatbot app feel that is able to process a user's questions and then return answers based on the statistics, ideally generating its own graphical components to visualise these results such as with column charts or calendar looking components with values on it. Components similar to these will be used on other pages so the chatbot could re-use these.

Example questions are provided in the "example_questions.md" file along with an "Expected_Ouput_Type" (the format of component I would like the answer to be provided in - details provided later) and a "Data_Source" to help give the chatbot some direction on which data source to check (stored in the "data_sources.json" file, split between two main sources; "StatsData" with the CSV links to the Google Sheet data and "FASiteData" with URL links to FA Site data.

Developer Details: The website will be maintained by me alone, and I have experience in JavaScript including React, Vite, Astro and Next and have some experience in Python, however I would be willing to learn new technologies. Hosting wise, I have used Netlify and GitHub pages before.

Site Requirements: The site should be fast to load and accessible on weaker connections. Costs should be kept to a minimum.

There is no need for the front end to have any kind of write access to the backend, it is purely there to display the existing data.

I would like to be told of the limitations that are possible for my requests from the start where possible.

If at any point you require more information from me such as details or screenshots, request them.
```

>[!top] [Back to top](#Table%20of%20Contents)

#### Backend Prompt

```
Data: The football club stats data is stored in a Google Sheets file because that is how it is entered. This setup is non-negotiable.

The Google Sheets are published to the web, available as CSVs, via links such as "https://docs.google.com/spreadsheets/d/e/2PACX-1vSTuGFCG-p_UAnaoatD7rVjSBLPEEXGYawgsAcDZCJgCSPyNvqEgSG-8wRX7bnqZm4YtI0TGiUjdL9a/pub?gid=0&single=true&output=csv" - all of which are listed in the "data_sources.json" file in the "StatsData" object.

Data size: The Google Sheets file is tens of thousands of rows and may be up to 50 columns on some tables

The data is updated usually once a week, although ideally I'd like a schedule set to automatically refresh the sites data each day, although it would be nice to be able to customise the regularity. I also need emails sent to me if the data update fails.

Confirm to me if you can consume and read the data from the URLs. I could provide some CSV downloads if it was needed, but the real data flow needs to work with the published CSV URLs.

Within the "data_sources.json" file there is also an object called "FASiteData" holding a couple of example URLs from the FA's website, holding team results and league tables that should also be considered and used for answering questions in the front end, so if easier/better for the speed of the app, they should be also stored in the database. Confirm if you can read and use the table and results data from them.

I have a Neo4j Aura database where I can store the data if this best suites the use case for the project. I have added connection details to the `.env` file in the repo.

However the backend forms, it should ultimately allow for the front end to quickly collate the data it needs to answer the questions users will give it.

The stats data should be available for read only for the front end and should not be readable by other sites.
```

>[!top] [Back to top](#Table%20of%20Contents)

#### Frontend Prompt

```
The frontend should be developed for mobile devices first and will later be extended to desktop.

The website should feel native like on both iOS and Android devices with natural swipe actions.

When you initially start writing code, for now just create a page with a chatbot style input bar in the center of the screen. This will be known as the homepage of the app.

More features will be added later but the app will have several screens and be left/right swipable to each screen with a footer containing icons linking to each page and a settings menu. Other screens (and summaries of their features):
- Stats (a page that lists all of a selected players stats, such as how many goals they've scored, how many games they've played etc with some graphical components. It will also have a filter section to filter the data down to such things as just just showing stats from Cup games, or within a date range. Users will also be able to see Club Stats, Team Stats and a comparison screen between two player's stats on this screen)
- TOTW (team of the week - a page that shows a graphic showing the top scoring players across the club with clickable SVG images to show more details)
- Club Information (a simple display page that will just show names of captains, awards won etc, all of which is in the CSV data)
- Settings (some app settings that include information about the site)
```

>[!top] [Back to top](#Table%20of%20Contents)

### Cursor Project Rule

> To be applied within [[Cursor]] as a project rule

```
Dorkinians FC (also referred to as "Old Dorkinians") is a family friendly amateur football (soccer) club based in Surrey, UK.

It has several senior teams and the number may change season by season from a minimum of 5 senior teams to up to 8 teams. There is also a Vets team (Veterans who are over 35).

Commonly the teams are referred to in a variety of ways. For example, the 3rd team may be called the "3rd XI", "Thirds", "3s" or other similar variants. In the data, they are referred to as the "3rd XI".
```

>[!top] [Back to top](#Table%20of%20Contents)

### Schema

#### Initial Schema Proposal

- Team
	- Name: 3s
	- Aliases: Thirds
- Player
	- Name
- Fixture
	- Date
	- WeekNum
	- Type: League, Cup, Friendly
	- HomeTeam 
	- AwayTeam 
- Opposition
	- Name
	- Address

>[!top] [Back to top](#Table%20of%20Contents)

#### Existing Schema Summary

TBC - Ask AI to summarise the Schema

>[!top] [Back to top](#Table%20of%20Contents)

### AI Chatbot Context

#### New Question Processing Logic

```prompt
When processing a chatbot question, the logic will need to be able to break the question down into identified entities:

entity: The {entity_x} is the identified entity that the question is asking about. It could be the selected Player node, "I" or directly through the user referencing their own name "Luke Bangs" in the question, or it could be a Team, Fixture, WeeklyTOTW, SeasonTOTW, PlayersOfTheMonth or CaptainAndAwards item. There can be up to three entities processed in a question, for example the chatbot should be expected to answer a question comparing three player nodes, "How many goals have I, Kieran Mackrell and Ali Robins scored?". For more than three entities, the chatbot should try and answer the question but clarify that the question may be too complex for it. The chatbot should identify all entities (e.g. {entity_1}, {entity_2} etc) and understand if it needs to answer about them and return answers for those it needs to.

	entity could be any of the following values and any of their pseudonyms: "I", "I've", "Me", "My", "Pixham", any PlayerName, Team, Fixture, WeeklyTOTW, SeasonTOTW, PlayersOfTheMonth or CaptainAndAwards item or any league name

statType: The {statType} is the identified stat type that the question needs an answer on. There can be up to three stat types in a question and the chatbot needs to be able to handle these. Again, if more than three stat types are in the question, the chatbot logic should try to answer but clarify about the complexity.

	statType could be any of the following values and any of their pseudonyms: "Goals", "Apps", "Double Game Weeks", "Team of the Week", "Score", "Awards", "Leagues", "Penalty record", "Home", "Away"

statIndicator: This indicator tells the chatbot which version of the stat to return. It could be at the maximum: "What opposition have I scored the most goals against" with "most" being the indicator, the minimum "What opposition have I scored the least goals against?" with "least" being the indicator, or an "average".

    statIndicator could be any of the following values and any of their pseudonyms: "Highest", "Lowest", "Longest", "Shortest"

questionType: The chatbot needs to be able to extract the type of data that the user is asking for. For example, "How many" would be a numeric answer, "Where did" could be a location or a number related to a position (such as a league table finish). "Who" could be a Player, Team or OppositionDetail name.

	questionType could be any of the following values and any of their pseudonyms: "How", "How many", "Where", "Where did", "What", "What's", "Who", "Who did", "Which"

negativeClause: The logic needs to also look for a negative clause. If a questions suddenly uses negative words such as "not", "excluding" or "without", the chatbot needs to process this to exclude it from its search. For example, a question such as "How many goals has Luke Bangs scored excluding the 2s?" should allow the chatbot to return all goals scored by Luke Bangs not including any whilst playing for the 2nd XI.

location: The chatbot needs to be able to recognise locations that the user mentions and then return the stats related to that location. Examples will be "home", "away" or the name of a ground such as "Pixham". There can be up to two {location_x} types in a question and the chatbot needs to be able to handle these.

	location could be any of the following values and any of their pseudonyms: "Home", "Away", "Away from home"

timeFrame: The chatbot also needs to be able to recognise time frames so if I said "after the 15th of November 2021" it needs to be able to extract that date and then use that within the queries to understand which match details nodes to return the stats from. It needs to process season references in all their forms ("2020/21", "2020/2021", etc ) and also be able to process the dates that a season extends over (look at the "seasonStartDate" and "seasonEndDate" properties on the Season nodes). Time frames could also be in the form "first weekend of 2021" for example or "second gameweek of the 2023/24 season". For seasons, the data goes back as far as the 2016/17 season but no earlier. Seasons will continue to be added each year to the database.

	timeFrame could be any of the following values and any of their pseudonyms: "A week", "A month", "A game", "A weekend", "A season", "consecutive streak of weekends", "First week of 2021/22", "Between date 1 and date 2"

If there is any mention of "goal involvements", this means that the stat the user is looking for is the sum of their goal and assists.

Integrate the above logic into the current chat bot set up, prioritising the above logic of breaking down a question to extract the required information, but keeping existing general rules like singular wording if the value is 1 etc. In the "example_questions.md" file, I have added a proposed "Question_Breakdown" per question, but this is for reference and you can improve on it's logic. Ask any question you require for clarification.

*Word pseudonyms*

"Goals" - "Scoring", "Prolific"
"Apps" - "Appearances", "Played", "Played With"
"Team of the Week" - "TOTW"
"Leagues" - "League Titles"
"Penalty record" - "Penalty conversion rate"
"Away" - "Away from home"
"PlayersOfTheMonth" - "Top player"

When adding the above logic, additionally add any pseudonyms and antonyms you can think of and I will review them. The pseudonyms should be case insensitive.

TBC

```

>[!top] [Back to top](#Table%20of%20Contents)

#### Old AI Chatbot Context

> To be provided as context to the chatbot within the site to help it accurately answer questions - Copy into the `context/chatbot_context.md` file

```
Dorkinians FC (also referred to as "Old Dorkinians") is a family friendly amateur football (soccer) club based in Surrey, UK. As such, strike a friendly and helpful tone when responding.

It has several senior teams and the number may change season by season from a minimum of 5 senior teams to up to 8 teams. There is also a Vets team (Veterans who are over 35).

Commonly the teams are referred to in a variety of ways. For example, the 3rd team may be called the "3rd XI", "Thirds", "3s" or other similar variants. If you are ever unsure what team a user is trying to refer to, request clarification.

If a user asks for data for a year and just provide a single year such as 2022, return the result as the stats from that calendar year but make sure to specify it is the calendar year. If they provide a correct season (e.g. "2017-2018", "2017-18" or "17-18") then clarify in your answer the season number in the form "YYYY-YY".

If the answer provided is by using the FA Site data related to specific results or league tables, provide the use a URL link directly to the source of the answer.
```

>[!top] [Back to top](#Table%20of%20Contents)

### Example User Questions

> Copy out into markdown file `example-data/example_questions.md` in the repo

```
|Question|Expected_Output_Type|Data_Source|
| --- | --- | --- |
|How many goals have I scored for the 3rd team?|NumberCard|StatsData|
|Where did the 2s finish in the 2017/18 season?|Table|FASiteData|
|What was the highest scoring game that the 1s achieved in the 2020-2021 season?|NumberCard|FASiteData|
|How many games have I played with James Tain?|NumberCard|StatsData|
|What's the longest consecutive streak of weekends that I've played in a row?|Calendar|StatsData|
|Who did the fourth team play on the first weekend of 2023?|NumberCard|FASiteData|
|How many double game weeks have I played?|NumberCard|StatsData|
|How many clean sheets have I had in a row?|Calendar|StatsData|
|Who will reach the next 100 goal milestone?|Table|StatsData|
|How many times have I been in Team of the Week?|NumberCard|StatsData|
|What's the highest score I have had in a week?|NumberCard|StatsData|
|How many consecutive games have I scored/assisted/had a goal contribution?|Calendar|StatsData|
|How many goals did the 2nd team score during the 2017/18 season?|NumberCard|FASiteData|
|Which team has conceded the fewest goals in history?|Table|StatsData|
```

>[!top] [Back to top](#Table%20of%20Contents)

### Backend (Data Extraction)

#### Requirements

- Regular updating of the data from [[Google Sheets]] into the [[Neo4j Aura]] instance (scheduled every day?)

>[!top] [Back to top](#Table%20of%20Contents)

### Frontend

#### UI Design

- When the user loads the site, they first pick their name from a drop-down list which is searchable and once they pick their name a chat bar appears and they can ask questions (with some question examples provided)
- Once they've asked questions such as "how many goals have I scored" the AI will create a metric or some visualisation to show the result. For example, if the person mentions anything to do with how many games in a row have I done something, the AI visualises a calendar with values marked on the relevant days.

>[!top] [Back to top](#Table%20of%20Contents)

### Future Features

- Add a query parameter to the URL for the player name/team name etc so that links can be shared. If that query is populated, on website load, jump to that screen
- Turn into downloadable PWA - <https://christianheilmann.com/2022/01/13/turning-a-github-page-into-a-progressive-web-app/>
- How do I make the website easily packaged and customisable for other clubs?
	- Config file
	- Pick a club logo
	- Select a colour scheme
	- Select number of teams
	- Select which stats to show

>[!top] [Back to top](#Table%20of%20Contents)

### Pages

#### Homepage

- Pick player name
	- Store the name in local storage for caching in case of page reload
- Chatbot appears to ask and answer questions
- Have a ticker tape along the bottom that says headlines like "Pete Davidson reaches 50th goal", "1s win again" etc

>[!top] [Back to top](#Table%20of%20Contents)

#### Stats

- Allow user to swipe between different stats screens (Player Stats, Club Stats, Team Stats, Comparison)

##### Player Stats

- Add a filter button in the top right that allows the user to filter the stats;
	- Between: This Season and All Time
	- For game type: League, Cup, Friendly
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
- For stats filtering, follow the guidance in [this article](https://uxmovement.medium.com/how-to-handle-a-massive-filter-with-over-100-options-dc8b1966d3c7)

>[!top] [Back to top](#Table%20of%20Contents)

##### Team Stats

- Show the top 5 player appearances for the team
- Points per game - value between 0 and 3

>[!top] [Back to top](#Table%20of%20Contents)

##### Club Stats

- Show the top 5 player appearances for the full club
- TBC

>[!top] [Back to top](#Table%20of%20Contents)

##### Comparison

- Allow comparison of players and also teams
	- At the top, have a dropdown to switch between "Player Comparison" and "Team Comparison"
- Style similar to Player Stats screen

>[!top] [Back to top](#Table%20of%20Contents)

#### TOTW

##### Team of the Week

- Full screen graphic like in FPL with a dropdown above it to change the displayed year and week
- Each player is clickable to show a pop up modal about details on that player
	- When clicking on a player, in the pop up, show what team(s) they played for that week
- Have FTP players of the Month below
- TBC

##### FTP Players of the Month

- Like the old site

> [!top] [Back to top](#Table%20of%20Contents)

#### Club Information (Tab)

- Have a dropdown at the top to allow the user to switch between any of the below sub sections

##### Club Information

- Top level information on the club such as founding date and home pitch locations

##### Match Information

- Investigate if the FA have improved their API for pulling in leagues and fixtures
- List the upcoming weeks games for all teams

##### Tables

- List the league tables of teams by season

##### Club Captains

- List club captains under a season drop down

##### Club Awards

- List club awards under a season drop down

##### Useful Links

- Provide a list of useful links for players
	- Main [[Dorkinians FC|Dorkinians]] website
	- Etc

>[!top] [Back to top](#Table%20of%20Contents)

#### Settings

- Don't have as a footer featured page, but have a settings icons somewhere
- Include all previous old settings
- Have a navigation bar to allow the user to jump to any of the sub sections of the website

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Neo4j Aura database](https://console-preview.neo4j.io/projects/7a5b41a0-6373-5c3c-9fcf-48b80d5d38f2/instances)
- [Dorkinians Website Tasks](https://todoist.com/app/section/Dorkinians-Website-6C4XfJFRgpfFpJgC) - [[Todoist]]
- [Dorkinians Website V3 Data - Google Sheets](https://docs.google.com/spreadsheets/d/1ehzr_nOlsBNF0YSY24szQOO5E_XB96HQdQSLWzYNp_c/edit?gid=110649311#gid=110649311&range=A1)
- [Dorkinians Website V3 - Canva](https://www.canva.com/design/DAGwJMmyAK4/YfKMelRI9L8Vzz-vAeUC7Q/edit?utm_content=DAGwJMmyAK4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- Lists and feeds
	- [Medium Stories list](https://medium.com/@bangsluke/list/410a590e0a2b)
	- [Reddit research custom feed](https://www.reddit.com/u/bangsy3/s/TH55ZZSU5J)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

One of the lessons learned was learning how to deal with [[Netlify]]'s 30 second timeout limit for functions, where my initial script was timing out on every run. Splitting the database seeding code out into [[Heroku]] and optimising the script run time was sufficient to get the script up working remotely with email notifications and job id tracking for status updates.

I also learned how to set up a [[PWA]] to work across [[iOS]] and Android mobile devices and feel like a native app, whilst working on desktop as well.

To make the chat bot work, I utilised test driven development, defining the tests for questions and answers expected and then developing the chat bot logic from that.

I learned how to test and check memory build ups to avoid crashes within the [[Heroku]] limit I was working within and set up an Admin dashboard within the site for job monitoring and triggering.

For the table data, I discovered the FA Site to have a very good bot detection system but an awful [[API]] for developers to use and so automating the data updates was a pain point I had to use an external ScraperAPI service for.

In the frontend, I was able to implement skeleton loaders and optimise data fetching orders to prioritise important visible data to users to make the app feel fast and efficient.

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