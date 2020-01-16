# Pomodoro Design Document

## Architecture Overview
### Tech Stack
* **ReactJS** client
* [**Hasura**](https://hasura.io/) GraphQL engine that hooks into PostgreSQL
* **PostgreSQL** database

### Network Architecture
* The client SPA will be compiled and deployed to Netlify
* The Hasura instance will be hosted on [Heroku](https://trakitypomodoro.herokuapp.com/console)

## Client app architecture
### Routing Structure
* **/login** - the page hosting the login form or link to IdP
* **/** - the main dashboard page
* **/tracking** - details on how you many pomodoros you've achieved over time

### Countdown logic
* Action: research how clocks are implemented. Think the best way is a start time, and then a loop that checks the difference between now and the start time and displays that.
**  Probably belongs in a useEffect hook
* Initial start should write a GraphQL mutation

## Authentication

## Data structure and State
### Rules
* A pomodoro started just before midnight is counted towards the day in which it is started, not finished
* A stopped pomodoro cannot be restarted. Instead a new pomodoro must be started.

### Planned db schemas
**pomodoros**

|Col Name|Type|constraint|
|---|---|---|
|id|serial|Primary key|
|userId|serial|FK to users table|
|start|datetime||
|status|serial|Enum status - started, stopped, finished|

**users**

|Col Name|Type|constraint|
|---|---|---|
|id|serial|Primary key|
todo: what do we need to store, if anything, from the IdP
