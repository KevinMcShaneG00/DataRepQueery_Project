import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pokédex() {

    const [pokemonList, setPokemonList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pok%C3%A9dex');
                setPokemonList(response.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {pokemonList ? (
                <ul>
                    {pokemonList.map((pokemon, index) => (
                        <li key={index}>{pokemon.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
export default Pokédex;