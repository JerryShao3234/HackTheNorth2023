import HTMLFlipBook from "react-pageflip";
import * as React from 'react';
import Box from '@mui/material/Box';
import {useLocation} from "react-router-dom";
import ReactLoading from 'react-loading';
import "../App.css"

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
    const sentences = story.split(".");

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
                {sentences.map((sentence, index) => {
                    return (
                        <Page number={index + 1} key={index}>
                            <div>{sentence}</div>
                        </Page>
                    )
                })}
                <PageCover>The End</PageCover>
            </HTMLFlipBook>
        </div>
    );
}
