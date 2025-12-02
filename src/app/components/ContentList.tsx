
import React from 'react';
import { Box, CardMedia, Card, CardContent, Typography, CardActionArea, Divider, Stack } from '@mui/material';
import Markdown from 'react-markdown'
import ColoredChip from './ColoredChip';

interface Project {
  thumbnail: string;
  title: string;
  description: string;
  chips?: string[];
  href?: string;
  imageStyle?: React.CSSProperties;
}

interface ContentListProps {
  projects: Project[];
}


// card styles for cleaner 
const cardStyles = {
  maxWidth: { xs: 'min(80%, 700px)', lg: 'unset' },
  transition: 'box-shadow 0.2s ease-in-out',
  boxShadow: '0',
  '&:hover': {
    boxShadow: 4,
  },
  borderRadius: "10px",
  border: "1px solid rgba(0,0,0,0.1)"
};




// Extracted ProjectCard component for better readability
function ProjectCard({ project }: { project: Project }) {
  return (
    <Box sx={{
      display: "flex",
      alignContent: "center",
      justifyContent: "center"
    }}>
      <Card sx={cardStyles}>
        <CardActionArea component="a" href={project.href}>
          <CardMedia
            sx={{ height: 140, ...project.imageStyle }}
            image={project.thumbnail}
            title={project.title}
          />
          <CardContent sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }}>
            <Typography gutterBottom variant="h5" component="div"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                fontFamily: 'var(--font-poppins)',
              }}>
              {project.title}
            </Typography>
            
            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 2 }}>
              <Markdown>{project.description}</Markdown>
            </Typography>

            {/* Render chips with CSS bullet delimiters */}
            {project.chips && (
              <Stack className="chip-list" direction="row" gap={'1rem'} flexWrap="nowrap" sx={{ mt: 3 }}>
                {project.chips.map((chip) => (
                  <ColoredChip key={chip} label={chip} />
                ))}
              </Stack>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

// container styles
const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  '& > :last-child': {
    mb: 2,
  },
};

// Main ContentList component
export default function ContentList({ projects }: ContentListProps) {
  return (
    <Box sx={containerStyles}>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </Box>
  );
}
