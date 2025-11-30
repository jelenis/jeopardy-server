import ContentList from './ContentList';
import ContentHeader from './ContentHeader';
import NextLink from 'next/link';
import { Typography, Link, Box} from '@mui/material';

import projectsData from '../data/projects.json';


// Highlight component for emphasizing text with primary color and bold font
function Highlight({ children }: { children: React.ReactNode })  {
    return (<Typography sx={{ color: "primary.main", fontWeight: 600 }} component="span">
        {children}
    </Typography>);
}

export default function ProjectSection() {
  return (
    <>
              {/* <ContentHeader>About</ContentHeader> */}
              <ContentHeader >About Me</ContentHeader>
              <Box sx={{ m: 'auto', maxWidth: {xs: 'min(80%, 700px)', lg: 'unset'} }}>
                <Typography sx={{ color: "text.secondary", mb: 2, fontWeight: 100 }}>
                  I’m a Systems Engineering
                  graduate with hands‑on experience in both <Highlight>full-stack development </Highlight>
                  and <Highlight >embedded systems</Highlight>.
                  After stepping away for a bit, I’m now eager to jump back into the tech world and put my skills to work.
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 3, fontWeight: 100 }}>
                  Check out some of my personal projects below. You can also find more on my {' '}
                  <Link component={NextLink} href="https://github.com/jelenis">GitHub</Link>
                  {' '}or connect with me on <Link component={NextLink} href="https://www.linkedin.com/in/john-anthony-elenis"> LinkedIn</Link>!
                </Typography>
              </Box>
              <ContentHeader>Projects</ContentHeader>
              <ContentList projects={projectsData.projects}></ContentList>
              <ContentHeader>Capstone 2019</ContentHeader>
              <ContentList projects={projectsData.capstone}></ContentList>
    </>
  )
}