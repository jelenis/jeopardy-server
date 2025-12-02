import { JSX } from "@emotion/react/jsx-runtime";
import { Chip, Typography, Box } from "@mui/material";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { SiMui } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiCheerio } from "react-icons/si";
import { FaLinux } from "react-icons/fa";
import { SiAxios } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { SiC } from 'react-icons/si';

const colorMap: { [key: string]: JSX.Element } = {
    'tailwind': <RiTailwindCssFill />,
    'react': <FaReact />,
    'node.js': <FaNodeJs />,
    'typescript': <SiTypescript />,
    'javascript': <IoLogoJavascript />,
    'material ui': <SiMui />,
    'next.js': <RiNextjsFill />,
    'cheerio': <SiCheerio />,
    'linux': <FaLinux />,
    'axios': <SiAxios />,
    'python': <FaPython />,
    // 'c': <SiC />, this ones ugly
}

export default function ({ label }: { label: string }) {

    const color = colorMap[label.toLowerCase()] || 'default';
    const icon = colorMap[label.toLowerCase()] ? colorMap[label.toLowerCase()] : null;

    return <Chip
        className="color-shift-chip"
       
        label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {icon}
                <Box 
                    component="span" 
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                    {label}
                </Box>
            </Box>
        }
        variant="outlined"
        sx={{
            display: {xs: icon ? "flex" : "none" , md: 'flex' },
            px: {xs: '0.2em'},
            py: {xs: '0.1em'},
            fontSize: { xs: '0.8em' },
        }}
    />;

}