import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function ViewAllTrainers() {

    const [trainerArray, setTrainerArray] = useState([]);

    useEffect(
        () => {
            const fetchData = async () => {
                await axios.get('http://localhost:4000/viewAllTrainers')
                    .then((response) => {
                        //console.log('debug' + response.data);
                        setTrainerArray(response.data);
                    })
                    .catch((error) => {
                        console.log('ViewAllTrainers.js' + error);
                    });
            }

            fetchData();
        }, []
    );

    const reloadData = () => {
        axios.get('http://localhost:4000/viewAllTrainers')
            .then((response) => {
                //console.log('debug' + response.data);
                setTrainerArray(response.data);
            })
            .catch((error) => {
                console.log('ViewAllTrainers.js' + error);
            });
    }

    return (
        //the flex model is useful for diplaying structured content when you do not know how many cards there are going to be
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {trainerArray.map((trainer, i) => (
                <Card key={i} style={{ width: '300px' }}>
                    <Card.Header>Trainer details:</Card.Header>
                    <Card.Body>
                        {trainer.name}<br></br>
                        {trainer.favPokemon}<br></br>
                        {trainer.mood}
                    </Card.Body>
                    <Card.Footer>
                        <Link to={'/EditTrainer/' + trainer._id} className='btn btn-warning'>Edit Profile</Link>
                        <Button variant="danger" onClick={(e) => {
                            e.preventDefault();
                            axios.delete('http://localhost:4000/deleteTrainer/' + trainer._id)
                                .then(() => {
                                    reloadData();
                                })
                                .catch((error) => {
                                    console.log("can't delete: " + error);
                                });
                        }}>Delete profile</Button>
                    </Card.Footer>
                </Card>
            ))}
        </div>
    )
}

export default ViewAllTrainers;