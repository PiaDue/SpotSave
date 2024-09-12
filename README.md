# 📌 SpotSave
A simple web application to save your favortie spots on a map
- this project is not finished
- this project is not tested
- this projects purpose is to learn and try out new things

## Features & Ideas
- [x]  Show a map
- [x]  Show pins on the map
- [x]  search for a location + show it on the map
- [x]  show location details
- [ ]  create new pins
- [ ]  Show the current location
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
- purpose: acts as a backend for the project 
- create a file called `db.json` in the root directory
- file structure should look like this:
```json
{
    "pins": [{
        "position": {"lat": number, "lng": number},
        "placeID": string
    }],
    "mapConfig": {
        "googleMapsApiKey": string,
        "mapID": string
    }
}
```



## Terminal Commands to run the project
- `npm install` to install all dependencies

run these commands in different terminals:
- `npm run json-server` to start the json-server
-  `npm run dev` to start the react app and the express server
