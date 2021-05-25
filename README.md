# Pesticide

Open-source bug tracking software written in Node. I'm making use of Mongo, Express, and NextJS in this project.  
This is the version of Pesticide that is active. The legacy version can be found [here](https://github.com/averagedemo/pesticide-legacy)

## Default config options

config/default.json

```json
{
    "mongoURI": "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority",
    "jwtSecret": "secret"
}
```

## TODO

#### This list will be added to as I find more tasks to complete

-   [ ] Dashboard
-   [x] Authentication
-   -   [x] Change auth middleware to accept from nextjs
-   -   [x] Access limiting to projects
-   -   [x] Access limiting to bugs
-   -   [ ] User profile
-   -   [x] Assigning users to bugs
-   -   -   [x] Populate button with real data
-   -   [x] Bug comments (though I need to add the logged in user as author)
-   -   [x] User roles
-   -   [x] Bug delete button should only be viewable by a higher role and author (admin, lead dev, etc)
-   -   [x] Bug comment delete button should only be viewable by a higher role and author (admin, lead dev, etc)
-   [x] Project creation
-   [x] Project editing
-   [x] Open issues counter
-   [x] Bug creation
-   [x] Bug editing
-   [x] Sort bugs in table by status (Resolved towards the bottom)
-   [x] Bug review status & re-opening
-   [x] Viewing a bugs details
-   [x] Rerouting on invalid pages
-   [ ] Add section to add solution (optional input since this could be done via VCS)
-   [ ] Fix bg color of cells on view bug card (reproduction, stack trace, and actions)
-   [ ] Add pretty confirmation to delete bug button (a modal)
-   [x] Breadcrumb enhancement
-   [ ] Clean-up and optimize code and routes
-   [ ] Admin panel

## Notes

-   The "Mark for review" button will send the bug resolution for review by a higher role (admin, lead dev, etc)
