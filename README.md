# 📌 SpotSave
A simple web application to save your favortie spots on a map
- this project is not finished
- this project is not tested
- this projects purpose is to learn and try out new things

## Features & Ideas
- [x]  Show a map
- [ ]  Show pins on the map

- [ ]  Add a pin to the map
- [ ]  Give pins a name
- [ ]  Show a details for each pin
- [ ]  Group pins by category
- [ ]  Group pins by city or country


## Technologies
- React.js
- typescript
- Express.js
- Google Maps API
- json-server

## Setup

**db.json**
- purpose: acts as a database
- create a file called `db.json` in the root directory
- example file: 
```json
{
    "pins": [
        {
            "lat": 52.532,
            "lng": 13.392
        },
        {
            "lat": 52.535,
            "lng": 13.393
        },
        {
            "lat": 52.55,
            "lng": 13.399
        }
    ],
    "config": {
        "googleMapsApiKey": "yourAPI-Key"
    }
}
```

## Terminal Commands to run the project
- `npm install` to install all dependencies

run these commands in different terminals:
- `npm run json-server` to start the json-server
-  `npm run dev` to start the react app and the express server
