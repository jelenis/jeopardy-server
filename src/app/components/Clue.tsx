import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'primary.main',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    width: '80%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:  'column',
    border: 0
};


function ClueModal({ open, onClose, clue, image, video, response }:
    { open: boolean; onClose: () => void; clue: string; response: string }) {
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
                style={{ cursor: 'pointer' }}
            >
                <Box sx={{ ...style }}>
                    <Box >
                        {responseOpen == false && <Typography id="parent-modal-title" variant="h2"
                            sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {clue}
                        </Typography>}
                        {responseOpen && <Typography id="parent-modal-title" variant="h2"
                            sx={{ textAlign: 'center', fontWeight: 'bold' }}>
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

type ClueProps = {
    clue: string | null;    // The clue text
    response: string | null; // The answer to the clue
    value: string;          // The dollar value of the clue
    image: string;
    video: string;
}
const Clue: React.FC<ClueProps> = ({ clue, response, value, image, video }) => {
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState(true);

    const handleReveal = () => {
        setOpen(true);
        console.log(`Revealed clue: ${clue}`);
        console.log(image == "");
    };

    const handleClose = () => {
        setOpen(false);
        setActive(false);
    };

    return (
        <div style={{
            cursor: active ? 'pointer' : 'context-menu',
        }}>
            <ClueModal
                open={open}
                onClose={handleClose}
                {...{ clue, response, image, video }}
            >
            </ClueModal>
            <Card
                onClick={handleReveal}
                sx={{
                    backgroundColor: active ? 'primary.main' : 'primary.dark',
                    opacity: clue == null ? 0.5 : 1,
                    padding: 2,
                    aspectRatio: '1.3 / 1',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(0.6rem, 2.6vw, 3.1rem)',
                }}>

                <Typography sx={{
                    color: active ? '#ffc107' : 'primary.light',
                    fontWeight: "bolder",
                    fontSize: "1em",
                    textShadow: active ? '3px 3px 0px rgba(0, 0, 0, 0.5)' : 'none',
                }}>
                    {value}
                </Typography>

            </Card>
        </div>
    );
};

export default Clue;