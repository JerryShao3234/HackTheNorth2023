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
  button: {
    round: {

    },
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
