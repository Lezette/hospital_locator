This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Hospital Finder

An application that helps users find the nearest health center around them. Built with React TypeScript <br />View the app running live [here](https://hospital-map-finder.herokuapp.com/)
<br />

## Screenshots

![image](https://user-images.githubusercontent.com/42512400/84674378-c493f080-af22-11ea-96d6-2c01afa5ec3f.png)

![image](https://user-images.githubusercontent.com/42512400/84674553-002eba80-af23-11ea-8bf9-6cd6a5f3ec1c.png)

![image](https://user-images.githubusercontent.com/42512400/84674627-189ed500-af23-11ea-973a-648ddf814a66.png)

## Tech/framework used

- [React](https://reactjs.org/) TypeScript - The web library used
- [Google Maps API](https://cloud.google.com/maps-platform/maps/) - Used to render the Map
- [Google Places API](https://cloud.google.com/maps-platform/places/) - Used to get specific places
- Firestore - NoSQL Database
- [FireAth](https://firebase.google.com/docs/auth/) - User Authentication
- [GraphQL](https://graphql.org/) - To fetch search from the database
- [Material UI](material-ui.com) - A React UI framework

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Development setup

Simply make a pull request, create a `.env.local` file and add the required keys from google cloud console and firebase,
a sample `env` file would look like this

```sh
REACT_APP_GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAP_API_KEY"
REACT_APP_API_KEY = "YOUR_FIREBASE_API_KEY"
REACT_APP_AUTH_DOMAIN = "YOUR_FIREBASE_AUTH_DOMAIN"
REACT_APP_DATABASE_URL = "YOUR_DATABASE_URL"
REACT_APP_PROJECT_ID = "YOUR_PROJECT_ID"
REACT_APP_STORAGE_BUCKET = "YOUR_APP_STORAGE_BUCKET"
REACT_APP_MESSAGING_SENDER_ID = "YOUR_APP_MESSAGING_SENDER_ID"
REACT_APP_APP_ID = "YOUR_APP_ID"
REACT_APP_MEASUREMENT_ID: "YOUR_APP_MEASUREMENT_ID"
REACT_APP_GRAPHQL_SERVER: "LINK TO YOUR GRAPHQL SERVER"
```

After you have that set up, run the following command

```sh
npm i
npm run dev
```

### Graphql Playground

To run the graphql playground locally, simply run the code below <br />
Note that you would need to get a service account key from google cloud console.

```sh
cd functions
firebase serve --only functions
```

#### Testing

To run a basic test, simply run the command

```
npm t
```

### Additional Features

Here are possible improvements that might be added to this application with time

- Improve the UI
- Add view images feature i.e if images for a location is available the users can view it, this will help users locate places faster
- Add real time information feature for each locations eg (if the hospital is currently opened; a contact information)

# Acknowledgments

This project was created based on a coding challenge by [Enye](https://www.enye.tech/)
