import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Encounter() {
    const [pokemon, setPokemon] = useState(null);

    useEffect(
        () => {
            axios.get('http://localhost:4000/Encounter')
                .then(
                    (response) => {
                        setPokemon(response.data);
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
                    <p>hi {pokemon[0].name}</p>
                    <p>hi {pokemon[1].name}</p>
                </div>
            ):(
                <p>loading</p>
            )}
        </div>
    );
}

export default Encounter;