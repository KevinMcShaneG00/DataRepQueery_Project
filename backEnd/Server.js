const express = require('express')
const axios = require('axios')
const cors = require('cors'); // allow localhost:3000 to access port 4000 resources
const app = express()
const port = 4000

//Use CORS middleware
app.use(cors());

// Handle GET request for Pokemon data
//note that é = %C3%A9 and is automatically converted in the http req
app.get('/pok%C3%A9dex', async (req, res) => {

    let allPokemon = [];
    let nextUrl = 'https://pokeapi.co/api/v2/pokemon';

    const fetchPokemonData = () => {
        return axios.get(nextUrl)
            .then((response) => {
                // Appending the fetched Pokémon from response.data.results to the allPokemon array with ... spread syntax
                allPokemon = [...allPokemon, ...response.data.results];
                //fetch the next line of data
                nextUrl = response.data.next;

                //if nextUrl is not null and is therefore a truthy value
                if (nextUrl) {
                    return fetchPokemonData(); // Fetch next page recursively
                }
            });
    };

    fetchPokemonData()
        .then(() => {
            res.json(allPokemon);
        })
        .catch((error) => {
            console.error('Error fetching Pokémon data:', error);
            res.status(500).json({ error: 'Failed to fetch Pokémon data' });
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})