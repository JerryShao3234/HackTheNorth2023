import HTMLFlipBook from "react-pageflip";
import * as React from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import {useLocation} from "react-router-dom";
import "../App.css"
import {getGeneratedImages, getStory} from "../generate";
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

import { FallingLines } from  'react-loader-spinner'

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="cover" id="cover" ref={ref} data-density="hard">
            <div>
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            {props.children}
        </div>
    );
});

export default function Story() {
    const {state} = useLocation();
    const {story} = state

    const [imageUrls, setImageUrls] = React.useState([]);
    const [realStory, setRealStory] = React.useState("");
    const [pdf, setPdf] = React.useState(null);

    React.useEffect(() => {
        // Define an async function within the useEffect
        async function getData() {
            try {
                const upscaledStory = await getStory(story);
                setRealStory(upscaledStory);
                const urls = await getGeneratedImages(upscaledStory);
                setImageUrls(urls);
            } catch (err) {
                console.log(err)
            }
        }    
        getData();
    }, []);
    

    if (imageUrls.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FallingLines
                    color="#F3FDE8"
                    width="200"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                />
            </Box>
        );
    } else {
        let sentences = realStory.split(".");
        sentences.pop();
        sentences = sentences.map((sentence) => {
            return sentence.trim() + ". "
        });

        const arrayCounts = getSentencesPerSceneArray(sentences.length, imageUrls.length);
        console.log(arrayCounts);

        let sentenceIndex = 0;
        let pages = []
        for (let i = 0; i < arrayCounts.length; i++) {
            const pageObject = {
                paragraph: "",
                imageUrl: ""
            }

            for (let j = 0; j < arrayCounts[i]; j++) {
                pageObject.paragraph += sentences[sentenceIndex];
                sentenceIndex += 1;
            }

            pageObject.imageUrl = imageUrls[i];
            pages.push(pageObject);
        }

        const downloadStory = async () => {
            const pdfDoc = new jsPDF();
            console.log("downloading");
        
            for (let index = 0; index < imageUrls.length; index++) {
                const imageUrl = imageUrls[index];
        
                const img = new Image();
                img.src = imageUrl;
        
                // Wait for the image to load
                await new Promise((resolve) => {
                    img.onload = resolve;
                });
        
                //save the image into a pdf file
            
                pdfDoc.addImage(img, 'JPEG', 10, 10, 90, 0);
                
                if(index < imageUrls.length - 1) {
                    pdfDoc.addPage();
                }
    
            }
        
            // Add a page with text
            pdfDoc.addPage();
            pdfDoc.text(10, 10, realStory, {maxWidth: 180});
        
            // Save the PDF using FileSaver.js
            const pdfBlob = pdfDoc.output('blob');
            saveAs(pdfBlob, 'story.pdf');
        };

        return (
            <div bgcolor="LightCyan">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: '2%' }}>
                    <Fab variant="extended" onClick={downloadStory}>
                    <DownloadIcon sx={{ mr: 1 }}/>
                    Download Story
                    </Fab>
                </Box>

                <HTMLFlipBook
                    width={550}
                    height={700}
                    size="stretch"
                    minWidth={315}
                    maxWidth={1000}
                    minHeight={400}
                    // maxHeight={1533}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    flippingTime={1000}
                >
                    <PageCover>My Story</PageCover>
                    {pages.map((page, index) => {
                        return (
                            <Box sx={{boxShadow: 3}}>
                                <Page number={index + 1} key={index}>
                                    <Box sx={{ p: '2%' }}>
                                        <div>
                                        <Box
                                            component="img"
                                            sx={{
                                                width: '100%'
                                            }}
                                            alt={"page " + (index + 1)}
                                            src={page.imageUrl}
                                            />
                                        </div>
                                        <div className="page-paragraph">{page.paragraph}</div>
                                        <div className="page-footer">
                                            {index + 1}
                                        </div>
                                    </Box>
                                </Page>
                            </Box>
                        )
                    })}
                    <PageCover>The End</PageCover>
                </HTMLFlipBook>
            </div>
        );
    }
}

const getSentencesPerSceneArray = (sentenceCount, sceneCount) => {
    const minSentencesPerScene = Math.floor(sentenceCount / sceneCount);

    const result = []
    for (let i = 0; i < sceneCount; i++) {
        result.push(minSentencesPerScene);
    }

    let remainingSentences = sentenceCount % sceneCount;
    // add remaining sentence counts to middle of array
    if (remainingSentences === 0) {
        return result;
    }

    let midIndexUpper = Math.floor(sceneCount / 2);
    let midIndexLower = Math.floor(sceneCount / 2) - 1;

    if (sceneCount % 2 === 1) {
        result[midIndexUpper] += 1;
        remainingSentences -= 1;
        midIndexUpper += 1
    }

    while (remainingSentences !== 0) {
        result[midIndexLower] += 1;
        remainingSentences -= 1;
        midIndexLower -= 1;

        if (remainingSentences === 0) {
            break;
        }

        result[midIndexUpper] += 1;
        remainingSentences -= 1;
        midIndexUpper += 1;
    }

    return result
}
