const express = require('express')
const axios = require('axios')
const app = express()
const port = 4000

// Handle GET request for Pokemon data
app.get('/pokemon', async (req, res) => {
    const data = await axios.get('https://pokeapi.co/api/v2/pokemon/1')
        .then((data) => {
            res.json(data.data)
        })
        .catch();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})