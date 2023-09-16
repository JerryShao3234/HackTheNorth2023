import './App.css';
import {getStory, getGeneratedImages} from './generate'
import {useState} from "react";

function App() {
    const [text, setText] = useState("")
    const [imageURLs, setImageURLs] = useState([])

    const processInput = () => {
        getStory("Write a children's story about a cowboy and his horse in eight or less sentences with simple vocabulary").then((response) => {
            setText(response);
            return getGeneratedImages(response);
        }).then((imageURLs) => {
            console.log(imageURLs)
            setImageURLs(imageURLs)
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="App">
            Our APP
            <button onClick={processInput}>generate answer</button>
            <div>
                {text}
            </div>
            <div>
                {imageURLs.map((imageURL, index) => {
                    return (
                        <div key={index}>
                            <img src={imageURL} alt={"page " + index}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default App;
