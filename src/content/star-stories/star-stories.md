## STAR Stories

### 1. A Time You Shipped Something That Failed / What You Learned


- **Question**: *"Tell me about a time something you shipped didn't go as planned."*
- **Situation**: During my [[Digital Engineering Specialist]] role, I delivered a suite of financial tracking tools built on [[Power Apps]] and [[Power BI]] for global [[RLE International|RLE]] regions. We quickly started getting a significant number of messages and emails from the users on basic usage questions for the tools and requests for examples, so we decided to set up a [[Docusaurus]] [[GPMO Documentation Site]] with guides and common questions
- **Task**: I was responsible for the concept of the documentation site, having developed a [[Docusaurus]] site for my own personal use case, taking on the full product lifecycle - requirements, build, and launch.
- **Action**: After launching the documentation site, we emailed all users a link to the site, explaining its functionality. However the number of requests didn't drop. After discussing the reason with a few users, it became clear that most people had never opened the documentation link, or saved it and so never thought to look there when a problem arose. To fix this, we added clear and obvious help buttons across our tool set, and added links to the documentation site to our [[GPMO]] home site and to our email signatures to ensure the link was easily discoverable.
- **Result:** The fix quickly reduced the number of questions sent through to developers, providing them more time for development and a higher user satisfaction with the tools. An added bonus was that we incorporated analytics into the [[GPMO Documentation Site]] to see how many users were using it, and what pages/terms they were going through so we could identify weaknesses in our tool usability's.

### 2. A Time You Had to Prioritise Ruthlessly


- **Question**: *"Tell me about a time you had to make hard prioritisation decisions."*
- **Situation**: When I was starting the [[Digital Engineering Specialist]] role, at the initiation of the [[GPMO]] team, we had several competing requests from global program offices asking us for a range of tools, from cost models to resource tracking tools to a [[CRM]], and we had pressure from the company's VP to deliver value quickly.
- **Task**: The [[United Kingdom|UK]] office were screaming for a new cost model, whilst the [[United States of America|US]] team wanted a [[CRM]] and the Global VP said they desperately needed combined financial reports.
- **Action**: After having calls with a stakeholder representing each region, I identified which offices would benefit from each tool, before using a simple impact-vs-effort scoring approach: the cost model was the data basis of the financial reports and one of the key reasons reporting was so bad was due to bad project data. Each team had a form of [[CRM]] tool in place and so we prioritised creating a new common [[Cost Model]] tool across all regions, communicating our decision with reason to all stakeholders.
- **Result**: The [[Cost Model]] was built and released within the first sprint and was received well by all regions, building trust that our new team would deliver viable solutions. Financial reporting also improved due to the improved data output.

### 3. A Time You Influenced Without Authority


- **Question**: *"Tell me about a time you got buy-in without formal authority."*
- **Situation**: When building the [[DVP Tool]] [[MVP]] (in my [[Digital Engineering Developer]] role), our team needed buy-in from senior stakeholders at [[RLE International|RLE]] to fund continued development of a vehicle test planning optimisation algorithm. Previous mathematical [[PowerPoint]] presentations on the topic had left them confused rather than confident of the team's vision.
- **Task**: Secure continued funding and stakeholder support for a technically novel approach by demonstrating tangible value without a mandate.
- **Action**: Rather than presenting another slide deck, I built a working [[Next.js]] [[MVP]] that allowed stakeholders to interact with actual optimisation outputs for a real [[DVP]] scenario. I framed the narrative around their existing pain point - planning cycles taking weeks - and showed the tool reducing that to minutes/hours for a sample dataset.
- **Result**: Funding was secured for continued development of the mathematical algorithms work on [[Neo4j]] graph data. The [[MVP]] was later presented as a case study for digital tooling within the wider RLE business.

### 4. A Time You Turned Messy Data into a Clear Decision


- **Question**: *"Tell me about a time you used data to drive a clear recommendation."*
- **Situation**: In my [[VHE2 Integration Engineer]] role at [[Ford]], I was asked to support in creating a [[DPA]] dashboard to help engineers identify bottlenecks in getting [[DPA]] issues closed off. [[DPA]] data existed on an internal site, but was used differently by each engineer in supporting their close outs.
- **Task**: Create a reliable, single-source-of-truth visual reporting view that engineers could trust and present to stakeholders without manual preparation.
- **Action**: I audited the existing process that engineers followed to extract the data and noticed that each function group extracted their individual data set each day rather than a single user extracting all data. I documented the combined task and assigned it to an engineer who updated the data source for all groups. I then built an [[Excel]] dashboard from the data, interviewing the engineers to understand what metrics helped them with their task and creating a combined report that could be filtered to each group.
- **Result**: The weekly review meeting of [[DPA]] issues began using the dashboard as their source of discussion, which led to further improvements and eventually a agreement to take the approach further, automating the single engineers download step and build a [[Power BI]] report on the data - which I later successfully led.

