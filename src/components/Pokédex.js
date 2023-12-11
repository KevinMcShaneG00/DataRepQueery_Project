import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pokédex() {

    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pok%C3%A9dex');
                setPokemonData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div>
            {pokemonData && (
                <div>
                    <h2>{pokemonData.name}</h2>
                    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                    <p>Height: {pokemonData.height}</p>
                    <p>Weight: {pokemonData.weight}</p>
                </div>
            )}
        </div>
    );
}
export default Pokédex;