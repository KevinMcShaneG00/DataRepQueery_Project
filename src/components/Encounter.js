import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

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
        return randomNumber;
    }
    //generate sets and gets for post variables
    const [pokemon, setPokemon] = useState(null);
    const [pokemonName, setPokemonName] = useState('');
    const [image, setImage] = useState('');
    const [randomID, setRandomID] = useState('');

    //function to add pokemon to the list of pokemon the user owns
    const catchPokemon = () => {
        console.log('pokemon name:' + pokemonName, 'image:' + image);

        //object to send data neatly to server
        const pokeball = {
            pokemonName: pokemonName,
            image: image
        }

        axios.post('http://localhost:4000/catchpokemon', pokeball)//send data with html promise
            .then(()=>{
                //tell the user https://www.w3schools.com/js/js_popup.asp
                alert("pokemon caught successfully");
            })
            .catch();
    }

    //set counter to ensure that the random and rquest is only made once
    //every time the page is reloaded or saved it sets counter to 0
    var useEffectUpdateCounter = 0;
    useEffect(
        () => {
            if (useEffectUpdateCounter == 0) {
                var id = getRandomForID();
                setRandomID(id);
            

                console.log('http://localhost:4000/encounter:' + id)
                axios.get('http://localhost:4000/encounter:' + id)
                    .then(
                        (response) => {
                            //set the data here
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
            }
            useEffectUpdateCounter++;
        }, []
    );

    return (
        <div>
            {pokemon ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '200px' }}>
                        <Card.Header>{pokemon.species.name}</Card.Header>
                        <Card.Img src={pokemon.sprites.front_default} alt={pokemon.species.name} />
                        <button onClick={catchPokemon}>Catch</button>
                    </Card>
                </div>
            ) : (
                <p>loading</p>
            )}
        </div>
    );
}

export default Encounter;