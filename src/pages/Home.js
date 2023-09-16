import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import owl from '../images/owl.png';

export default function Home() {
    const navigate = useNavigate();

    const handleRedirectLink = (page) => {
		navigate("./" + page);
	}

    return (
        <div>
            <Box className="demo-trial" sx={{ displap: '5%', bgcolor: 'primary.main'}}>
                <Box sx={{display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
                    <Box>
                        <Typography variant="poster">DreamWeavers</Typography>
                        
                        <Box sx={{ pt: '5%', pb: '10%', bgcolor: 'primary.main', height:10}}>
                            <p className='demo-description'>Create a story for your loved ones.</p>
                        </Box>

                        <Box sx={{ py: '8%', bgcolor: 'primary.main', height:10}}>
                            <Button 
                                variant="contained" 
                                sx={{borderRadius: 4,
                                    boxShadow: '0 9px 1px -2px rgba(0, 0, 0, 0.2)',
                                    bgcolor: "secondary.main",
                                    px: 20,
                                    py: 2,
                                    fontSize: "1rem"}}
                                size="medium"
                                onClick={() => handleRedirectLink("prompt")} >
                                Get Started
                            </Button>
                        </Box>
                    </Box>
                    <Box>
                        <img src={owl} alt="owl" />
                    </Box>
                </Box>
            </Box>

            

        </div>
    )
}