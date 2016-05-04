import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

class App extends Component {
    
    render() {
        const { children } = this.props;

        return (
            <div className="wrapper">
                <header>
                    <div className="container">
                        <div className="title">
                            <span>Jester Joke Recommender</span>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <IndexLink to="/" activeClassName="active">Home</IndexLink>
                                </li>
                                <li>
                                    <Link to="jokes" activeClassName="active">Joke List</Link>
                                </li>
                                <li>
                                    <a href="#">Top 10 Recommendations</a>
                                </li>
                            </ul>
                            <div className="user-nav">
                                <span>ahmeth@anadolu.edu.tr</span>
                                <span><a href="#">Log Out</a></span>
                            </div>
                            <div className="clear"></div>
                        </nav>
                    </div>
                </header>
                <div className="main">
                    <div className="container">
                        {children}
                    </div>
                </div>
                <footer>
                    <div className="container">
                        <span>Jester Joke Recommender</span>
                    </div>
                </footer>
            </div>
        );
    }
    
}

export default App;
