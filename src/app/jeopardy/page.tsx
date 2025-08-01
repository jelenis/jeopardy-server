'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton, Paper, Tabs, Tab, Container, Box, Typography, InputBase, InputAdornment, NoSsr, Button } from '@mui/material';
import Category from './components/Category';
import Clue, { ClueProps } from './components/Clue';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


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

// Define the shape of each clue object
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
type RoundType = ClueItem[];

interface Game {
  title: string;
  jeopardy_round: RoundType;
  double_jeopardy_round: RoundType;
  final_jeopardy_round: RoundType;
  current_game: number;
  next_game: number;
  prev_game: number;
}

// lookup table for portrait mode grid layout
// This defines how the grid cells are arranged in portrait mode
// (row,column) pairs for each cell in the grid
// The first 6 cells are categories, the rest are clues
const portraitMode = [[0, 0], [0, 1], [0, 2], [6, 0], [6, 1], [6, 2],
[1, 0], [1, 1], [1, 2], [7, 0], [7, 1], [7, 2],
[2, 0], [2, 1], [2, 2], [8, 0], [8, 1], [8, 2],
[3, 0], [3, 1], [3, 2], [9, 0], [9, 1], [9, 2],
[4, 0], [4, 1], [4, 2], [10, 0], [10, 1], [10, 2],
[5, 0], [5, 1], [5, 2], [11, 0], [11, 1], [11, 2]];



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
  const [gameID, setGameID] = useState(-1);
  const [showInput, setShowInput] = useState<string>('');
   const [visible, setVisible] = useState<number>(0);
  const isLandscape = useMediaQuery('(orientation: landscape)', { noSsr: true });


  // reload up if screen is changed in portrait mode
  useEffect(() => {
    const handleOrientationChange = () => {        
      setVisible(prev => (prev+1)%2);
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [game]);


  // automatically update the game data when the component mounts
  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      try {
        const res = await fetch(`jeopardy/api/game?gameID=${gameID}`);
        const data = await res.json();
          
        setGame(data);
        setRound('jeopardy_round');
        
        setShowInput(data.index);

        setLoading(false);
      } catch (error) {
        console.log('Error fetching game data:', error);
      }
    }

    fetchGame();
  }, [gameID]);

  async function fetchShow(num: number) {
    try {
      setLoading(true);
      const res = await fetch(`jeopardy/api/game?show=${num}`);
      const data = await res.json();
 
      setGame(data);
      setRound('jeopardy_round');
      setLoading(false);
    } catch (error) {
      console.log('Error fetching game data:', error);
    }
  }


  const categories = game?.[round] ? Object.keys(game[round]) : [];
  let values: ClueProps[] = game?.[round] ? Object.values(game[round]) : [] as RoundType;
  let finalCat = '';
  let finalValue: ClueProps | null = null;
  const clueRows = (round === 'final_jeopardy_round') ? 1 : 5;

  let gameDate = "";
  if (game && game.title) {
    const monthYearIndex = game.title.indexOf(',');
    gameDate = game.title.slice(monthYearIndex + 1);
  }




  values = transpose(values).flat() as ClueProps[];
  if (game && round === 'final_jeopardy_round') {
    // For Final Jeopardy, we only have one clue, so we need to extract it differently
    let finalRound = Object.values(game[round]) as RoundType;
    finalValue = finalRound[0]
    finalCat = Object.keys(game[round])[0];
  }


  function gotToNextGame(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (game == null || game.next_game == null) return;
    const nextGameID = game.next_game;

    if (!isNaN(nextGameID)) {
      setGameID(nextGameID);
    }
  }

  function gotToPrevGame(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (game == null || game.prev_game == null) return;
    const prevGameID = game.prev_game;

    if (!isNaN(prevGameID)) {
      setGameID(prevGameID);
    }
  }


  return (

    <Container disableGutters
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        pb: "5px",
      }}>

      {/* Tabs / Controls */}
      <Box sx={{ flexShrink: 0, pb: 2, width: '100%',  }}>
        <Box sx={{ bgcolor: "primary.main", }}>
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
                  '@media (max-width:600px)': {
                    minWidth: '55px',
                    fontSize: '0.65rem',
                  },

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
              <Tab sx={{ minWidth: { sm: 50, lg: 100 } }} label="Single" value="jeopardy_round" />
              <Tab sx={{ minWidth: { sm: 50, lg: 100 } }} label="Double" value="double_jeopardy_round" />
              <Tab sx={{ minWidth: { sm: 50, lg: 100 } }} label="Final" value="final_jeopardy_round" />
            </Tabs>


            <Box sx={{
              flex: 1,
         
              display: "flex",
              // hide the title if in portrait mode
              '@media (orientation: portrait)': {
                display: 'none',
              },
              '@media (max-width:800px)': {
                display: 'none',
              },
              justifyContent: 'center'
            }}>

              {/* Header */}
              <Typography sx={{
                position: 'absolute',
                top: '0rem',
                left: '50%',
                transform:'translate(-50%, 0)',
                color: 'rgb(14,65,118)',
                fontWeight: 'bolder',
                fontSize: '2.2rem',
              }}
                component="span">JEOPARDY!
              </Typography>

            </Box>

            {/* INPUT for selecting "show" numbers */}
            <Box sx={{ display: "flex", alignItems: 'center' }}>
              <Typography sx={{

                color: 'rgb(14,65,118)',
                fontSize: '1rem',
              
                whiteSpace: 'nowrap',
                fontWeight: 'bolder',
                '@media (max-width:980px)': {
                  display: 'none',
                },
              }}
                component="span" >
                <Typography component="span" sx={{
                    '@media (max-width:1300px)': {
                  display: 'none',
                },
                }}>Originally Aired:</Typography>
                {gameDate}</Typography>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px', margin: "2px 8px", display: 'flex', alignItems: 'center', width: "9rem",
                  '@media (max-width:600px)': {
                    width: '60px',
                    fontSize: '0.65rem',
                  },
                }}
              >
                <InputBase
                  id="show-input"
                  sx={{
                    ml: 1,
                    color: "grey",
                    '& input': {
                      textAlign: 'right'
                    }
                  }}

                  value={showInput}

                  startAdornment={
                    <InputAdornment position="start" sx={{ '@media (max-width:500px)': { display: 'none' } }}>
                      Game:
                    </InputAdornment>
                  }
                  onChange={e => setShowInput(e.target.value)} // let the user type
                  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    // make sure its a number before submitting
                    const num = Number(showInput);
                    if (!isNaN(num)) {
                      fetchShow(num);
                    } 
                  }}
                />
              </Paper>
            <Button variant="text" sx={{ color: "white" }} disabled={game?.prev_game == null} onClick={gotToPrevGame}><ArrowBackIosIcon /></Button>
            <Button variant="text" sx={{ color: "white" }} disabled={game?.next_game == null} onClick={gotToNextGame}><ArrowForwardIosIcon /></Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Grid Area */}
      <NoSsr>
        <Box   key={visible} sx={{  flex: "1", display: 'flex', justifyContent: 'center', overflowY: isLandscape ? 'hidden' : 'auto'}}>
          {/* Main grid container */}
          <Box
            sx={{
              height: 'calc(100% - 46px)',
              aspectRatio: isLandscape ? '6 / 6' : '3 / 12', // 1:1 in landscape, 1:4 in portrait
              display: 'grid',
              gridTemplateColumns: isLandscape ? 'repeat(6, 1fr)' : 'repeat(3, 1fr)',
              gridTemplateRows: isLandscape ? 'repeat(6, 1fr)' : 'repeat(12, 1fr)',
              gap: 'clamp(0rem, min(2vw, 2vh), 3.1rem)',
              boxSizing: 'border-box',
              width:  isLandscape ? "auto": "75%", 
              
            }}
          >
            {!finalCat && (
              Array.from({ length: 6 }).map((_, idx) => (
                <CategoryCell
                  key={loading ? idx : categories[idx]}
                  index={idx}
                  isLoading={loading}
                  title={loading ? '' : categories[idx]}
                  isLandscape={isLandscape}
                />
              ))
            )}
            {finalCat ? (
              /* FINAL JEOPARDY: one big cell spanning both rows */
              <Box
                sx={{
                  gridRow: isLandscape ? '2 / span 2' : '2 / span 6',
                  gridColumn: isLandscape ? '3 / span 2' : '1 / span 4',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  boxSizing: 'border-box',
                }}>
                {
                  /* there should always be a final value but just incase show loading skeleton */
                  loading || !finalValue
                    ? <Skeleton variant='rectangular' width='100%' height='100%' animation='wave' />
                    : <Clue {...finalValue} finalJeopardy={finalCat} />
                }
              </Box>
            ) : (
              // SINGLE OR DOUBLE JEOPARDY: fill with empty skeleton if still loading
              (loading ? Array(clueRows * 6).fill(null) : values).map((clueObj, idx) => {
                let row = Math.floor(idx / 6) + 2;
                let col = (idx % 6) + 1;
                if (!isLandscape) {
                  // skip the first 6 cells in portrait mode, since they are the categories
                  row = portraitMode[idx + 6][0] + 1; // +1 because grid starts at 1
                  col = portraitMode[idx + 6][1] + 1;
                }
                const key = `${round}-${idx}`; // ensures remount on tab change
                return (
                  <Box
                    key={key}
                    sx={{
                      gridRow: row,
                      gridColumn: col,
                      bgcolor: 'primary.main',
                      opacity: loading ? 0.5 : 1,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    {loading
                      ? <Skeleton variant='rectangular' width='100%' height='100%' animation='wave' />
                      : <Clue {...clueObj} />
                    }
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </NoSsr>
    </Container>
  );
}



/**
 * wrapper function to create a category 
 */
interface CategoryCellProps {
  title: string;
  isLoading: boolean;
  index: number;
  isLandscape: boolean;
}
function CategoryCell({ title, isLoading, index, isLandscape }: CategoryCellProps) {
  return (
    <Box
      key={index}
      component='div'
      sx={{
        gridRow: isLandscape ? 1 : portraitMode[index][0] + 1,
        gridColumn: isLandscape ? index + 1 : portraitMode[index][1] + 1,
        bgcolor: 'primary.main',
        opacity: isLoading ? 0.5 : 1,
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
          variant='rectangular'
          width='100%'
          height='100%'
          animation='wave'
        />
      ) : (
        <Category elevation={index + 2} title={title} />
      )}
    </Box>
  );
}