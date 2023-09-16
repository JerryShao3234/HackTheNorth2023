import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleRedirectLink = (page) => {
		navigate("./" + page);
	}

    return (
        <div>
            <Box sx={{ p: '5%', bgcolor: 'primary.main'}}>
                <Typography variant="poster">DreamWeavers</Typography>
                
                <Box sx={{ pt: '5%', pb: '10%', bgcolor: 'primary.main', height:10}}>
                    <p>Create a story for your loved ones.</p>
                </Box>

                <Box sx={{ py: '8%', bgcolor: 'primary.main', height:10}}>
                    <Button 
                        variant="contained" 
                        sx={{borderRadius: 20,
                            bgcolor: "secondary.main",
                            padding: "15px 30px",
                            fontSize: "1rem"}} 
                        size="medium"
                        onClick={() => handleRedirectLink("prompt")} >
                        Get Started
                    </Button>
                </Box>
            </Box>
        </div>
    )
}