import React from 'react';
import './App.css';
import ClientCodeEntry from "./components/ClientCodeEntry/ClientCodeEntry";

function App() {
    const submitHandler = (code) => {
        // TODO handle code submitHandler.
        console.log(code)
    };

    return (
        <div className="App">
            <header className="App-header">
                <ClientCodeEntry
                    submit={submitHandler}/>
            </header>
        </div>
    );
};

export default App;
