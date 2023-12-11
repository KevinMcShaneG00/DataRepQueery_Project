import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pokédex() {

    //declare pokemonList and it's setter as null
    const [pokemonList, setPokemonList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Check if data is present in sessionStorage
            const cachedData = sessionStorage.getItem('pokemonData');

            if (cachedData) {
                console.log("Using data from cache")
                setPokemonList(JSON.parse(cachedData));
            }

            else {
                //get a list of all the pokemon's names and url's
                const response = await axios.get('http://localhost:4000/pok%C3%A9dex')
                    .then((response) => {
                        console.log("making a request from api")
                        // Store data in sessionStorage for future use
                        sessionStorage.setItem('pokemonData', JSON.stringify(response.data));

                        setPokemonList(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    })
            }
        };

        //call the anonymous function
        fetchData();
    }, []);

    return (
        <div>
            {/* if else statement in javaScript with the operator ? */}
            {pokemonList ? (
                // run when pokemonList is not null
                <ul>
                    {pokemonList.map((pokemon, index) => (
                        <li key={index}>{pokemon.name}</li>
                    ))}
                </ul>
            ) : (
                // run when it is null
                <p>Loading...</p>
            )}
        </div>
    );
}
export default Pokédex;