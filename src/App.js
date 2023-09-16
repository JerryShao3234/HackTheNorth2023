import './App.css';
import {submitInput} from './generate'

function App() {
    return (
        <div className="App">
            Our APP
            <button onClick={() => submitInput("Please explain why Jeff Bezos is rich")}>generate answer</button>
        </div>
    );
}

export default App;
