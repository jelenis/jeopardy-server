'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton, Paper, Tabs, Tab, Container, Box, Typography, InputBase } from '@mui/material';
import Category from './components/Category';
import Clue from './components/Clue';

//@ts-ignore
function transpose(obj) {
  return Object.keys(obj).reduce((acc, key: string) => {
    Object.entries(obj[key]).forEach(([subKey, value]) => {
      //@ts-ignore
      if (!acc[subKey]) acc[subKey] = [];
      //@ts-ignore
      acc[subKey][key] = value;
    });
    return acc;
  }, [] as any[]);
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
  const [game, setGame] = useState<any>(null);
  const [round, setRound] = useState<'jeopardy_round' | 'double_jeopardy_round' | 'final_jeopardy_round'>('jeopardy_round');
  const [show, setShow] = useState(1);

  // automatically update the game data when the component mounts
  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      const res = await fetch(`/api/game?show=${show}`);
      const data = await res.json();
      setGame(data);
      setRound('jeopardy_round');
      setLoading(false);
    }
    fetchGame();
  }, [show]);

  const categories = game?.[round] ? Object.keys(game[round]) : [];
  let values = game?.[round] ? Object.values(game[round]) : [];
  let finalCat = '';
  const GreyColour = 'rgba(255,255,255,0.2)';
  const clueRows = round === 'final_jeopardy_round' ? 1 : 5;

  values = transpose(values).flat();
  if (game && round === 'final_jeopardy_round') {
    values = [Object.values(game[round])[0]];
    finalCat = Object.keys(game[round])[0];
  }

  return (
    <Container>
      {/* This Box acts as the main container for the board and header, filling the entire width and height.
       It enables the grid to scale responsively with the screen size.*/}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // span full viewport height
      }}>

        {/* Header + Tabs */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Typography variant="h1" sx={{
            color: GreyColour,
            fontWeight: "bolder",
            paddingBottom: "2rem"
          }}>JEOPARDY!</Typography>

        </Box>
        <Box sx={{ paddingBottom: "1rem" }}>
          <Paper sx={{ bgcolor: "primary.main", }}>
            <Box sx={{}} display="flex" justifyContent="space-between" alignItems="center">
              <Tabs
                textColor='white'
                indicatorColor="primary"
                onChange={(e, val) => {
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
                <Tab sx={{ minWidth: 200 }} label="Single" value="jeopardy_round" />
                <Tab sx={{ minWidth: 200 }} label="Double" value="double_jeopardy_round" />
                <Tab sx={{ minWidth: 200 }} label="Final" value="final_jeopardy_round" />
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
        </Box>

        {/* Board CSS Grid */}
        <Box
          id="jeopardy-board"
          sx={{
            aspectRatio: '1.3 / 1', // game aspect ratio is equvalient for inner cells
            display: 'grid',
            gridTemplateColumns: finalCat ? "1fr" : 'repeat(6, minmax(0, 1fr))',
            gridTemplateRows: finalCat ? '1fr 1fr' : 'repeat(6, minmax(0, 1fr))',
            gap: 2,
            width: '100%',
            boxSizing: 'border-box',

          }}
        >
          {/* --------------- Categories -------------- */}
          {!finalCat && (
            // build an array of exactly 6 “slots”
            Array.from({ length: 6 }).map((_, i) => (
              <CategoryCell
                key={i}
                index={i}
                isLoading={loading}
                title={loading ? "" : categories[i]}
              />
            ))
          )}


          {/* --------------- Clues -------------- */}
          {(loading ? Array(6 * clueRows).fill(null) : values).map((clueObj, idx) => {
            // CSS rows are 1-based so we have to add 2 (1-being the categeory row)
            const row = Math.floor(idx / 6) + 2;
            // add 1 for CSS rows being 1-based
            const col = (idx % 6) + 1;
            return (
              <Box
                key={idx}
                component="div"
                sx={{
                  gridRow: row,
                  gridColumn: col,
                  bgcolor: 'primary.main',
                  opacity: loading ? "0.5" : "1", 
                  color: 'white',
                  textAlign: 'center',
                  width: '100%',
                  aspectRatio: "1.3 / 1",
                  boxSizing: 'border-box',

                }}
              >
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                  />
                ) : (
                  <Clue {...clueObj} finalJeopardy={finalCat} data-active={!!clueObj?.clue} />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}


interface CategoryCellProps {
  title: string;
  isLoading: boolean;
  index: number;
}
function CategoryCell({ title, isLoading, index }: CategoryCellProps) {
  return (
    <Box
      key={index}
      component="div"
      sx={{
        gridRow: 1,
        gridColumn: index + 1,
        bgcolor: 'primary.main',
        opacity: isLoading ? "0.5" : "1", 
        color: 'white',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      ) : (
        <Category elevation={index + 2} title={title} />
      )}
    </Box>
  );
}