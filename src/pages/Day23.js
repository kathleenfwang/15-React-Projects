import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import PokemonContainer from './Components2/day23/PokemonContainer';

export default function App() {
    const client = new ApolloClient({
        uri: 'https://graphql-pokemon.now.sh'
    });
    
    return (
        <ApolloProvider client={client}>
            <main>
                <PokemonContainer />
            </main>
        </ApolloProvider>
    )
}