---
tags:
  - project
  - coding
  - notes
  - portfolio
  - project/active
created: 2026-04-15
modified: 2026-04-20T10:58:20+01:00
viewCount: 7
aliases:
  - Acre Task
projectURL: n/a
codeURL: https://github.com/bangsluke/Acre-Customer-Solutions-Engineering-Exercise
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: n/a
imageURL: https://bangsluke-assets.netlify.app/images/projects/Acre-Dashboard.png
powerShellAlias: n/a
dateStart: 2026-04-15
dateEnd: 2026-04-20
technologies:
  - "[[GitHub]]"
  - "[[React]]"
  - "[[Typescript]]"
  - "[[Vite.js]]"
  - "[[Tailwind CSS]]"
  - "[[Excel]]"
  - "[[Node.js]]"
  - "[[ESLint]]"
  - "[[Cursor]]"
  - "[[Claude]]"
projectCategory: MVP
linkedCompany:
  - Acre Software
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
version: 2
portfolioOrder: 5
shortDescription: "A take home task for an interview process with Acre Software, developing two dashboards from some mortgage CSV data to provide insight to internal users and lender customers."
longDescription: "As part of the interview process for Acre Software, I was given a anonymised CSV of mortgage data and tasked with developing two dashboard designs; one for internal Acre employees to use and the other for Lender clients on the Acre platform to use.<br><br>I produced the two dashboards from the data and extended the functionality to include additional insights for both the internal and external users and presented it in person in their London office."
lessonsLearned: "I wrote user stories for the application from the outset to drive the development direction and aid <span class=\"theme-link\">Cursor</span> in meeting its requirements. I learned a lot about the mortgage process by reviewing and understanding the data to get a sense of the process and steps needed throughout a case's lifetime.<br><br>My main lesson was that I engaged <span class=\"theme-link\">AI</span> too early in the process, letting it lead the content of the site rather than using my initial plan before extending with the logic suggested by <span class=\"theme-link\">Claude</span>. This cost me some time in development in bringing the content back into scope."
name: "Acre Customer Solutions Engineering Exercise"
---
# Acre Customer Solutions Engineering Exercise

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

## Table of Contents

```table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A take home task for an interview process with Acre Software, developing two dashboards from some mortgage CSV data to provide insight to internal users and lender customers.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

As part of the interview process for Acre Software, I was given a anonymised CSV of mortgage data and tasked with developing two dashboard designs; one for internal Acre employees to use and the other for Lender clients on the Acre platform to use.

I produced the two dashboards from the data and extended the functionality to include additional insights for both the internal and external users and presented it in person in their London office.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[React]], [[Typescript]], [[Tailwind CSS]], [[Vite.js]]
- Back end/Datasource: [[Excel]], [[Node.js]]
- Hosting: [[GitHub]]
- Security: n/a
- Authentication: n/a
- Testing: Vitest

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [[PowerShell]] alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

### Initial Prompt

I have been given an Engineering Exercise as part of an interview process for a FinTech Startup Associate role at Acre Software. This can be found in the attached pdf file. The data provided is a very large file so I have given you a reduced mortgage_reduced.csv file that has some example data. The real data is over 300,000 rows long.

I want to meet all of the criteria outlined in the pdf and go above and beyond as well. Review additional ways of extending the dashboard to give more insight and consider what other bonus features I could add to the application. Note that this app won't be hosted, it needs to be a project they can install and set up locally.

I have included context such as the job-description.md and some extra direction in the jack-and-jill-task-breakdown.md

Produce a few artifacts:

1. Create mock ups of what the screens could look like in the built report tool, using the uploaded png files of what the current Acre Software is as reference for design style.
2. Write me a short but concise report explaining what all of the data fields in the CSV mean and represent, explaining mortgage terminology to me in a basic way to help me get a full grasp of the data and task
3. Put together a plan for implementing such as solution as a markdown report providing instructions that will be passed to Cursor AI to be built. The implementation can be broken down into phases if best for the implementation.

Ask questions as you need to to help get the right information together.

### Follow Up Prompt

I want to make a further few updates to my understanding and assumptions of this task.

```
I interpreted the task as two separate dashboards, one (a) for internal teams to understand the global activity data of lenders and the second screen (b) as representative of a client dashboard. It was assumed that clients would view (b) and not be able to see (a), and that internal acre users would view (a) and not need to see (b).

I have built this tool as a screen developed within the context of an application. As such, the tool does not have a header and footer, nor a sidebar for navigation as it would be expected to be embedded within an existing application - one internal and one external.

For both dashboards, I did not add a login feature as I view this screen as page reached within the internal/external application following authentication. However to demo the functionality of the dashboard across multiple lenders, I have provided a dropdown to select the lender partner.

I also assumed that lender partners do not have access to seeing the lender data of other partners within Acre's system. Acre may provide a market average, but won't expose individual lender data to other partners.

The screen is designed and developed for desktop viewports, with limited scaling between small, medium and large desktop screen sizes given that we aren't hosting the site and will just run it locally.
```

As such, at the very top of the application I want to have two tabs "Internal Dashboard" and "Lender Dashboard" that change between the two major views. However both of these views will have sub-sections in tabs as well. ON the Lender Dashboard view, ensure there is a dropdown to select which lender to view, preselected with one option from the start. Don't include the case count in the dropdown, but do show this case count on the page after selection.

The design should be an SPA, with priority loading of data for the "Internal Dashboard" to load first before the data for the "Lender Dashboard" loads. Review if React Router is needed or not with this set up.

Only scale for small, medium and large desktop screen sizes

Update the Implementation Plan and mock ups as necessary

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [[20260330 Acre Interview Preparation]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

I wrote user stories for the application from the outset to drive the development direction and aid [[Cursor]] in meeting its requirements. I learned a lot about the mortgage process by reviewing and understanding the data to get a sense of the process and steps needed throughout a case's lifetime.

My main lesson was that I engaged [[AI]] too early in the process, letting it lead the content of the site rather than using my initial plan before extending with the logic suggested by [[Claude]]. This cost me some time in development in bringing the content back into scope.

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