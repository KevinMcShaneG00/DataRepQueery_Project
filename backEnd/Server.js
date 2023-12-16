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
    //first url in the api
    let nextUrl = 'https://pokeapi.co/api/v2/pokemon'; 

    //limit the amount of data requested from the api to prevent 
    //ECONNRESET error with the api server
    let count = 0;

    const fetchData = () => {
        return axios.get(nextUrl)
        .then((response) => {
            //to add results to allPokemon, use allPokemon.push, but because .push()expects a single element to be added
            //we must split up the 20 records in the results array using ...
            allPokemon.push(...response.data.results);
            
            //next url from api
            nextUrl = response.data.next;

            //Update the count
            count += response.data.results.length; 

            if (nextUrl && count < 400) {
                //get more if limit has not been reached
                return fetchData(); 
            }
        })
        .catch((error)=>{
            console.log("fetchData()" + error);
        });
    };

    fetchData()
        .then(() => {
            //when the fetchData() finishes this happpens
            //allPokemon.map acts as an iterator for that array
            const imageRequests = allPokemon.map(async (pokemon) => {
                //make a request with 
                const specificPokemonData = await axios.get(pokemon.url);

                //store sprites and return them
                const sprites = specificPokemonData.data.sprites;
                return sprites.front_default;
            });

            // Promise .all details here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
            // It is essentially used to make the promises return in the order in which they were made
            return Promise.all(imageRequests);
        })
        .then((pokemonImages) => {
            //when Promise.all() runs it then sends data back to the client
            res.json({ allPokemon, pokemonImages });
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch Pokémon data' });
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})