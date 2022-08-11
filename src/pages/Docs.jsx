import React from 'react'
import MuiMarkdown from 'mui-markdown'

/**
 * A component to render the Documentation page/route
 */
export default function Docs() {
  const content = `
<center>
# Documentation
</center>

## Installation

1. After obtaining this app's source code, change into its directory and run \`npm install\`
2. Make sure a MongoDB database is set up. You can set up a free cloud-hosted database with [MongoDB Atlas](https://www.mongodb.com/atlas/database). Follow the [guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database) from MDN for more details.
3. Set your \`MONGODB_URI\` environment variable to your database's connection URI or manually substitute it in the \`api.js\` file.
4. Run \`npm start\`


## Instructions and tips
  1. Start by entering something you plan to work on in the \`Enter a task\` text field. Press enter or the pen icon to save. You may also include tags
  2. There is a blue progress bar indicating a perecentage of the elapsed time for the day
  3. Use the search bar to search for tasks. To revert to showing all the tasks, press enter or the search button on an empty search input.
  4. Press the filter button to filter showing tasks containing specific tags
  5. The table is where you'll get to see all your tasks
  6. Pressing the edit button will allow you to make changes to the task name, tags, and its tracked time periods. It will turn into a button with a checkmark, and pressing that will save changes. While editing, a delete button appears where you can delete the task.
  7. The blue record button will write an entry for the current date and time and the button will change into a stop button. Pressing it again will write the current time to end the time period you previously entered in. 

## Other notes
- Originally, the main UI was supposed to look like a timeline with a red vertical indicator for the currrent time but that proved to be too difficult to implement, so I compromised with a UI that still carries somewhat of the same essence. The progress bar acts like the indicator and the list of time periods are still viewable through the statistics page and through a collapsed table.
- Tags were left unfinished clientside. It's okay since they are accessories. However, if there are tags for the task, they will be rendered. 
- Checklist
  - [x] Componentize the app
  - [x] Event handlers
    - [x] Add/remove/edit tasks
    - [x] Filter/Search for specific tasks
  - [x] Client-side routing through React Router
  - [x] REST API using Express
    - [x] Appropriate responses and status codes 
    - [x] Atleast 3 \`GET\`
      - [x] atleast 1 sends sends a collection | Get all tasks
      - [x] atleast 1 sends a specific member of a collection | Search for a task
      - [x] Get tasks for a specifc date
    - [x] Atleast 1 \`POST\` | Create a task
  - [x] Use HTTP requests to connect front-end React app to your Express backend
  - [x] MongoDB atlas to persist application data
    - [x] Have API connect to a database
    - [x] At least one collection
    - [x] Environment variables for database credentials
    - [x] Posted data should be validated and sanitized | used \`mongoose\` to set up proper schemas alongside input fields to validate data
  - [x] Deploy the full stack web app
  - [x] Documentation
`
  return <MuiMarkdown>{content}</MuiMarkdown>
}
