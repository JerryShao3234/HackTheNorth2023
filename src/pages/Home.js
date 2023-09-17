import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import koala from '../images/owl.png';

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
                        <Typography className='main_title' variant="title">DreamWeaver</Typography>

                        <Box sx={{ mt: "0%", bgcolor: 'primary.main', height:10}}>
                            <Typography className='desc' variant="rounded">A different adventure, everytime.</Typography>
                        </Box>

                        <Box className="button-box" sx={{ mt:'0px', pt:'0px', py: '8%', bgcolor: 'primary.main', height:10}}>
                            <Button
                                variant="contained"
                                sx={{
                                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                    fontWeight: 700,
                                    borderRadius: 4,
                                    boxShadow: '0 9px 1px -2px rgba(0, 0, 0, 0.2)',
                                    bgcolor: "secondary.main",
                                    px: 20,
                                    py: 2,
                                    fontSize: "1rem"
                                }}
                                size="medium"
                                onClick={() => handleRedirectLink("prompt")} >
                                Get Started
                            </Button>
                        </Box>
                    </Box>
                    <Box className="main-image" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img className='mascot' width={500} src={koala} alt="koala" />
                    </Box>
                </Box>
            </Box>



        </div>
    )
}