### 5. A Time You Worked with Both Technical and Non-Technical Stakeholders


- **Question**: *"Tell me about a time you bridged technical and non-technical teams."*
- **Situation**: During the [[SDP]] project ([[Data Management Analyst]]), I sat between automotive consultants - domain experts with no software knowledge - and software developers/mathematicians building a [[Neo4j]]/[[SQL]]-backed web platform.
- **Task**: Translate deeply domain-specific automotive knowledge into a data model that developers could use to build the tool.
- **Action**: I ran structured discovery sessions with the consultants, asking them to map their knowledge of automotive processes into structured workflows on whiteboards. I then photographed these and translated them into an [[Excel]] document - designed to bridge the input gap of consultants sharing their knowledge - containing details of duration and effort of each action which was then converted into an [[SQL]] database to be pushed into [[Neo4j]].
- **Result**: [[SDP]] was successfully deployed and adopted by multiple automotive customers. Planning cycles for some startup customers dropped from months to days, but the [[Excel]] interface also allowed us to easily continue to scale the number of consultants we were working with to gather data.

### 6. A Time Something Went Wrong Operationally (Post-Launch Triage)


- **Question**: *"Tell me about a time you had to support something operationally after it went live."*
- **Situation**: After launching my [[Dorkinians Website V3]] for the first time and posting about it onto my club's WhatsApp group with over 600 members, the site suddenly started displaying a blank screen for users opening it. 
- **Task**: Triage and resolve a live web app issue during the product's launch, then identify and address the root cause to prevent recurrence.
- **Action**: I had the assumption that the problem had come from too many chatbot requests querying the [[Neo4j]] database as this was the first screen that users came to and used and was showing as blank. I restarted the database and checked through the [[Heroku]] logs to confirm the issue and then set about upgrading the dynos to handle higher traffic for the surge of users.
- **Result**: The issue was resolved live and in sufficient time not to lose the trust of users.

### 7. Why No Fintech Experience Shouldn't Be a Blocker


- **Question**: *"You don't have fintech experience - why should we take a chance on you?"*
- **Situation**: *(This is a positioning answer, not a strict STAR - frame it as a confident reframe.)*
- **Response**: That's fair to raise, and I want to address it directly. I haven't worked inside a fintech, but the environments I've operated in share more with fintech than you might expect. Automotive engineering at [[Ford]] and [[McLaren Automotive|McLaren]] is safety-critical and highly regulated - decisions carry downstream consequences if you get the data wrong, the process wrong, or the edge case wrong. I've built tools where data accuracy wasn't a nice-to-have; it was a hard requirement with senior leadership scrutiny attached. I've also delivered in fast-moving, cross-functional environments where the product had to work operationally from day one, not just technically. What I bring is an engineering mindset applied to product - I understand systems, I'm comfortable in ambiguity, and I default to first understanding how something can fail before building it. I'd expect a steep learning curve on financial domain knowledge, and I'd embrace that - the same way I taught myself graph databases, full-stack development, and [[data pipelines]] from scratch.

### 8. A Time You Defined an Operational Process for a New Product


- **Question**: *"Tell me about a time you had to define how a product would be supported after launch."*
- **Situation**: For the suite of financial tools in [[RLE International]], when working as a [[Digital Engineering Specialist]], the rollout of the tools was down to the team developing and delivering them.
- **Task**: Ensure that users could use each of the tools they needed to operate within the process.
- **Action**: We planned sessions of user training in each region that we planned to roll the tools out to, defining a training session plan, and offering it to possible users in each region. We also set up a dedicated email address for user questions, as well as setting up the [[GPMO Documentation Site]] as a site for users to visit for user guides and key questions.
- **Result**: The rollout of the tools went impressively smoothly, with users quickly grasping the concept and benefits when they attended the training sessions. We had an initial spike in questions to the email address and to the individual developers, but the implementation of the documentation site reduced this quickly. We had all 6 regions up and running within 3 weeks of the final tool launch.

