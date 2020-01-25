# Pomodoro Design Document

## Architecture Overview
### Tech Stack
* **ReactJS** client (using Javascript rather than Typescript)
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

#### Dashboard
Process:
1. Make a request, is there a currently in progress pomodoro that started less than 25 minutes ago? This can be handled
as a graphQL query. The permissions structure (once implemented) should limit to only the user's rows.
**Q. Should this be a subscription in case another device stops the in progress pomodoro?** *Yes, but start with a
generic query and move to a subscription in a later implementation*
1. Either take the time started to start a countdown. In order to protect against the thread going to sleep,
countdown should take current time from start time to work out the time to display.  
   1. Logic needs to cover what happens if the timer goes over a day break - suggest use `getTime()` function - 
   "number of milliseconds since 1970/01/01"
   2. When the count reaches zero, then call the function to mutate the record in the db
3. If the user presses the "Stop" button ahead of the    

### Countdown logic
* Action: research how clocks are implemented. Think the best way is a start time, and then a loop that checks the difference between now and the start time and displays that.
**  Probably belongs in a useEffect hook - but check Hasura React docs
* Initial start should write a GraphQL mutation

## Authentication
Authentication can be safely deferred and added later.

In phase 1, the userId will always be set to -1. The user id of -1 will be a demo user.

## Data structure and State
### Rules
* A pomodoro started just before midnight is counted towards the day in which it is started, not finished
* A stopped pomodoro cannot be restarted. Instead a new pomodoro must be started.
* A started pomodoro whose duration has exceeded 25 minutes is not counted as fiished. The client app must confirm finishing. Otherwise a pomodoro that is started, but then the user walk away, would look like a valid, completed pomodoro.

### Planned db schemas
**pomodoros**

|Col Name|Type|constraint|
|---|---|---|
|id|serial|Primary key|
|user_id|serial|FK to users table|
|start|datetime with timezone||
|status|serial|Enum status - started, stopped, finished|

Can only be one started pomodoro that is less than 25 min old.

**users**

|Col Name|Type|constraint|
|---|---|---|
|id|serial|Primary key|
|idp_id|text||
|idp_type|text|DEFAULT: "Auth0"|
|email|text||
|given_name|text||


todo: what do we need to store, if anything, from the IdP

# Implementation order
* Build from latest create-react-app in an existing folder
* Build the basic dashboard with a square start/stop button.
** Actually implements an on-screen countdown in the button text
** Start / Stop change button text
* Add in page chrome and circular button
* Animated count down https://codepen.io/ninjascribble/pen/rHwkK

# Interesting Notes
* Countdown clock CSS https://bashooka.com/coding/40-css-javascript-animated-countdown-timer-examples/

# Outstanding questions
* What countdown logic/UI should we use? Need to investigate the animated count down
 https://codepen.io/ninjascribble/pen/rHwkK or https://codepen.io/cMack87/pen/rVmEQm code
* Can the mutation that creates the pomodoro close down and existing ones?

#Actions
* Lock down Hasura console access https://docs.hasura.io/1.0/graphql/manual/deployment/heroku/securing-graphql-endpoint.html 

