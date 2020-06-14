This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Hospital Finder

An application that helps users find the nearest health center around them. Built with React TypeScript <br />View the app running live [here](https://hospital-map-finder.herokuapp.com/)
<br />

## Screenshots

screenshots here

## Tech/framework used

- [React](https://reactjs.org/) TypeScript - The web library used
- [Google Maps API](https://cloud.google.com/maps-platform/maps/) - Used to render the Map
- [Google Places API](https://cloud.google.com/maps-platform/places/) - Used to get specific places
- Firestore - NoSQL Database
- [FireAth](https://firebase.google.com/docs/auth/) - User Authentication
- [GraphQL](https://graphql.org/) - To fetch search from the database
- [Material UI](material-ui.com) - A React UI framework

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

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
```

After you have that set up run

```sh
make install
npm run dev
```

# Acknowledgments

This project was created based on a coding challenge by [Enye](https://www.enye.tech/)
