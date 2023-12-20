//imports
const express = require('express')
const axios = require('axios')
const cors = require('cors'); // allow localhost:3000 to access port 4000 resources
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()
const port = 4000

//Use CORS middleware to override security concerns to stop errors
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//body parser for post method
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//SET UP MONGODB
//mongoDB atlas credentials
//username: admin
//password: admin

main().catch(err => console.log(err));

//paste our connection key in here
async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@clusterproject.rub1qk6.mongodb.net/?retryWrites=true&w=majority');
}

//map how our database is layed out 
const pokemonSchema = new mongoose.Schema({
    pokemonName: String,
    image: String
})

const trainerSchema = new mongoose.Schema({
    name: String,
    favPokemon: String,
    mood: String
})

//make a database model to create/read/edit methods for the database
const pokemonModel = mongoose.model('usersPokemon', pokemonSchema);
const trainerModel = mongoose.model('trainerProfiles', trainerSchema);

//Handle GET request for Pokemon data from the API
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

                //Update the count of pokemon received by getting th length of the results array
                count += response.data.results.length;

                if (nextUrl && count < 400) {
                    //get more if limit has not been reached and if there is more to get
                    return fetchData();
                }
            })
            .catch((error) => {
                console.log("fetchData()" + error);
            });
    };

    fetchData()
        .then(() => {
            //when the fetchData() finishes this happpens
            //allPokemon.map acts as an iterator for that array
            //and copies the necessary details from it into imageRequests[]
            const imageRequests = allPokemon.map(async (i) => {
                //make a request with axios and wait in this part of the loop until we've got the url
                const specificPokemonData = await axios.get(i.url);

                //get sprites and give them back to imageRequests[i]
                const sprites = specificPokemonData.data.sprites;
                return sprites.front_default;
            });

            // Promise .all details here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
            // return the array of images
            // images method variable stores a method with a promise so we handle it here
            // It is essentially used to make the promises return in the order of the array[i]
            return Promise.all(imageRequests);
        })
        .then((pokemonImages) => {
            //when Promise.all() runs it then sends data back to the client
            res.json({ allPokemon, pokemonImages });
        })
        .catch((error) => {
            console.error('in /pokédex error', error);
            res.status(500).json({ error: 'Failed to fetch Pokémon data' });
        });
});

//add to the database
app.post('/catchpokemon', (req, res) => {
    //log book object passed in from create.js
    console.log(req.body);

    //create a new document extracing details from the request
    pokemonModel.create({
        pokemonName: req.body.pokemonName,
        image: req.body.image
    })//then and catch for the promise
        .then(() => { res.send("pokemon caught") })
        .catch(() => { res.send("pokemon NOT caught") })
});

//add to the Trainers database
app.post('/addTrainer', (req, res) => {
    //log book object passed in from create.js
    console.log(req.body);

    //create a new document extracing details from the request
    trainerModel.create({
        name: req.body.name,
        favPokemon: req.body.favPokemon,
        mood: req.body.mood
    })//then and catch for the promise
        .then(() => { res.send("profile added") })
        .catch(() => { res.send("profile NOT added") })
});

//find all pokemon in the database
app.get('/PCBox', async (req, res) => {
    let pokemon = await pokemonModel.find({});
    res.send(pokemon);
});

//search the database for specific pokemon

//search for a specific pokemon from the api
app.get('/encounter:pokemonID', async (req, res) => {
    //strip the colon from req.body.pokemonID 
    //before adding to the url and making the request using substring
    //make a method that receives an pokemon ID and returns data for that ID
    console.log(req.params.pokemonID.substring(1, req.params.pokemonID.length));
    await axios.get('https://pokeapi.co/api/v2/pokemon/' + req.params.pokemonID.substring(1, req.params.pokemonID.length))
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            console.log("/encounter:pokemonID" + error);
        });
});

app.delete('/release/:id', async (req, res) => {
    console.log("Delete: " + req.params.id);//print id of book that is being deleted

    let release = await pokemonModel.findByIdAndDelete(req.params.id);//do the delete
    res.send(release);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})