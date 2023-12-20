import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function Pokédex() {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            //get data from session storage
            const cachedData = sessionStorage.getItem('pokemonData');

            //if cachedData is not null
            if (cachedData) {
                console.log("Using data from cache");

                //parse the data from string back into json
                setPokemonData(JSON.parse(cachedData));
            }
            //if cachedData is still null
            else {
                console.log("retrieveing data from server");
                await axios.get('http://localhost:4000/pok%C3%A9dex')
                    .then((response) => {
                        //parse the json into a string and store in session storage
                        //as per the fair use policy of the api
                        sessionStorage.setItem('pokemonData', JSON.stringify(response.data));

                        //set the data into pokemonData
                        setPokemonData(response.data);
                    })
                    .catch((error) => {
                        console.error('in pokedex.js', error);
                    });
            }
        };

        fetchData();
    }, []);

    const makeCards = () => {
        return pokemonData.allPokemon.map((pokemon, index) => (
            <div key={index} style={{ width: '200px' }}>
                <Card>
                    <Card.Header>{pokemon.name}</Card.Header>
                    <Card.Img src={pokemonData.pokemonImages[index]} alt={pokemon.name} />
                </Card>
            </div>
        ));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {pokemonData ? (
                makeCards()
            ) : (
                <p>loading</p>
            )}
        </div>
    );
}

export default Pokédex;