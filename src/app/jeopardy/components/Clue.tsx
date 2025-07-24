import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Category from './Category';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'primary.main',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    height: '80%',
    '@media (orientation: portrait)':  {
        height: 'auto',
        width: '90%',
    },
    aspectRatio: '1.3 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    outline: 'none',
   
};


function ClueModal({ open, onClose, clue, image, response, video }:
    { open: boolean; onClose: () => void; clue: string | null; response: string | null; image: string; video: string }) {
    
        const [responseOpen, setResponseOpen] = React.useState(false);
    const handleClick = () => {
        if (!responseOpen) {
            setResponseOpen(true);
        }

    }
    return (
        <div >
            <Modal
                open={open}
                onClose={() => {
                    onClose(); // Call the parent onClose function
                    setResponseOpen(false); // Reset response state when closing
                }}
                onClick={handleClick}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                style={{ cursor: 'pointer',  }}
            >
                <Box sx={{ ...style }}>
                    <Box >
                        {responseOpen == false && <Typography id="parent-modal-title" variant="h2"
                            sx={{ textAlign: 'center', fontWeight: 'bold',
                                '@media (orientation: portrait)': {
                                fontSize: '1.5rem',
                            }
                            }}>
                            {clue}
                        </Typography>}
                        {responseOpen && <Typography id="parent-modal-title" variant="h2"
                            sx={{ 
                                textAlign: 'center', 
                                fontWeight: 'bold', 
                                '@media (orientation: portrait)': {
                                fontSize: '1.5rem',
                            } }}>
                            {response}
                        </Typography>}
                    </Box>
                    {image && !responseOpen && <Box
                        component="img"
                        alt=""
                        src={image}
                    />}

                </Box>


            </Modal>
        </div>
    );
}

export type ClueProps = {
    clue: string | null;     // The clue text
    response: string | null; // The answer to the clue
    value: string;           // The dollar value of the clue
    image: string;
    video: string;
    finalJeopardy?: string;
}
const Clue: React.FC<ClueProps> = ({ clue, response, value, image, video, finalJeopardy }) => {
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState(true);

    

    const handleReveal = () => {
        if (!clue) {
            return;
        }
        setOpen(true);
        console.log(`Revealed clue: ${clue}`);
    };

    const handleClose = () => {
        setOpen(false);
        setActive(false);
    };

    return (
        <Box style={{
            cursor: active ? 'pointer' : 'context-menu',
            width: "100%",
            height: "100%",
            aspectRatio: '1.3 / 1'
        }}>
            <ClueModal
                open={open}
                onClose={handleClose}
                {...{ clue, response, image, video }}
            >
            </ClueModal>

            {/* if clue and active this mean that card is clickable
                if there is no clue then the question was never recoreded */}
            <Box
                onClick={handleReveal}
                sx={{
                    // marginTop: finalJeopardy ? "5rem" : "inherit",
                    backgroundColor: clue && active ? 'primary.main' : 'primary.dark',
                    height: "100%",
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(0.1rem, min(5vw, 5vh), 4rem)',
                }}>

                {!finalJeopardy && <Typography sx={{
                    fontSize: "1em",
                    color: clue && active ? '#ffc107' : 'rgb(14,65,118)',
                    opacity: !clue ? 0.1 : 1,
                    fontWeight: "bolder",
                    textShadow: clue && active ? '3px 3px 0px rgba(0, 0, 0, 0.5)' : 'none',
                }}>
                    {value}
                </Typography>}

                {finalJeopardy && <Category elevation={1} title={finalJeopardy} />}

            </Box>
        </Box>
    );
};

export default Clue;