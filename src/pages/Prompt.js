import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from "react-router-dom";
import * as React from 'react';

export default function Prompt() {
    const navigate = useNavigate();

    const [inputText, setInputText] = React.useState("");

    const submitInput = async (input) => {
        if (input.length === 0) {
            alert("Please write something!");
        }

        localStorage.setItem("story", undefined);
        localStorage.setItem("imageUrls", undefined);

        navigate("/story", {state: {story: input}})
    }

    return (
        <div>
            <Box sx={{ py: '5%', px: '3%', bgcolor: 'primary.main'}}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <img className="owl-prompt" src="https://media.giphy.com/media/0JWCkLbDhCQiajoqJo/giphy.gif" alt="owl"/>
                </Grid>
                <Grid item xs={9}>
                    <Button
                        variant="round"
                        size="medium"
                        sx = {{mb: 2}}
                        onClick={() => {navigate("../");}} >
                        <ArrowBackIosNewOutlinedIcon/>
                    </Button>

                    

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
