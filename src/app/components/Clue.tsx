import React from 'react';
import { Button, Card, Typography } from '@mui/material';

const Clue: React.FC<ClueProps> = ({ clue, answer, value, onReveal }) => {
    const [revealed, setRevealed] = React.useState(false);

    const handleReveal = () => {
        setRevealed(true);
        if (onReveal) onReveal();
    };

    return (
        <Card

            sx={{
                opacity: clue == null ? 0.5 : 1,
                padding: 2,
                aspectRatio: '1.3 / 1',
                textAlign: 'center',
                backgroundColor: "primary.main",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(0.6rem, 2.3vw, 4rem)',
            }}>

            <Typography sx={{

                m: 0, // removes all margin
                color: "#ffc107",
                fontWeight: "bolder",
                fontSize: "1em",
                fontWeight: 'bold',
                textShadow: '3px 3px 0px rgba(0, 0, 0, 0.5)',
            }}>
                {value}
            </Typography>

        </Card>
    );
};

export default Clue;