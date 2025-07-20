import { Box, Typography, Divider } from '@mui/material';

import { ReactNode } from 'react';

export default function ContentHeader({ children }: { children: ReactNode }) {

    return (
        <Divider
        textAlign="left"
        sx={{
            my: 2,
            // just a small bit of the line showing before the text
            '&::before': { flex: '0 0 20px', borderTop: "2px solid rgba(0, 0, 0, 0.12)",  },
            
            // fill the rest after the text
            '&::after': { flex: '1 1 auto',  borderTop: "2px solid rgba(0, 0, 0, 0.12)",},
        }}
    >
        <Typography
            component="span"
            variant="h5"
            sx={{ px: 0, color: 'text.secondary', fontSize: {xs: "1.5rem", md:"1.5rem"}, fontWeight: 800, fontFamily: "var(--font-montserrat)" }}
        >
            {children}
        </Typography>
    </Divider>
    );}
