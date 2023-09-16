import HTMLFlipBook from "react-pageflip";
import * as React from 'react';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import {useLocation} from "react-router-dom";
import ReactLoading from 'react-loading';
import "../App.css"
import {getGeneratedImages} from "../generate";
import DownloadIcon from '@mui/icons-material/Download';
import styled from "@emotion/styled";

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="cover" ref={ref} data-density="hard">
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

    React.useEffect(async () => {
        async function getData() {
            try {
                const urls = await getGeneratedImages(story);
                setImageUrls(urls);
            } catch (err) {
                console.log(err)
            }
        }

        getData();
    }, []);

    if (imageUrls.length === 0) {
        return (
            <div className="loading">
                <ReactLoading type={"spin"} color={"#5d5d5d"} height={"20%"} width={"20%"} />
            </div>
        );
    } else {
        let sentences = story.split(".");
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

        const downloadStory = () => {
            const element = document.createElement("a");
            const file = new Blob([story], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "story.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }

        return (
            <div bgcolor="LightCyan">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: '2%' }}>
                    <Fab variant="extended">
                    <DownloadIcon sx={{ mr: 1 }} />
                    Download Story
                    </Fab>
                </Box>

                <HTMLFlipBook
                    width={550}
                    height={733}
                    size="stretch"
                    minWidth={315}
                    maxWidth={1000}
                    minHeight={400}
                    maxHeight={1533}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    flippingTime={1000}
                    // style={{ margin: "0 auto" }}
                    // className="album-web"
                >
                    <PageCover>My Story</PageCover>
                    {pages.map((page, index) => {
                        return (
                            <Page number={index + 1} key={index}>
                                <div>
                                <Box
                                    component="img"
                                    sx={{
                                        // height: auto,
                                        width: '100%',
                                        // maxHeight: { xs: 233, md: 167 },
                                        // maxWidth: { xs: 350, md: 250 },
                                    }}
                                    alt={"page " + (index + 1)}
                                    src={page.imageUrl}
                                    />
                                    {/* <img src={page.imageUrl} alt={"page " + (index + 1)} style={{"height:auto;width:100%;"}}/> */}
                                </div>
                                <div>{page.paragraph}</div>
                            </Page>
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
