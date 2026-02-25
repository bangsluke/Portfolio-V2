---
tags:
  - tag
  - coding
  - language
  - software
  - skill
  - portfolio
  - notes
created: 2023-10-13T07:42:00
modified: 2026-02-19T16:38:50+00:00
viewCount: 7
aliases:
skillRating: 70
skillDescription: Able to write complex queries to extract, analyse, and manipulate data from various sources. Built and maintained a relatively complex SQL database using MySQL writing schema modification statements and automating the population of data.
logoFileName: sql.svg
---
# SQL

> [!back] Link back to [[Skills Notes]]

## Table of Contents

```table-of-contents
```

## Key Commands

### Core Statements

| Statement | Description |
|---|---|
| `SELECT` | Retrieve data from one or more tables |
| `INSERT INTO` | Add new rows to a table |
| `UPDATE` | Modify existing rows in a table |
| `DELETE FROM` | Remove rows from a table |
| `CREATE TABLE` | Define a new table and its columns |
| `ALTER TABLE` | Modify an existing table's structure |
| `DROP TABLE` | Permanently delete a table and all its data |
| `TRUNCATE TABLE` | Delete all rows quickly without logging each deletion |

---

### Query Clauses

| Clause | Description |
|---|---|
| `WHERE` | Filter rows based on a condition |
| `ORDER BY` | Sort results (`ASC` or `DESC`) |
| `GROUP BY` | Group rows that share a value for use with aggregates |
| `HAVING` | Filter groups after `GROUP BY` (like `WHERE` but for aggregates) |
| `LIMIT` / `TOP` | Restrict the number of rows returned |
| `DISTINCT` | Return only unique values |
| `CASE WHEN` | Conditional logic inline within a query |
| `COALESCE(a, b)` | Return the first non-null value from a list |
| `NULLIF(a, b)` | Return `NULL` if `a = b`, otherwise return `a` |

---

### Joins

| Join Type | Description |
|---|---|
| `INNER JOIN` | Return rows with matching values in both tables |
| `LEFT JOIN` | All rows from the left table; `NULL` where no match on right |
| `RIGHT JOIN` | All rows from the right table; `NULL` where no match on left |
| `FULL OUTER JOIN` | All rows from both tables; `NULL` where no match either side |
| `CROSS JOIN` | Every combination of rows from both tables (cartesian product) |
| `SELF JOIN` | Join a table to itself (use aliases to distinguish) |

---

### Aggregate Functions

| Function | Description |
|---|---|
| `COUNT(*)` | Count all rows |
| `COUNT(col)` | Count non-null values in a column |
| `SUM(col)` | Total of all values |
| `AVG(col)` | Average of all values |
| `MIN(col)` | Smallest value |
| `MAX(col)` | Largest value |
| `STRING_AGG(col, sep)` | Concatenate values into a string (Postgres / SQL Server) |
| `GROUP_CONCAT(col)` | Same as above for MySQL/SQLite |

---

### Window Functions

| Function | Description |
|---|---|
| `ROW_NUMBER()` | Unique sequential number per row within partition |
| `RANK()` | Rank with gaps for ties |
| `DENSE_RANK()` | Rank without gaps for ties |
| `LEAD(col, n)` | Access a value `n` rows ahead in the partition |
| `LAG(col, n)` | Access a value `n` rows behind in the partition |
| `SUM(col) OVER (...)` | Running total within a partition |
| `PARTITION BY` | Divide rows into groups for window functions |

---

### Common Table Expressions & Subqueries

| Syntax | Description |
|---|---|
| `WITH cte AS (...)` | Define a named temporary result set (CTE) |
| `WITH RECURSIVE cte AS (...)` | CTE that references itself — useful for hierarchical data |
| `(SELECT ...) AS subquery` | Inline subquery used as a derived table |
| `WHERE col IN (SELECT ...)` | Filter using a subquery result set |
| `WHERE EXISTS (SELECT ...)` | Filter if a correlated subquery returns any rows |

---

### Filtering & Pattern Matching

| Syntax | Description |
|---|---|
| `WHERE col = 'value'` | Exact match |
| `WHERE col != 'value'` | Not equal |
| `WHERE col IS NULL` | Check for null values |
| `WHERE col IS NOT NULL` | Exclude null values |
| `WHERE col BETWEEN a AND b` | Inclusive range check |
| `WHERE col IN (a, b, c)` | Match any value in a list |
| `WHERE col LIKE 'val%'` | Pattern match (`%` = any chars, `_` = one char) |
| `WHERE col ILIKE 'val%'` | Case-insensitive pattern match (Postgres) |

---

### Best Practices

| Practice | Why it matters |
|---|---|
| Always use `WHERE` with `UPDATE` and `DELETE` | Without it, every row in the table is affected |
| Prefer `JOIN` over subqueries where possible | Usually better for readability and query planning |
| Use `EXPLAIN` / `EXPLAIN ANALYZE` to inspect query plans | Identifies slow scans, missing indexes, and bottlenecks |
| Index columns used in `WHERE`, `JOIN`, and `ORDER BY` | Dramatically speeds up lookups on large tables |
| Avoid `SELECT *` in production queries | Fetches unnecessary data; breaks if columns change |
| Use CTEs to break up complex queries | Improves readability and makes logic easier to debug |
| Wrap multi-statement changes in a transaction | Lets you `ROLLBACK` if something goes wrong |
| Use `COALESCE` to handle nulls explicitly | Prevents unexpected nulls from silently breaking aggregates |
| Test destructive queries with `SELECT` first | Verify the `WHERE` clause returns the right rows before deleting |

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Link to Documentation site](https://bangsluke-documentation.netlify.app/docs/Project%20Set%20Up%20to%20Release/4Development#react)
- [SQLZoo.net](https://sqlzoo.net/wiki/SQL_Tutorial)

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