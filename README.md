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
-   [ ] Authentication
-   -   [ ] Role limit routes
-   -   [ ] User Profile
-   -   [ ] Assigning Users to projects
-   -   [ ] Assigning Users to bugs
-   -   [ ] Bug delete button should only be viewable by a higher role (admin, lead dev, etc)
-   -   [ ] Bug comments
-   [x] Project creation
-   [x] Project editing
-   [x] Bug creation
-   [x] Bug editing
-   [x] Sort bugs in table by status (Resolved towards the bottom)
-   [x] Bug review status & re-opening
-   [x] Viewing a bugs details
-   [ ] Add section to add solution (optional input since this could be done via VCS)
-   [ ] Fix bg color of cells on view bug card (reproduction, stack trace, and actions)
-   [ ] Add pretty confirmation to delete bug button
-   [x] Breadcrumb enhancement

## Notes

-   The "Mark for review" button will send the bug resolution for review by a higher role (admin, lead dev, etc)
