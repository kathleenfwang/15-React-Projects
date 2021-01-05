import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Pokemon from './Pokemon';
export default function PokemonContainer() {
    const GET_POKEMONS = gql`
    query  
        queryArtists($name: String!) {
          id
        
      }
`;
    const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
        variables: { name: "BTS" },
    });
    
    return (
        <div className="container">
            {pokemons && pokemons.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)}
        </div>
    );
}