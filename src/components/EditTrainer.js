import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EditTrainer() {

    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    // the <Route path>.
    let { id } = useParams();

    //sets and variables use to edit the trainer details
    const [trainerArray, setTrainerArray] = useState([]);
    const [name, setName] = useState("");
    const [favPokemon, setFavPokemon] = useState("");
    const [mood, setMood] = useState("");

    // navigate from react-router-dom to return us to a page the function is called
    const navigate = useNavigate();

    //css
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

    useEffect(
        () => {
            const fetchData = async () => {
                await axios.get('http://localhost:4000/trainer/' + id)//get the trainer passed in
                    .then((response) => {
                        setTrainerArray(response.data);
                        console.log(trainerArray);
                    })
                    .catch((error) => {
                        console.log('EditTrainer.js' + error);
                    });
            }
            fetchData();
            console.log('http://localhost:4000/trainer/' + id);
        }, []
    );

    //submit method
    const editTrainer = (e) => {
        e.preventDefault();

        const trainerDetails = {
            name: name,
            favPokemon: favPokemon,
            mood: mood
        }

        axios.put('http://localhost:4000/editTrainer/' + id, trainerDetails)
            .then((response) => {
                console.log(response.data);
                navigate('/viewAllTrainers');
            });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {trainerArray ? (
                // run editTrainer when the type='submit' input is triggered
                // set the values every time the input box changes
                <form onSubmit={editTrainer} style={{ fontSize: '25px' }}>
                    <input placeholder={trainerArray.name} style={inputCss} onChange={(e) => setName(e.target.value)}></input><br></br>
                    <input placeholder={trainerArray.favPokemon} style={inputCss} onChange={(e) => setFavPokemon(e.target.value)}></input><br></br>
                    <input placeholder={trainerArray.mood} style={inputCss} onChange={(e) => setMood(e.target.value)}></input><br></br>
                    <input type="submit" value='confirm' style={submitCss}></input>
                </form>
            ) : (
                <p>loading</p>
            )}
        </div>
    );
}

export default EditTrainer;