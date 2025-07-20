import React from 'react';
import { Box, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function SocialLinks() {
  return (
    <Box sx={{ display: 'flex', gap: 2, m: "auto"}}>
      <IconButton
        component="a"
        href="https://github.com/jelenis"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <GitHubIcon fontSize="large" />
      </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton
        component="a"
        href="https://www.linkedin.com/in/john-anthony-elenis"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon fontSize="large" />
      </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton
        component="a"
        href="mailto:johnanthonyelenis@gmail.com"
        aria-label="Email"
      >
        <EmailIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}