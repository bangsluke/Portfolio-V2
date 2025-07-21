---
tags:
  - project
  - coding
  - travel
  - notes
  - portfolio
  - project/parked
created: 2025-05-16T09:29:00
modified: 2025-07-19T09:42:38+01:00
viewCount: 1
aliases:
  - Travel Journal
  - mytraveljournal
projectURL: https://bangsluke-mytraveljournal.netlify.app/
codeURL: https://github.com/bangsluke/mytraveljournal
codeMultipleRepos: true
deploymentServiceURL: https://app.netlify.com/projects/bangsluke-mytraveljournal/overview
folderURL: n/a
logoURL: n/a
imageURL: https://i.imgur.com/imI7zYI.png
dateStart: 2022-06-09
dateEnd: ""
technologies:
  - "[[Next.js]]"
  - "[[Apollo]]"
  - "[[Python]]"
  - "[[Neo4j]]"
  - "[[GitHub]]"
  - "[[Netlify]]"
  - "[[Heroku]]"
  - "[[Snyk]]"
  - "[[Google Cloud]]"
  - "[[Cypher]]"
  - "[[Neo4j Aura]]"
  - "[[NextAuth]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Holidays & Travel]]"
  - "[[Travel Notes]]"
powerShellAlias: travel
version: 2
portfolioOrder: 1
shortDescription: "A website to show details of my travels across the world."
longDescription: "A visualisation and analysis of the travelling I have done, providing descriptions of my trips and a level of analysis on top of this such as most visited places, most common travel companions and other stats."
lessonsLearned: "The biggest challenge for this project was setting up the <span class=\"theme-link\">Apollo</span> backend server and getting the connection to the front end.\nI also learned a lot about the page routing in <span class=\"theme-link\">Next.js</span> to develop the various page types on the site."
---

# Travel Website

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

