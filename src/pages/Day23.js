import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
    cache: new InMemoryCache()
  });
  
  function ExchangeRates() {
    const { loading, error, data } = useQuery(gql`
      {
        rates(currency: "USD") {
          currency
          rate
          name
        }
      }
    `);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.rates.map(({ currency, rate,name }) => 
    {
      if (name)
      { return (<div key={currency}>
      <p>
        <h1>{name}</h1>
        {currency}: { Math.round(rate * 100) / 100}
      </p>
    </div>)}}
    )
  }

export default function Day23() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Currency Exchange Apollo App 🚀</h2>
        <h3> Exchange rates for 1 USD (USA) </h3> 
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );
}