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

    return (
        //use the flex model to center the page
        //https://www.w3schools.com/css/css3_flexbox_container.asp
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table style={{ textAlign: 'center' }}>
                {pokemonData ? (
                    // if pokemon is fetched
                    <div>
                        {/* itterate over all elements with map */}
                        {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
                        {pokemonData.allPokemon.map((pokemon, index) => (

                            //if the index Mod6 = 0 is true it is a multiple of 6
                            index % 6 == 0 ? (
                                //make a row
                                <tr key={index}>

                                    {/* then add 6 cards to the row by looping 6 times using map */}
                                    {[0, 1, 2, 3, 4, 5].map((i) => (

                                        //index+i explanation: the outer loops incremental value plus this loops incremental value
                                        //for example index = 18, then when i=0, index+i=18 and as i increases to 5 index+i=23, then the loop drops
                                        //then the first loop increments index to 24 and the process repeats
                                        <td key={index + i}>
                                            {pokemonData.allPokemon[index + i] && (
                                                <Card style={{ width: '200px' }}>
                                                    <Card.Header>{pokemonData.allPokemon[index + i].name}</Card.Header>
                                                    <Card.Img src={pokemonData.pokemonImages[index + i]} alt={pokemonData.allPokemon[index + i].name} />
                                                </Card>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ) : null //leave false value empty
                        ))}
                    </div>
                ) : (
                    //if pokemonData is null
                    <p>Loading...</p>
                )}
            </table>
        </div >
    );
}

export default Pokédex;