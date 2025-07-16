---
tags:
  - project
  - coding
  - travel
  - notes
  - portfolio
  - project/parked
  - Travel Journal
  - mytraveljournal
  - "[Next.js](#next.js)"
  - "[Apollo](#apollo)"
  - "[Python](#python)"
  - "[Neo4j](#neo4j)"
  - "[GitHub](#github)"
  - "[Netlify](#netlify)"
  - "[Heroku](#heroku)"
  - "[Synk](#synk)"
  - "[Google Cloud](#google-cloud)"
  - "[Cypher](#cypher)"
  - "[Neo4j Aura](#neo4j-aura)"
  - "[NextAuth](#nextauth)"
  - n/a
  - "[Luke Bangs](#luke-bangs)"
  - "[Holidays & Travel](#holidays-&-travel)"
  - "[Travel Notes](#travel-notes)"
---
# Travel Website

> **BACK:** Link back to [Projects](#01-projects)

>[!website-link] Links
> 
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID this.projectURL as "Project URL Link"
WHERE file = this.file
>
-->

>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID this.codeURL as "Codebase URL Link"
WHERE file = this.file
>
-->

>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID choice(this.codeMultipleRepos = true, link("#repositories","True - Click for link"), "False") as "Multiple Repos"
WHERE file = this.file

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents


-->
table-of-contents
```

## Introduction

A note for storing ideas on building the next version of My Travel Journal website.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A website to show details of my travels across the world.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A visualisation and analysis of the travelling I have done, providing descriptions of my trips and a level of analysis on top of this such as most visited places, most common travel companions and other stats.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [Next.js](#next.js), [Apollo](#apollo) Client
- Back end/Datasource: [Python](#python), [Neo4j](#neo4j), [Neo4j Aura](#neo4j-aura), [Apollo](#apollo) Server, [Cypher](#cypher)
- Hosting: [GitHub](#github) (see [Repositories](#repositories)), [Netlify](#netlify) and [Heroku](#heroku)
- Security: [Synk](#synk)
- Authentication: [NextAuth](#nextauth)

>[!top] [Back to top](#Table%20of%20Contents)

### Database

- Local database is [Neo4j](#neo4j) desktop
- Production database is [Neo4j Aura](#neo4j-aura), kept active by some [Google Cloud](#google-cloud) Cloud Functions and Cloud Scheduler
	- Cloud Functions - [Google Cloud Platform - Cloud Functions - MyTravelJournal](https://console.cloud.google.com/functions/list?env=gen2&cloudshell=true&project=mytraveljournal)
	- Cloud Scheduler - [Google Cloud Platform - Cloud Scheduler - MyTravelJournal](https://console.cloud.google.com/cloudscheduler?cloudshell=true&project=mytraveljournal)

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: https://github.com/bangsluke/bangsluke-backend-server - Backend server
- Archived secondary repo: https://github.com/bangsluke/server-mytraveljournal - Travel backend server

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [PowerShell](#powershell) alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Ideas & Design

### Ideas

- Use [Docusauras](https://docusaurus.io/) or Docify
- Load md files from Travel notes through a script to populate the site
- Use the [Obsidian](#obsidian) graph and have [Neo4j](#neo4j) queries running on the graph using [GraphQL](#graphql)
- Have a count of key tags, e.g. count number of country tags there are for number of places visited
- Have a timeline component that shows the holidays plotted on a linear scale
- Add a chatbot to the site that allows a user to chat to the database. Write a statement such as "How many times has [Kieran Mackrell](#kieran-mackrell) been on holiday with [Luke Bangs](#luke-bangs)?" and then the text is identified into a cypher query and sent to the database and returns the answer. Should display the generated cypher query for debugging purposes. Get the chatbot front end visuals from the customer tool I made with Dom.
	- Not sure this is possible unless I am able to find a way to use a [OpenAI](#openai) API call to create a [GraphQL](#graphql) query in the client
	- <https://www.apollographql.com/docs/apollo-server/schema/directives/>
- Add back to top Floating Action Button on all pages
- Add a heading per page in the below style. Add tags to holidays in the same style as the below bubbles for things such as “skiing”
- Use suspense in [React](#react) for loading faster - [Efficient and Elegant Web Development with Next.js: A Deep Dive into Component Streaming and Chunked Transfer Encoding | by Momen Daoud | Nov, 2023 | Medium](https://medium.com/@momendaoud/efficient-and-elegant-web-development-with-next-js-6087b3fd86e1)

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

<!-- Image removed during sync: 20231115 Website Inspiration 3.jpeg (20231115-website-inspiration-3.jpeg) -->

- Top of the page, show the world map
- Initial card list of holidays and descriptions below it
- Clicking on a holiday jumps to that holiday page
- Have a show more at bottom of list to only load a few in originally 
- Click a button on each card to make it full screen? Or just transition to the holiday page via animation where the card grows to fill the page 

<!-- Image removed during sync: 20231009 TravelWebsitePageLayoutSketch.jpeg (20231009-travelwebsitepagelayoutsketch.jpeg) -->

>[!top] [Back to top](#Table%20of%20Contents)

#### Sidebar

- Have on left of the screen
- When toggled, have it come in from the left and change the colour of the logo in the top left corner from white to a red version of the same logo
- Have the page links look like the headers on each page with a / before each
- For the sidebar, always have visible for desktop but have as appearing on mobile 

<!-- Image removed during sync: 20231009 SidebarInspiration.jpeg (20231009-sidebarinspiration.jpeg) -->

>[!top] [Back to top](#Table%20of%20Contents)

#### Holiday Page

- For each holiday, have a separate page where it shows
	- An image of the holiday 
	- A distance travelled to get to that holiday - from the departingAirport unless set as n/a
	- A list of clickable attendees 
- Make the holiday image fill the entire screen, including removing the page header, like below
- Only the header text and back button remain, as bold white over the image

<!-- Image removed during sync: 20231009 FullScreenInspiration.jpeg (20231009-fullscreeninspiration.jpeg) -->

<!-- Image removed during sync: 20231115 Website Inspiration 1.jpeg (20231115-website-inspiration-1.jpeg) -->

>[!top] [Back to top](#Table%20of%20Contents)

#### World Map Visualisation 

- Find a full screen map that colours countries based on if I've been there or not
- Best component will also colour darker if I've been more than once
- Add date filters to limit the data
- Clicking a country will jump to the [Country Page](#travel-website#country-page)
- Have the map greyed out like below with coloured tag markers to be visually in line with current red and white theme Of the site

<!-- Image removed during sync: 20231009 MapIconInspiration.jpeg (20231009-mapiconinspiration.jpeg) -->

- Have key numbers below the map as shown below

<!-- Image removed during sync: 20231009 MapStatsInspiration.jpeg (20231009-mapstatsinspiration.jpeg) -->

- Possible libraries
	- [Home | React Google Maps](https://visgl.github.io/react-google-maps/)
	- <https://github.com/stellasia/neomap>
	- [React Simple Maps (react-simple-maps.io)](https://www.react-simple-maps.io/)
	- [yanivam/react-svg-worldmap: A simple, compact and free React SVG world map. (github.com)](https://github.com/yanivam/react-svg-worldmap)

>[!top] [Back to top](#Table%20of%20Contents)

#### Neo4j Graph Visualisation 

- Allow users to pan around and zoom into the graph like in [Neo4j](#neo4j)
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

- [REST Countries](https://restcountries.com/#rest-countries) - [API](#api)
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
	- [GraphQL](#graphql) - [Pass variables in call](https://youtu.be/YBP-waKYbnA?si=DYmKIROE3_uS1N_s)
- Use slugs for urls to create links between pages
	- [Next.js](#next.js) - [Next.js Dynamic Routes](https://youtu.be/Ql5kyJaYbls?si=WE8sp-XLz5ASo8Pd)
- Have common layout component between pages 
	- [Simple Next.js Layout Tutorial](https://youtu.be/DGn25s42NvQ?si=b-hBV_gHT4rJCLRy)
	- [Next.js](#next.js) - [Layouts turorials](https://youtu.be/zbYBgy_ChGY?si=Anh6wL8ZjB8758B7)
- Create reusable components such as a attendees list that is fed props such as an object of attendees names, ids and the slug to their page to create quick hyperlinks
- In the header, have a back button with a simple [JavaScript](#javascript) back code (see Big Lynn 404 page) to get back to any previous page

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [Travel Website Tasks](https://todoist.com/app/section/Travel-Website-6C4XfjXjf47p6WgC) - [Todoist](#todoist)
- [Old my-travel-journal website](https://bangsluke-my-travel-journal.netlify.app/)
- [Old my-travel-journal GitHub Repo](https://github.com/bangsluke/my-travel-journal)
- [frontend-mytraveljournal GitHub Repo](https://github.com/bangsluke/frontend-mytraveljournal)
	- An attempt to change the [Next.js](#next.js) front end to be app routing

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The biggest challenge for this project was setting up the [Apollo](#apollo) backend server and getting the connection to the front end.

I also learned a lot about the page routing in [Next.js](#next.js) to develop the various page types on the site.

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Last Mentioned in Daily Notes


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID file.link as "Last Mentioned in Daily Note"
FROM [[]]
WHERE contains(tags, "daily")
SORT file.ctime DESC
LIMIT 1

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Total Count


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"

-->


### Last Mentioned


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5

-->


### All Mentions


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC

-->


>[!top] [Back to top](#Table%20of%20Contents)