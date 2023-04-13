import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const prod = "https://livechatv1.onrender.com/api/v1/app";
const dev = "http://localhost:8080/api/v1/app";

const httpLink = createHttpLink({
  uri: prod,
});

export const cache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const access_token = await localStorage.getItem("token");
  console.log("token: ", access_token);
  console.log("here in auth");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    },
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([authLink.concat(httpLink), errorLink]),
  cache: cache,
  defaultOptions: defaultOptions,
});

export default client;
