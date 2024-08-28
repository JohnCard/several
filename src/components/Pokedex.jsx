import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useState } from "react";

export default function Pokedex() {

    const [pokemon, setPokemon] = useState('')
    const [pokemonData, setPokemonData] = useState({})

    const getPokemon = (e) => {
        e.preventDefault()
        // URL de la API de PokéAPI para obtener información del Pokémon Pikachu
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

        // Usamos fetch para hacer la solicitud a la API
        fetch(apiUrl+pokemon)
        .then(response => {
            // Verificamos si la respuesta es exitosa
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            // Convertimos la respuesta a formato JSON
            return response.json();
        })
        .then(data => {
            setPokemonData(data)
        })
        .catch(error => {
            // Manejamos errores, como problemas de red
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
    }
  return (
    <>
    <Box sx={{ width: '100%', maxWidth: 1300, marginLeft: 5 }}>
        <Typography variant="h3" gutterBottom>
            Welcome to my pokedex application, HAVE A GREAT DAY!!!
        </Typography>
    </Box>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 0, width: '25ch', marginLeft: 30, marginTop: 5 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={getPokemon}
    >
        <TextField
        id="standard-basic" 
        label="Standard" 
        value={pokemon}
        variant="standard"
        onChange={(e) => setPokemon(e.target.value)}/>
        <Button 
        variant="contained"
        type='submit'
        >
            Contained
        </Button>
    </Box>
    {
        pokemonData.sprites && <Card sx={{ 
            width: 500, 
            marginLeft: 40, 
            marginTop: 5, 
            marginBottom: 5,
            boxShadow: 20
            }}>
            <CardMedia
                sx={{ height: 500, border: 2, borderRadius: 1, backgroundColor: 'cyan' }}
                image={pokemonData.sprites['front_default']}
                title={pokemon}
            />
            <CardContent>
                <Typography gutterBottom variant="h3">
                    {pokemonData.name.toUpperCase()}
                </Typography>
                <Typography gutterBottom variant="h4">
                    Pokemon primary key: {pokemonData.id}
                </Typography>
                <Typography gutterBottom variant="h4">
                    Default: {String(pokemonData.is_default)}
                </Typography>
                <Typography gutterBottom variant="h4">
                    Height: {pokemonData.height} mm
                </Typography>
                <Typography gutterBottom variant="h4">
                    Experience: {pokemonData.base_experience} years
                </Typography>
                <Typography gutterBottom variant="h4">
                    Order: {pokemonData.order}
                </Typography>
                <Typography gutterBottom variant="h4">
                    Weight: {pokemonData.weight}
                </Typography>
                <Typography gutterBottom variant="h5">
                    Moves: {pokemonData.moves.map(move => move.move.name + ', ')}
                </Typography>
            </CardContent>
        </Card>
    }
    </>
  );
}

