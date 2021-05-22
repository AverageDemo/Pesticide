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
-   [x] Bug creation
-   [x] Bug editing
-   [ ] Bug resolution & re-opening
-   [ ] Viewing a bugs details
-   [ ] Bug comments
-   [x] Breadcrumb enhancement
