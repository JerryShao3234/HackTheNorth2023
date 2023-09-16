import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import {submitInput} from '../generate';
import { useNavigate } from "react-router-dom";

export default function Prompt() {
    const navigate = useNavigate();

    const submitInput = (input) => {
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                {/* <Box sx={{ py: '3%', bgcolor: 'primary.main', height:10}}> */}
                    <Button 
                        variant="contained" 
                        sx={{borderRadius: 20,
                            bgcolor: "secondary.main",
                            padding: "15px",
                            fontSize: "1rem"}} 
                        size="medium"
                        onClick={() => {navigate("../");}} >
                        <ArrowBackIosNewOutlinedIcon/>
                    </Button>
                {/* </Box> */}

                {/* <Box sx={{ py: '3%', bgcolor: 'primary.main', height:10}}> */}
                    <Button 
                        variant="contained" 
                        sx={{borderRadius: 20,
                            bgcolor: "secondary.main",
                            padding: "15px 30px",
                            fontSize: "1rem"}} 
                        size="medium"
                        onClick={() => submitInput("Please explain why Jeff Bezos is rich")} >
                        Create
                    </Button>
                {/* </Box> */}

            </Box>
            

            <Box sx={{ py: '5%', px: '3%', bgcolor: 'primary.main'}}>
                <TextField
                    id="filled-multiline-flexible"
                    label="Write a story about ..."
                    multiline
                    variant="filled"
                    rows={20}
                    sx={{width: '100%', bgcolor: 'secondary.main', color: 'primary.main'}}
                />
            </Box>
            

            
        </div>
    )
}