A website to show details of my travels across the world.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A visualisation and analysis of the travelling I have done, providing descriptions of my trips and a level of analysis on top of this such as most visited places, most common travel companions and other stats.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: <span class="theme-link">Next.js</span>, <span class="theme-link">Apollo</span> Client
- Back end/Datasource: <span class="theme-link">Python</span>, <span class="theme-link">Neo4j</span>, <span class="theme-link">Neo4j Aura</span>, <span class="theme-link">Apollo</span> Server, <span class="theme-link">Cypher</span>
- Hosting: <span class="theme-link">GitHub</span> (see [Repositories](#repositories)), <span class="theme-link">Netlify</span> and <span class="theme-link">Heroku</span>
- Security: <span class="theme-link">Snyk</span>
- Authentication: <span class="theme-link">NextAuth</span>

>[!top] [Back to top](#Table%20of%20Contents)

### Database

- Local database is <span class="theme-link">Neo4j</span> desktop
- Production database is <span class="theme-link">Neo4j Aura</span>, kept active by some <span class="theme-link">Google Cloud</span> Cloud Functions and Cloud Scheduler
	- Cloud Functions - [Google Cloud Platform - Cloud Functions - MyTravelJournal](https://console.cloud.google.com/functions/list?env=gen2&cloudshell=true&project=mytraveljournal)
	- Cloud Scheduler - [Google Cloud Platform - Cloud Scheduler - MyTravelJournal](https://console.cloud.google.com/cloudscheduler?cloudshell=true&project=mytraveljournal)

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: https://github.com/bangsluke/bangsluke-backend-server - Backend server
- Archived secondary repo: https://github.com/bangsluke/server-mytraveljournal - Travel backend server

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the <span class="theme-link">PowerShell</span> alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Ideas & Design

### Ideas

- Use [Docusauras](https://docusaurus.io/) or Docify
- Load md files from Travel notes through a script to populate the site
- Use the <span class="theme-link">Obsidian</span> graph and have <span class="theme-link">Neo4j</span> queries running on the graph using <span class="theme-link">GraphQL</span>
- Have a count of key tags, e.g. count number of country tags there are for number of places visited
- Have a timeline component that shows the holidays plotted on a linear scale
- Add a chatbot to the site that allows a user to chat to the database. Write a statement such as "How many times has <span class="theme-link">Kieran Mackrell</span> been on holiday with <span class="theme-link">Luke Bangs</span>?" and then the text is identified into a cypher query and sent to the database and returns the answer. Should display the generated cypher query for debugging purposes. Get the chatbot front end visuals from the customer tool I made with Dom.
	- Not sure this is possible unless I am able to find a way to use a <span class="theme-link">OpenAI</span> API call to create a <span class="theme-link">GraphQL</span> query in the client
	- <https://www.apollographql.com/docs/apollo-server/schema/directives/>
- Add back to top Floating Action Button on all pages
- Add a heading per page in the below style. Add tags to holidays in the same style as the below bubbles for things such as “skiing”
- Use suspense in <span class="theme-link">React</span> for loading faster - [Efficient and Elegant Web Development with Next.js: A Deep Dive into Component Streaming and Chunked Transfer Encoding | by Momen Daoud | Nov, 2023 | Medium](https://medium.com/@momendaoud/efficient-and-elegant-web-development-with-next-js-6087b3fd86e1)

>[!top] [Back to top](#Table%20of%20Contents)

### Travel Note format

- Have all meta data in the front data of each note;
	- Attendees
	- Cover Photo
	- Location (City, Town or County etc)
	- Departing airport (set default if set as Unknown)
	- Have a Boolean value in the meta data about if to load into the graph or not (elevate to folders somehow maybe)
- Link back to Travel home
- Can get date from title

>[!top] [Back to top](#Table%20of%20Contents)

### Planned Pages

#### Home Dashboard 

- At the very top, have some big text about travel or adventure 

!<span class="theme-link">Country Page</span>
- Have the map greyed out like below with coloured tag markers to be visually in line with current red and white theme Of the site

!<span class="theme-link">20231009 MapIconInspiration.jpeg</span>

- Have key numbers below the map as shown below

!<span class="theme-link">20231009 MapStatsInspiration.jpeg</span>

- Possible libraries
	- [Home | React Google Maps](https://visgl.github.io/react-google-maps/)
	- <https://github.com/stellasia/neomap>
	- [React Simple Maps (react-simple-maps.io)](https://www.react-simple-maps.io/)
	- [yanivam/react-svg-worldmap: A simple, compact and free React SVG world map. (github.com)](https://github.com/yanivam/react-svg-worldmap)

>[!top] [Back to top](#Table%20of%20Contents)

#### Neo4j Graph Visualisation 

- Allow users to pan around and zoom into the graph like in <span class="theme-link">Neo4j</span>
- Allow users to click on nodes to jump to other pages
- Kevin to send link to visualiser
	- <https://www.npmjs.com/package/vis-react>
	- <https://medium.com/neo4j/15-tools-for-visualizing-your-neo4j-graph-database-ff7315873032>

>[!top] [Back to top](#Table%20of%20Contents)

#### Person Page

- Show how many holidays I've been on with that person
- List what locations and countries I've been to with that person

>[!top] [Back to top](#Table%20of%20Contents)

#### Country Page

- [REST Countries](https://restcountries.com/#rest-countries) - <span class="theme-link">API</span>
- Show the flag of the country
- Show all locations connected to that country
- Show how many times I've been to that country
- Show who I've been to that county with (a list of clickable people)

>[!top] [Back to top](#Table%20of%20Contents)

#### Location Page

- Show the country the place is in
- Add a Google Maps url link to it?
- Show how many times I've been to that location
- Show who I've been to that location with (a list of clickable people)

>[!top] [Back to top](#Table%20of%20Contents)

### Planned Features

- Highly connected set of pages
	- <span class="theme-link">GraphQL</span> - [Pass variables in call](https://youtu.be/YBP-waKYbnA?si=DYmKIROE3_uS1N_s)
- Use slugs for urls to create links between pages
	- <span class="theme-link">Next.js</span> - [Next.js Dynamic Routes](https://youtu.be/Ql5kyJaYbls?si=WE8sp-XLz5ASo8Pd)
- Have common layout component between pages 
	- [Simple Next.js Layout Tutorial](https://youtu.be/DGn25s42NvQ?si=b-hBV_gHT4rJCLRy)
	- <span class="theme-link">Next.js</span> - [Layouts turorials](https://youtu.be/zbYBgy_ChGY?si=Anh6wL8ZjB8758B7)
- Create reusable components such as a attendees list that is fed props such as an object of attendees names, ids and the slug to their page to create quick hyperlinks
- In the header, have a back button with a simple <span class="theme-link">JavaScript</span> back code (see Big Lynn 404 page) to get back to any previous page

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Travel Website Tasks](https://todoist.com/app/section/Travel-Website-6C4XfjXjf47p6WgC) - <span class="theme-link">Todoist</span>
- [Old my-travel-journal website](https://bangsluke-my-travel-journal.netlify.app/)
- [Old my-travel-journal GitHub Repo](https://github.com/bangsluke/my-travel-journal)
- [frontend-mytraveljournal GitHub Repo](https://github.com/bangsluke/frontend-mytraveljournal)
	- An attempt to change the <span class="theme-link">Next.js</span> front end to be app routing

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The biggest challenge for this project was setting up the <span class="theme-link">Apollo</span> backend server and getting the connection to the front end.

I also learned a lot about the page routing in <span class="theme-link">Next.js</span> to develop the various page types on the site.

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