### 9. A Time You Had to Work in Ambiguity


- **Question**: *"Tell me about a time you had to move forward without clear direction."*
- **Situation**: When I joined the [[CEER Automotive]] project as a [[Digital Engineering Specialist]], it was described as an "automotive start-up" - as there was no existing process, no tooling, no documentation, and no defined scope for what we needed to deliver to the customer other than defining a timing plan process.
- **Task**: Define and build the digital infrastructure for the project lifecycle from scratch, while simultaneously delivering against commitments to the wider business.
- **Action**: We started with a discovery phase - interviewing the key stakeholders across the programme to understand their current vision of what the project's timing included. From that I identified three priority areas: rapid plan changes were expected, the timing output had to be standardised into a usable format and detailed documentation was need. I defined an [[MVP]] concept that would cover all three areas using familiar tools like [[Excel]] for easy data change and used [[Visio]] to generate PDFs for the plan and details.
- **Result**: Despite being unsure of what we had to deliver at the start of the project, the customer received our process and plans with great enthusiasm and provided us a larger contract to continue integrating into their company for further planning.

### 10. A Time You Advocated for the User


- **Question**: *"Tell me about a time you pushed back to protect user experience."*
- **Situation**: During my time at [[RLE International]], I was asked to improve weekly timesheet input for the UK company as the German side had pushed out a new [[Power Apps]] tool for users - a technically clean solution that would have standardised data entry.
- **Task**: Assess whether the proposed solution would actually be adopted by the target users (automotive engineers with deeply ingrained existing [[Excel]] timesheets).
- **Action**: I ran informal user testing with several employees, presenting them with the proposed web form. The feedback was uniform: they found it unfamiliar, cumbersome and slow compared to their existing [[Excel]] timesheets, and expressed they would likely continue using their own spreadsheets rather than the new tool. I brought this finding back to the team and advocated for an [[Excel]]-based input layer in the [[Power Apps]] tool that allowed a copy-paste action rather than replicating the data. This required additional development effort and the technical team's initial resistance - but I framed it as a binary: build the right experience and get adoption, or build the clean experience and get none.
- **Result**: The [[Excel]] to [[Power Apps]] copy interface was built. It became the primary reason why many of the UK staff engaged with the tool and was directly cited by a few of them as being the reason they had finally adopted the new system.

### 11. A Time You Used Analytics to Identify a Problem


- **Question**: *"Tell me about a time you used data/analytics to spot an issue."*
- **Situation**: One user in our [[GPMO]] toolset was adding himself to projects which he later couldn't see within his filtered list of projects. 
- **Task**: Use analytics to understand and fix the problem that was stopping the user from assigning projects and tasks to himself in the toolset
- **Action**: I initially reviewed the projects myself after receiving the bug report and couldn't see an issue, so set up a call with the user to do a live debug session in [[Power Apps]] to view the log data. I provided the user with a set of assumptions I had for the root cause of the issue, so as not to lose credibility and then took the logs away from our session to review. I found that the user was logging in with an email address from a different [[RLE International|RLE]] group than anticipated, and our app was stripping away the email domain and so not identifying the user correctly across projects. I set up additional logging into the login system, created a ticket to update the app to change the stripping behaviour and added an email log to bug requests so we could get early warning if this was happening again.
- **Result**: Not only did we fix the user's issue, but we caught the same problem with several other less active users and could fix the issue before they reported it.

### 12. A Time You Coordinated a Cross-Functional Launch


- **Question**: *"Tell me about a time you coordinated a product launch across multiple teams."*
- **Situation**: For the suite of financial tools in [[RLE International]], when working as a [[Digital Engineering Specialist]], the rollout of the tools had to be across 6 regional offices for both senior management, project managers, consultants and administrators.
- **Task**: Ensure that users could use each of the tools they needed to operate within the process across teams with different technical literacy levels, reliably on a recurring basis.
- **Action**: We planned sessions of user training in each region that we planned to roll the tools out to, defining a training session plan, and offering it to possible users in each region. We also set up a dedicated email address for user questions, as well as setting up the [[GPMO Documentation Site]] as a site for users to visit for user guides and key questions.
- **Result**: The rollout of the tools went impressively smoothly, with users quickly grasping the concept and benefits when they attended the training sessions. We had an initial spike in questions to the email address and to the individual developers, but the implementation of the documentation site reduced this quickly. We had all 6 regions up and running within 3 weeks of the final tool launch.
