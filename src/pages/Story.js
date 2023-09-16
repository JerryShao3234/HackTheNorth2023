import HTMLFlipBook from "react-pageflip";
import * as React from 'react';
import Box from '@mui/material/Box';
import {useLocation} from "react-router-dom";
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
            <div className="page-content">
                <h2 className="page-header">Page header - {props.number}</h2>
                <div className="page-image"></div>
                <div className="page-text">{props.children}</div>
                <div className="page-footer">{props.number + 1}</div>
            </div>
        </div>
    );
});

export default function Story() {
    const [inputText, setInputElement] = React.useState("");
    const [text, setText] = React.useState("ここに表示されます。");
    const printText = () => {
        setText(inputText);
        setInputElement("");
    };

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
                <PageCover>try</PageCover>
                <Page number="1">
                    <div>TEST 1</div>
                </Page>
                <Page number="2">
                    <div>TEST 1</div>
                </Page>
                <Page number="3">
                    <div>TEST 1</div>
                </Page>
                <Page number="4">
                    <div>TEST 1</div>
                </Page>
                {/*<PageCover></PageCover>*/}
                {/*<PageCover>see you</PageCover>*/}
            </HTMLFlipBook>
        </div>
    );
}
