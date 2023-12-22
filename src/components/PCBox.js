import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function PCBox() {
    const [pokemonArray, setPokemonArray] = useState([]);

    useEffect(
        () => {
            const fetchData = async () => {
                await axios.get('http://localhost:4000/pcbox')
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

    const reloadData = () => {
        axios.get('http://localhost:4000/pcbox')//get data from server.js
            .then(
                (response) => {
                    setPokemonArray(response.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    const makeCards = () => {
        //resource I used to learn about the map method
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        return pokemonArray.map((pokemon, index) => (
            <div key={index} style={{ width: '200px' }}>
                <Card>
                    <Card.Header>{pokemon.pokemonName}</Card.Header>
                    <Card.Img src={pokemon.image} alt={pokemon.pokemonName} />
                    <Card.Footer>
                        <Button variant="danger" onClick={(e) => {
                            e.preventDefault();
                            axios.delete('http://localhost:4000/release/' + pokemon._id)
                                .then(() => {
                                    reloadData();
                                })
                                .catch((error) => {
                                    console.log("can't delete: " + error);
                                });
                        }}>Release</Button>
                    </Card.Footer>
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