import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import * as locales from '@mui/material/locale';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

export default function Prompt() {
    const navigate = useNavigate();

    const [inputText, setInputText] = React.useState("");
    const [locale, setLocale] = React.useState('enUS');

    // React.useEffect(() => {
    //     console.log(locales);
    // }, []);

    const submitInput = async (input) => {
        if (input.length === 0) {
            alert("Please write something!");
            return;
        }

        localStorage.setItem("story", undefined);
        localStorage.setItem("imageUrls", undefined);

        navigate("/story", {state: {story: input}})
    }

    // const theme = useTheme();

    // const themeWithLocale = React.useMemo(
    //     () => createTheme(theme, locales[locale]),
    //     [locale, theme],
    // );

    return (
        <div>
            <Box sx={{ py: '5%', px: '3%', bgcolor: 'primary.main'}}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <img className="owl-prompt" src="https://media.giphy.com/media/0JWCkLbDhCQiajoqJo/giphy.gif" alt="owl"/>
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="round"
                        size="medium"
                        sx = {{mb: 2}}
                        onClick={() => {navigate("../");}} >
                        <ArrowBackIosNewOutlinedIcon/>
                    </Button>

                    <Autocomplete
                        options={Object.keys(locales)}
                        getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                        InputLabelProps={{
                            style: { fontSize: '1.5em', fontFamily: "'M PLUS Rounded 1c', sans-serif" }
                        }}
                        sx={{ 
                            width: '25%', 
                            mb: 2, 
                            bgcolor: 'secondary.main', 
                            color: 'primary.main', 
                            '& .MuiInputBase-input': {fontSize: '1em', fontFamily: "'M PLUS Rounded 1c', sans-serif"},
                            boxShadow: '0 9px 1px -2px rgba(0, 0, 0, 0.2)',
                            '& .MuiInputLabel-root': {fontSize: '1em', fontFamily: "'M PLUS Rounded 1c', sans-serif", borderColor: "secondary.main", color: "black"},
                            '& .MuiInputLabel-root.Mui-focused': {fontFamily: "'M PLUS Rounded 1c', sans-serif", borderColor: "secondary.main", borderRadius:1, color: "black"},
                            borderRadius : 1
                        }}
                        value={locale}
                        disableClearable
                        onChange={(event, newValue) => {
                            setLocale(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Language" fullWidth />
                        )}
                    />

                    </Box>  

                    <TextField
                        id="filled-multiline-flexible"
                        label="Write a story about ..."
                        InputLabelProps={{
                            style: { fontSize: '1.5em', fontFamily: "'M PLUS Rounded 1c', sans-serif" }
                        }}
                        multiline
                        variant="filled"
                        rows={15}
                        sx={{width: '100%', '& .MuiInputBase-input': {mt:'0.75em', fontSize: '1.5em', fontFamily: "'M PLUS Rounded 1c', sans-serif"}, bgcolor: 'secondary.main', color: 'primary.main'}}
                        onChange={(e) => setInputText(e.target.value)}
                    />

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end',  }}>
                        <Button
                            variant="round"
                            size="medium"
                            onClick={() => submitInput(inputText)} >
                            Create
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            </Box>
        </div>
    )
}
