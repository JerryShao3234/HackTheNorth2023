import HTMLFlipBook from "react-pageflip";
import * as React from 'react';
import Box from '@mui/material/Box';
import {useLocation} from "react-router-dom";
import ReactLoading from 'react-loading';
import "../App.css"
import {getGeneratedImages} from "../generate";

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

    React.useEffect(() => {
        getGeneratedImages(story).then((urls) => {
            setImageUrls(urls);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    if (imageUrls.length === 0) {
        return (
            <div className="loading">
                <ReactLoading type={"balls"} color={"#5d5d5d"} height={"20%"} width={"20%"} />
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



        return (
            <div bgcolor="LightCyan">
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
                                <img src={page.imageUrl} alt={"page " + (index + 1)}/>
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
