import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <header>
                    <div className="container">
                        <span>Header</span>
                    </div>
                </header>
                <div className="main">
                    <div className="container">
                        <span style={{color: 'green'}}>Hi There!</span>
                    </div>
                </div>
                <footer>
                    <div className="container">
                        <span>Footer</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
