'use client';

import {  Grid, Skeleton, Paper, Tabs, Tab, Container, Box, Typography, InputBase } from '@mui/material';
import React from 'react';
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

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [round, setRound] = useState("jeopardy_round");
  const [show, setShow] = useState(1);

  // automatically update the game data when the component mounts
  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      // use the rest API route to parse the game using jeopardy-json
      const res = await fetch(`/api/game?show=${show}`); 

      const data = await res.json();
      console.log('Fetched game data:', data);
      setGame(data);  // store entire game
      setRound("jeopardy_round");
      setLoading(false);
      
    }

    fetchGame();
  }, [show]);


  console.warn("rendering", game);

  const categories = game?.[round] ? Object.keys(game[round]) : [];
  let values = game?.[round] ? Object.values(game[round]) : [];
  let finalCat = "";
  const GreyColour = "rgba(255,255,255,0.2)";

  values = transpose(values).flat();
  
  if (game && round === "final_jeopardy_round") {
    if (!game[round]) {
      console.error("need to handle missing final jeopardy");
    }
     values = [Object.values(game[round])[0]];
     finalCat = Object.keys(game[round])[0];
  }
  
 
  return (
    <Container>
      <Box 

      display="flex"
      justifyContent="center"
      alignItems="center">
        <Typography variant="h1" sx={{
          color: GreyColour,
          fontWeight: "bolder",
          marginBottom: "0.5rem"
        }}>JEOPARDY!</Typography>

      </Box>
      
      <Paper sx={{bgcolor: "primary.main"}}>
        <Box sx={{  }} display="flex" justifyContent="space-between" alignItems="center">
          <Tabs 
            textColor='white'
            indicatorColor="primary"
            onChange={(e,val) => {
              setRound(val);
            }} 
            value={round} 
            sx={{
              '& .MuiTabs-indicator': {
                height: '0px',
              },
              '& .MuiTab-root': {
                color: 'rgba(14,65,118,1)',
                fontWeight: 'bold',
                fontSize: '1rem',
                textTransform: 'none',
                transition: '0.3s',
                borderLeft: "0.02rem outset #1565c022",
                borderRight: "0.02rem outset #1565c022",
                borderTop: "none",
                borderBottom: "none",

                '&.Mui-selected': {
                  color: '#fff',
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.2)' 
                },
                '&:hover': {
                  color: '#fff',
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                
                },
              },
            }}>
            <Tab sx={{  minWidth: 200}} label="Single" value="jeopardy_round" />
            <Tab sx={{  minWidth: 200}} label="Double" value="double_jeopardy_round" />
            <Tab sx={{  minWidth: 200}} label="Final" value="final_jeopardy_round" />
          </Tabs>
          <Paper
            component="form"
            sx={{ p: '2px 4px', margin: "2px 8px", display: 'flex', alignItems: 'center', width: "10rem" }}
          >
            <InputBase
              sx={{ ml: 1 }}
              placeholder="Show Number"
              inputProps={{ 'aria-label': 'search google maps' }}
              defaultValue={show}
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                event.preventDefault();
                // make sure its a number
                const newValue = event.target.value;
                if (!isNaN(newValue)) {

                  setShow(newValue);
                }
              }}
            />
          </Paper>
        </Box>

      </Paper>

      {loading &&
        <Grid container spacing={2} columns={6} justifyContent="center">
          { 
            Array.from({ length: 36 }).map((_, i) => 
              <Grid key={i} spacing={2} size={1} sx={{ border: 0, marginTop: "1em"}}>
          
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                
                  sx={{  
                    bgcolor: "grey.800",
                    aspectRatio: '1.3 / 1',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
            
              </Grid>
          
            )
          }
           
        </Grid>}
   
      { loading == false && 
      <Grid container columns={6} spacing={2} sx={{ border: 0, margin: "4em auto", marginTop: "1em"}} justifyContent="center">
        {

          round !== "final_jeopardy_round" && 
          categories.map((cat, index) => (

            <Grid size={1} key={cat}><Category elevation={index + 2} title={cat} /></Grid>
          ))
        }

        {values.map((clueObject: any, i) =>
          <Grid key={i} spacing={2} size={round !== "final_jeopardy_round" ? 1 : 3} >
            <Clue
              finalJeopardy={finalCat}
              {...clueObject}  
              // if the clue is missing style it inactive
              data-active={clueObject.clue ? true : false}

              onReveal={() => console.log(`Revealed clue: ${x.question}`)}
            />
          </Grid>
        )}
      </Grid>
       }
    </Container>
  );
}

