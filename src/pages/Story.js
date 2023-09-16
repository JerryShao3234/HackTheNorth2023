import HTMLFlipBook from "react-pageflip";
import * as React from 'react';
import Box from '@mui/material/Box';

export default function Story() {

    return (
        <div>
        
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <HTMLFlipBook width={500} height={700}>
                    <div className="demoPage">Page 1</div>
                    <div className="demoPage">Page 2</div>
                    <div className="demoPage">Page 3</div>
                    <div className="demoPage">Page 4</div>
                </HTMLFlipBook>
            </Box>

        </div>
    )
}