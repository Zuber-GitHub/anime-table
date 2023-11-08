import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_ENDPOINT } from "./utils/constants.js";

const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
