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
-   [ ] User Profile
-   [x] Project creation
-   [x] Project editing
-   [ ] Assigning Users to Projects
-   [x] Bug creation
-   [x] Bug editing
-   [ ] Assigning Users to Bugs
-   [ ] Bug resolution & re-opening
-   [x] Viewing a bugs details
-   [ ] Add section to add solution (optional input since this could be done via VCS)
-   [ ] Fix bg color of cell on view bug card (reproduction & stack trace)
-   [ ] Bug comments
-   [x] Breadcrumb enhancement

## Notes

-   The "Mark for review" button will send the bug resolution for review by a higher role (admin, lead dev, etc)
