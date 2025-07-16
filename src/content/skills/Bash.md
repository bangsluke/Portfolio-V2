---
tags:
  - tag
  - coding
  - language
  - software
  - portfolio
  - skill
  - notes
created: 2023-10-13T07:43:00
modified: 2025-07-02T14:20:00+01:00
viewCount: 7
aliases: 
skillRating: 0
skillDescription: TBC
imageURL: 
---
# Bash

> [!back] Link back to [[Skills Notes]]

> Link: [[PowerShell]]

## Table of Contents 

```table-of-contents
```

## Links

- [Link to Documentation site](https://bangsluke-documentation.netlify.app/docs/Project%20Set%20Up%20to%20Release/4Development#react)

>[!top] [Back to top](#Table%20of%20Contents)

## Skill

```meta-bind  
INPUT[progressBar(title(Skill Rating), minValue(0), maxValue(100)):skillRating]  
```

>[!top] [Back to top](#Table%20of%20Contents)

## Skill Description

`=this.skillDescription`

>[!top] [Back to top](#Table%20of%20Contents)

## Bash Guide

### How to Write Your First Shell Script

1. Create a new file with the .sh extension, e.g., `hello.sh`.
2. Add the following content to the file:  

```bash
#!/bin/bash
echo "Hello, world!"
```

3. Save the file.
4. Make it executable using the following command:  

```bash
chmod +x hello.sh
```

5. Finally, run the script:

```bash
./hello.sh
```

The script will execute and print "Hello, world!" to the console.

### Variables and Data Types

Shell scripts use variables to store data. These variables can hold various data types, including integers, strings, and Booleans. To declare a variable, use the following syntax:  

```bash
variable_name=value
```

For example, to store the string "welcome to a new world!" in a variable named `my_variable` and then print it, you would write:

```bash
my_variable="Welcome to a new world!"
echo $my_variable
```

### Control Flow Statements

Control flow statements are used to manage the order of execution in shell scripts. The most common ones are:

#### If Statements:

```bash
if condition
then
    code_to_execute
fi
```

#### For Loops:

```bash
for variable_name in list
do
    code_to_execute
done
```

#### While Loops:

```bash
while condition
do
    code_to_execute
done
```

### Functions

Functions allow you to group code together for improved modularity and readability. Here's how to define a function:  

```bash
function function_name() {
    # Code to execute
}
```

To call a function, simply use its name:  

```bash
greet
```

> Source: [Linux Shell Scripting for DevOps: A Beginner's Guide - DEV Community](https://dev.to/arbythecoder/linux-shell-scripting-for-devops-a-beginners-guide-1fgf)

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