import './App.css';
import Home from './pages/Home.js';
import Prompt from './pages/Prompt.js';
import Story from './pages/Story.js';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import * as React from 'react';
import {Route, Routes} from "react-router-dom";


const theme = createTheme({
    palette: {
      primary: {
          main: "#A8DF8E"
      },
      secondary: {
          main: "#F3FDE8"
        }
    },
    typography: {
      title: {
            fontFamily: "'Lilita One', cursive",
            fontSize: '6rem',
            color: '#F3FDE8',
            fontWeight: 700,
            display: 'inline-block'
      },
      rounded: {
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
            fontSize: '2rem',
            color: '#558ABB', 
            
      },
      poster: {
            fontFamily: [
                'Nunito',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif'
                ].join(','),
            fontSize: '4rem',
            color: '#F3FDE8',
            fontWeight: 700,
            display: 'inline-block'
      },
      paragraph: {
            fontSize: '1.5rem',
      }
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'round' },
            style: {
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              borderRadius : 4,
              boxShadow: '0 9px 1px -2px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#F3FDE8',
              padding: '8px 80px',  // equivalent to py: 2 and px: 20 using 'sx' prop
              fontSize: '1rem'
            }
          }
        ]
      }
    }
  });

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ py: '5%', px: '10%', bgcolor: 'primary.main', height:'100vh'}}>

            <Routes>
                <Route key="home" exact path="/" element={<Home/>}/>,
                <Route key="prompt" exact path="/prompt" element={<Prompt/>}/>
                <Route key="story" exact path="/story" element={<Story/>}/>
            </Routes>
            </Box>
        </ThemeProvider>
    );
}

export default App;
