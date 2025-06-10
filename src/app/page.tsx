'use client';

import { Button, Typography } from '@mui/material';
import React from 'react';
import Category from './components/Category'
import { Grid } from '@mui/material';
import {useEffect,useState } from 'react';

export default function BoardHeader() {
  let categories = ['History', 'Science', 'Movies', 'Literature', 'Music', 'Sports'];
  
const [game, setGame] = useState(null);
 useEffect(() => {
    async function fetchGame() {
      const res = await fetch('/api/game'); // ✅ relative URL for Next.js

      const data = await res.json();
      console.log('Fetched game data:', data);
      categories = (Object.keys(["jeopardy_round"]));
      setGame(data);  // store entire game
    }

    fetchGame();
  }, []);

  return (

    <Grid  container spacing={2} sx={{ marginTop: 2,  }} justifyContent="center">
      {game?.jeopardy_round && Object.keys(game.jeopardy_round)
      .map((cat, index) => (
        <Grid  key={cat}  >
          <Category  title={cat} />
        </Grid>
      ))}
    </Grid>
  );
}
