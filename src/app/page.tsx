'use client';

import { Button, Tabs, Tab, Container, Box  } from '@mui/material';
import React from 'react';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import Category from './components/Category'
import Clue from './components/Clue';


//@ts-ignore
function transpose(obj) {
  return Object.keys(obj).reduce((acc, key: string) => {
    // For each key in the object, iterate over its sub-keys
    // and create a new object where the sub-keys become the main keys

    Object.entries(obj[key]).forEach(([subKey, value]) => {
      //@ts-ignore
      if (!acc[subKey]) acc[subKey] = [];
      //@ts-ignore
      acc[subKey][key] = value;
    });
    return acc;
  }, []);
}

/**
 * BoardHeader component displays the game board header for a Jeopardy-style game.
 *
 * It fetches the current game data from the `/api/game` endpoint on mount and stores it in state.
 * The `round` state determines which round's data to display (default is "jeopardy_round").
 *
 * Categories are extracted as the keys of the current round's object.
 * 
 * For the clues (`values`):
 * - The values of the current round's object are extracted (each representing a category's clues).
 * - These are transposed (so that clues are grouped by row instead of by category).
 * - The resulting 2D array is flattened into a single array, producing a list of clues in board order (row-major).
 *
 * The component renders a grid of category headers and clues, passing each clue object to the `Clue` component.
 */
export default function BoardHeader() {


  const [game, setGame] = useState(null);
  const [round, setRound] = useState("double_jeopardy_round");

  // automatically update the game data when the component mounts
  useEffect(() => {
    async function fetchGame() {

      // use the rest API route to parse the game using jeopardy-json
      const res = await fetch('/api/game'); 

      const data = await res.json();
      console.log('Fetched game data:', data);
      setGame(data);  // store entire game
    }

    fetchGame();
  }, []);


  const categories = game?.[round] ? Object.keys(game[round]) : [];
  let values = game?.[round] ? Object.values(game[round]) : [];

  
  values = transpose(values).flat()
 
  return (
    <Container>
   <Box sx={{
       borderBottom: 2,
       borderColor: '#3d3d3d'
       
      }}>
     
        <Tabs 
          textColor='white'
          indicatorColor="primary"
          onChange={(e,val) => {
          setRound(val);
          }} 
          value={round} >
          <Tab label="Single Jeopardy!" value="jeopardy_round" />
          <Tab label="Double Jeopardy!" value="double_jeopardy_round" />
          <Tab label="Final Jeopardy!" value="final_jeopardy_round" />
        </Tabs>
      </Box>

      
      <Grid container columns={6} spacing={2} sx={{ border: 0, margin: "4em auto", marginTop: "1em"}} justifyContent="center">
        {
          categories.map((cat, index) => (

            <Grid size={1} key={cat}  >
              <Category elevation={index + 2} title={cat} />
            </Grid>
          ))
        }

        {values.map((clueObject: any, i) =>
          <Grid key={i} spacing={2} size={1} >
            <Clue
              {...clueObject} // the entire clue to our modal
              // if the clue is missing style it inactive
              data-active={clueObject.clue ? '' : undefined}

              onReveal={() => console.log(`Revealed clue: ${x.question}`)}
            />
          </Grid>
        )}
      </Grid>

     
    </Container>
  );
}
