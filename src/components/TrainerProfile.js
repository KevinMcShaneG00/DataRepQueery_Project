import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainerProfile() {

    //variables for trainer
    const [name, setName] = useState("");
    const [favPokemon, setFavPokemon] = useState("");
    const [mood, setMood] = useState("");

    //variables containing css to seperate code somewhat and keep it neat
    const inputCss = {
        border: '2px solid blue',
        borderRadius: '20px',
        margin: '10px',
        textAlign: 'center'
    }

    const submitCss = {
        border: '2px solid purple',
        borderRadius: '20px',
        color: 'purple',
        backgroundColor: 'pink'
    }

    const addTrainer = (e) => {
        e.preventDefault();

        const trainerDetails = {
            name: name,
            favPokemon: favPokemon,
            mood: mood
        }

        //add the trainer to the database
        axios.post('http://localhost:4000/addTrainer', trainerDetails)
        .then(()=>{
            alert("Profile added successfully");
        })
        .catch();
    }

    return (
        // container div
        <div>
            <h1>
                Welcome to the trainer profile page:
            </h1>
            <h4>
                this is a page where pokemon trainers can enter their details
            </h4>

            <form onSubmit={addTrainer} style={{ fontSize: '25px' }}>
                <input placeholder="Trainer Name" style={inputCss} onChange={(e) => setName(e.target.value)}></input><br></br>
                <input placeholder="Favourite Pokemon" style={inputCss} onChange={(e) => setFavPokemon(e.target.value)}></input><br></br>
                <input placeholder="Current Mood" style={inputCss} onChange={(e) => setMood(e.target.value)}></input><br></br>
                <input type="submit" value='confirm' style={submitCss}></input>
            </form>
        </div>
    );
}

export default TrainerProfile;