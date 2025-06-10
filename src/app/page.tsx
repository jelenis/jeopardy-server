'use client';

import { Button, Card, Typography } from '@mui/material';
import React from 'react';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import Category from './components/Category'
import Clue from './components/Clue';



function transpose(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    // For each key in the object, iterate over its sub-keys
    // and create a new object where the sub-keys become the main keys

    Object.entries(obj[key]).forEach(([subKey, value]) => {
      if (!acc[subKey]) acc[subKey] = [];
      acc[subKey][key] = value;
    });
    return acc;
  }, []);
}

export default function BoardHeader() {


  const [game, setGame] = useState(null);
  const [round, setRound] = useState("jeopardy_round");
  useEffect(() => {
    async function fetchGame() {
      const res = await fetch('/api/game'); // ✅ relative URL for Next.js

      const data = await res.json();
      console.log('Fetched game data:', data);
      setGame(data);  // store entire game
    }
   
    fetchGame();
  }, []);


  const categories = game?.[round] ? Object.keys(game[round]) : [];
  let values = game?.[round] ? Object.values(game[round]) : [];
  values = transpose(values).flat()
  console.log('Categories:', );
  return (
    
    <Grid  container columns={6} spacing={2} sx={{ margin: "4em auto", width: "55%" }} justifyContent="center">
      {
        categories
        .map((cat, index) => (
          <Grid size={1} key={cat}  >
            <Category title={cat} />
          </Grid>
        ))
      }

        {values.map((clueObject: any,i) =>   
          <Grid key={i}  spacing={2} item size={1} >
            <Clue 
              {...clueObject}
              onReveal={() => console.log(`Revealed clue: ${x.question}`)} 
            />
          </Grid>
        ) } 
    </Grid>
  );
}
