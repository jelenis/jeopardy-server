'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton, Paper, Tabs, Tab, Container, Box, Typography, InputBase, InputAdornment } from '@mui/material';
import Category from './components/Category';
import Clue, { ClueProps } from './components/Clue';

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

// 1. Define the shape of each clue object
 interface ClueItem {
  clue: string | null;     
  response: string | null; 
  value: string;
  dd: boolean;
  image: string;
  video: string;
  row: number;
  column: number;
}

// 2. Define RoundType as an array of those items
type RoundType = ClueItem[];

interface Game {
  jeopardy_round:       RoundType;
  double_jeopardy_round: RoundType;
  final_jeopardy_round:   RoundType;
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
  const [game, setGame] = useState<Game | null>(null);
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
  let values : ClueProps[] = game?.[round] ? Object.values(game[round]) : [] as RoundType;
  let finalCat = '';
  let finalValue : ClueProps | null = null;
  const GreyColour = 'rgba(255,255,255,0.2)';
  const clueRows = (round === 'final_jeopardy_round') ? 1 : 5;

  values = transpose(values).flat() as ClueProps[];
  if (game && round === 'final_jeopardy_round') {
    // assert unknown becuase library output might change in future
    let finalRound = Object.values(game[round]) as RoundType;
    finalValue = finalRound[0]
    finalCat = Object.keys(game[round])[0];
  }

  return (
    <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // span full viewport height
      }}>
      {/* This Box acts as the main container for the board and header, filling the entire width and height.
       It enables the grid to scale responsively with the screen size.*/}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: "center"
      }}>
        <Box sx={{
          width: `min(100%, 100vh)`,
          aspectRatio: `1.3 / 1`,
          overflow: 'hidden',

          // use flex to stack header / tabs / board
          display: 'flex',
          flexDirection: 'column',
          height: "100vh"
        }}>

     

        {/* -------------- Header -------------- */}
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

        {/* -------------- Tabs  --------------*/}
        <Box sx={{ paddingBottom: "1rem", }}>
          <Paper sx={{ bgcolor: "primary.main", }}>
            <Box sx={{}} display="flex" justifyContent="space-between" alignItems="center">
              <Tabs
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
                sx={{ p: '2px 4px', margin: "2px 8px", display: 'flex', alignItems: 'center', width: "9rem" }}
              >
                <InputBase
                  sx={{ ml: 1 }}
                  placeholder="1"
                  defaultValue={show}
                             startAdornment={
                    <InputAdornment position="start">
                      Game #
                    </InputAdornment>
                  }
                  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    // make sure its a number before submitting
                    const newValue = (event.target as HTMLInputElement).value;
                    if (!isNaN(Number(newValue))) {
                      setShow(Number(newValue));
                    }
                  }}
                />
              </Paper>
            </Box>

          </Paper>
        </Box>

        {/* -------------- Board & Grid  --------------*/}
    
        <Box
          id="jeopardy-board"
          sx={{
            aspectRatio: '1.3 / 1', // game aspect ratio is equvalient for inner cells
            display: 'grid',
            gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
            gridTemplateRows:  'repeat(6, minmax(0, 1fr))',
            gap: 2,
            // width: `min(100%, 100vh)`,
            maxHeight:"100%",
            boxSizing: 'border-box',

          }}
        >


          
          {/* --------------- Categories -------------- */}
          {!finalCat && (
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
{finalCat ? (
  /* FINAL JEOPARDY: one big cell spanning both rows *and* all 6 columns */
  <Box
    sx={{
      gridRow:    '1 / span 2',    
      gridColumn: '3 / span 2',    
      bgcolor:    'primary.main',
      color:      'white',
      display:    'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width:      '100%',
      height:     '100%',
      boxSizing:  'border-box',
    }}
  >
    {loading || !finalValue
      ? <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" /> 
      : <Clue {...finalValue} finalJeopardy={finalCat} />
    }
  </Box>
) : (
  /* SINGLE OR DOUBLE JEOPARDY: fill with empty skeleton if still loading */
  (loading ? Array(clueRows * 6).fill(null) : values).map((clueObj, idx) => {
    const row = Math.floor(idx / 6) + 2;
    const col = (idx % 6) + 1;
    return (
      <Box
        key={idx}
        sx={{
          gridRow:      row,
          gridColumn:   col,
          bgcolor:      'primary.main',
          opacity:      loading ? 0.5 : 1,
          color:        'white',
          display:      'flex',
          alignItems:   'center',
          justifyContent:'center',
          width:        '100%',
          height:       '100%',
          boxSizing:    'border-box',
        }}
      >
        {loading
          ? <Skeleton variant="rectangular" width="100%" height="100%" animation="wave"/>
          : <Clue {...clueObj} />
        }
      </Box>
    );
  })
)}
        </Box>

       
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