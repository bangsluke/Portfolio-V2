---
tags:
  - project
  - notes
  - portfolio
  - project/completed
created: 2026-03-07 10:28
modified: 2026-03-09T08:21:39+00:00
aliases:
viewCount: 3
projectURL: n/a
codeURL: https://github.com/bangsluke/Affordability-Snapshot-Tool
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: https://bangsluke-assets.netlify.app/images/project-logos/Affordability.png
imageURL: https://bangsluke-assets.netlify.app/images/projects/Affordability-Snapshot.png
dateStart: 2026-03-06
dateEnd: 2026-03-09
technologies:
  - "[[Python]]"
  - "[[GitHub]]"
  - "[[Claude]]"
  - "[[Flask]]"
  - "[[Snyk]]"
  - "[[HTML]]"
  - "[[Cursor]]"
projectCategory: MVP
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Finances]]"
  - MVP
powerShellAlias: n/a
version: 1
portfolioOrder: 7
shortDescription: "Developed an <span class=\"theme-link\">MVP</span> to investigate Open Banking <span class=\"theme-link\">API</span> data structures and mock up an affordability analysis pipeline to create a report."
longDescription: "A <span class=\"theme-link\">Python</span> tool that pulls transaction data from two Open Banking sources and runs an affordability analysis pipeline on both, and renders a single side-by-side <span class=\"theme-link\">HTML</span> report. The report uses two data sources; <a href=\"https://console.truelayer.com/\">TrueLayer</a> (a free API for synthetic bank data) and also <span class=\"theme-link\">Monzo</span> (for me to see my actual data).<br><br>On the generated report, the data source being investigated (the tool allows either one source or both to be run at once) is analysed to extract income and categorise expenditure, allowing the tool to categorise the consumer data into an affordability band. It creates an income stability score, looks as disposable income, calculates a debt-to-income ratio and flags negative behaviours such as gambling transactions, overdraft usage or payday lenders - before placing the user into an affordability category.<br><br>At the bottom of the report is an <span class=\"theme-link\">API</span> explorer section, allowing the user to see the <span class=\"theme-link\">API</span> endpoints and data structure returned."
lessonsLearned: "The key lesson learned here was the approach to which affordability lenders review a customer's financial data in order to evaluate and categorise them into an affordability band.<br><br>Whilst my analysis pipeline isn't perfectly tuned or aligned with market lenders' processes, the fundamentals are the same, with key factors such as flagging certain transactions, considering income stability and looking at disposable income being heavily involved in decisions.<br><br>The <span class=\"theme-link\">MVP</span> also gave me insight into the data structures retuned by open banking sources, showing transactions, account details and balances.<br><br>Finally, the project also introduced me to some new terms such as DTI (debt-to-income) ratio and concepts such as disposable buffer and income stability.<br><br>If I was to develop the <span class=\"theme-link\">MVP</span> further, I'd further tune the analysis pipeline to better identify active payday lenders (as my report had false flags) and improve the disposable buffer calculation to do a better job at discounting irregular income values across the data."
name: "Affordability Snapshot Tool"
---
# Affordability Checker Tool

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

Developed an [[MVP]] to investigate Open Banking [[API]] data structures and mock up an affordability analysis pipeline to create a report.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A [[Python]] tool that pulls transaction data from two Open Banking sources and runs an affordability analysis pipeline on both, and renders a single side-by-side [[HTML]] report. The report uses two data sources; [TrueLayer](https://console.truelayer.com/) (a free API for synthetic bank data) and also [[Monzo]] (for me to see my actual data).

On the generated report, the data source being investigated (the tool allows either one source or both to be run at once) is analysed to extract income and categorise expenditure, allowing the tool to categorise the consumer data into an affordability band. It creates an income stability score, looks as disposable income, calculates a debt-to-income ratio and flags negative behaviours such as gambling transactions, overdraft usage or payday lenders - before placing the user into an affordability category.

At the bottom of the report is an [[API]] explorer section, allowing the user to see the [[API]] endpoints and data structure returned.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Python]], [[Flask]], [[HTML]]
- Back end/Datasource: [[Monzo]], TrueLayer
- Hosting: [[GitHub]] (see [Repositories](#repositories))
- Security: [[Snyk]]
- Authentication: [[OAuth]], [[Monzo]]

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

- All planning initially done using [[Claude]] for putting together the initial prompt before passing it to [[Cursor]] for implementation.

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [TrueLayer Console](https://console.truelayer.com/)
- [Monzo for Developers](https://developers.monzo.com)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The key lesson learned here was the approach to which affordability lenders review a customer's financial data in order to evaluate and categorise them into an affordability band.

Whilst my analysis pipeline isn't perfectly tuned or aligned with market lenders' processes, the fundamentals are the same, with key factors such as flagging certain transactions, considering income stability and looking at disposable income being heavily involved in decisions.

The [[MVP]] also gave me insight into the data structures retuned by open banking sources, showing transactions, account details and balances.

Finally, the project also introduced me to some new terms such as DTI (debt-to-income) ratio and concepts such as disposable buffer and income stability.

If I was to develop the [[MVP]] further, I'd further tune the analysis pipeline to better identify active payday lenders (as my report had false flags) and improve the disposable buffer calculation to do a better job at discounting irregular income values across the data.

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