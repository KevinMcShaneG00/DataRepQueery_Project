import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Encounter() {
    //generate a random number to pick a pokemon
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomForID() {
        //between 400 and 1
        //min is inclusive
        //max is inclusive

        //variables
        let min = 1;
        let max = 400;
        let randomNumber = Math.round(Math.random() * (max - min) + 1);
        console.log(randomNumber);
        return randomNumber
    }
    let randomID = getRandomForID();

    //generate sets and gets for post variables
    const [pokemonName, setPokemonName] = useState('');
    const [image, setImage] = useState('');

    //function to add pokemon to the list of pokemon the user owns
    const catchPokemon = () => {
        console.log('pokemon name:' + pokemonName, 'image:' + image);

        //object to send data neatly to server
        const pokeball = {
            pokemonName: pokemonName,
            image: image
        }

        axios.post('http://localhost:4000/catchpokemon', pokeball)//send data with html promise
            .then()//always need a then and catch hanle for a promise
            .catch();
    }

    const [pokemon, setPokemon] = useState(null);

    useEffect(
        () => {

            axios.get('http://localhost:4000/encounter:' + randomID)
                .then(
                    (response) => {
                        setPokemon(response.data);
                        setPokemonName(response.data.species.name);
                        setImage(response.data.sprites.front_default);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
        }, []
    );

    console.log(pokemon);

    return (
        <div>
            {pokemon ? (
                <div>
                    <p>hi {pokemon.species.name}</p>
                    <button onClick={catchPokemon}>catch</button>
                </div>
            ) : (
                <p>loading</p>
            )}
        </div>
    );
}

export default Encounter;