import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function PCBox() {
    const [pokemonArray, setPokemonArray] = useState([]);

    useEffect(
        () => {
            const fetchData = async () => {
                await axios.get('http://localhost:4000/PCBox')
                    .then((response) => {
                        //console.log('debug' + response.data);
                        setPokemonArray(response.data);
                    })
                    .catch((error) => {
                        console.log('PCBox.js' + error);
                    });
            }

            fetchData();
        }, []
    );

    const makeCards = () => {
        return pokemonArray.map((pokemon, index) => (
            <div key={index} style={{ width: '200px' }}>
                <Card>
                    <Card.Header>{pokemon.pokemonName}</Card.Header>
                    <Card.Img src={pokemon.image} alt={pokemon.pokemonName} />
                </Card>

            </div>
        ));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {pokemonArray.length > 0 ? (
                makeCards()
            ) : (
                <p>loading</p>
            )}
        </div>
    );
}

export default PCBox;