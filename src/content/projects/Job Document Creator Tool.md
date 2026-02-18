---
tags:
  - project
  - notes
  - project/active
  - portfolio
  - work
created: 2026-02-18 08:48
modified: 2026-02-18T14:51:04+00:00
aliases:
viewCount: 2
projectURL: n/a
codeURL: https://github.com/bangsluke/Job-Document-Creator-Tool
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: n/a
imageURL:
dateStart: 2026-02-18
dateEnd: ""
technologies:
  - "[[Python]]"
  - "[[Anthropic]]"
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
powerShellAlias: jobs, jobsearch
version: 1
portfolioOrder: 8
shortDescription: "TBD"
longDescription: "TBD"
lessonsLearned: "TBD"
name: "Job Document Creator Tool"
---
# Job Document Creator Tool

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

TBD

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBD

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: TBD
- Back end/Datasource: TBD
- Hosting: [[GitHub]] (see [Repositories](#repositories)), TBD
- Security: TBD
- Authentication: TBD

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [[PowerShell]] alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

### Initial Prompt

```
I have a workflow that I want to automate. Currently I am searching for a job and when I find one, I am manually writing and updating my CV and possibly a Cover Letter to align with the job description. Ideally I'd like the workflow to be automated as below:

1. I enter the company name, job title and job description into the tool/automation via a small visual GUI.
2. The tool/automation then creates a folder with the company name in a certain folder and then populates it with a copy of my Microsoft Word CV and Cover Letter, updates the content to best match the job description and presents it for my review.
3. I review and confirm the content, updating if I wish to.
4. The tool/automation then checks the spelling and grammar of the documents before it creates the exported PDF version of the CV and Cover Letter into the folder.

Advise on the best LLM and AI model to consume the data and output the highest quality documents.

Advise if there is a specific template design you need for the CV and cover letter.

Define what base constants you need for the workflow.

In the GUI, add the option to choose to create just a CV or a CV and Cover Letter. Also ensure that each step of the process being done is written out in grey text, turning green if successful or red if an error, e.g. "Sending prompt to LLM...". Also have a section that explains any errors or warnings the process encounters.

Ensure that there is a clear prompt document that I can modify and update of what is sent to the LLM to write the documents, allowing me to customise the output.

Would it be best to have a folder full of example Cover Letters for the LLM to review and refer to?

Ensure the full process is documented in a README file, including instructions on how to run the command.

If there are any additional setup processes I need to do (such as connecting to the LLM), document these in a setup guide.

Put together a plan for creating an automated process for the above requirements using Python or another language/tool set up if you know of better. The main objective of this automation is content generation quality over speed of process.

Ask any further questions that you need clarified for your planning.
```

- TBD

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- TBD

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBD

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