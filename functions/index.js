const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const credential = require('./hospital-finder-1992e-9d47272b1f77.json');
admin.initializeApp({
  credential: admin.credential.cert(credential),
  databaseURL: 'https://hospital-finder-1992e.firebaseio.com',
});

const db = admin.firestore();

const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type SearchHistory {
    id: String
    address: String
    lat: String
    lng: String
    radius: String
    email: String
  }
  type Query {
    searchHistorys: [SearchHistory]
  }
  type Mutation {
    addSearch(
      address: String
      lat: String
      lng: String
      radius: String
      email: String
    ): SearchHistory!
    getSearchbyEmail(email: String): [SearchHistory]!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    async searchHistorys() {
      try {
        const snapshot = await db.collection('searchHistory').get();
        const search = snapshot.empty
          ? []
          : snapshot.docs.map((doc) =>
              Object.assign(doc.data(), { id: doc.id })
            );
        return search;
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    async addSearch(_, body) {
      try {
        if (body === '') {
          throw new Error('Invalid body');
        }
        const search = {
          radius: body.radius,
          address: body.address,
          lat: body.lat,
          lng: body.lng,
          email: body.email,
        };
        const res = await db.collection('searchHistory').add(search);
        return res;
      } catch (e) {
        throw new Error('An error occured');
      }
    },
    async getSearchbyEmail(_, { email }) {
      try {
        if (email === '') {
          throw new Error('email is required');
        }
        const snapshot = await db
          .collection('searchHistory')
          .where('email', '==', email)
          .get();
        const search = snapshot.empty
          ? []
          : snapshot.docs.map((doc) =>
              Object.assign(doc.data(), { id: doc.id })
            );
        return search;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

// setup express cloud function
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/', cors: true });

exports.graphql = functions.https.onRequest(app);
