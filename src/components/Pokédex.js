import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function Pokédex() {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const cachedData = sessionStorage.getItem('pokemonData');

            if (cachedData) {
                console.log("Using data from cache");
                setPokemonData(JSON.parse(cachedData));
            } else {
                try {
                    console.log("retrieveing data from server");
                    const response = await axios.get('http://localhost:4000/pok%C3%A9dex');
                    sessionStorage.setItem('pokemonData', JSON.stringify(response.data));
                    setPokemonData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {pokemonData ? (
                <div>
                    {pokemonData.allPokemon.map((pokemon, index) => (
                        <Card key={index}>
                            <Card.Header>{pokemon.name}</Card.Header>
                            <Card.Img variant="top" src={pokemonData.pokemonImages[index]} alt={pokemon.name} />
                        </Card>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Pokédex;