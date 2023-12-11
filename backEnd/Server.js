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
    const data = await axios.get('https://pokeapi.co/api/v2/pokemon/1')
        .then((data) => {
            res.json(data.data)
            console.log(data);
        })
        .catch();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})