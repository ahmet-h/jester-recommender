import React, { Component } from 'react';
import { Link } from 'react-router';

class HomePage extends Component {

    render() {
        return (
            <div className="content">
                <h2>Home Page</h2>

                <article>
                    <ul>
                        <li>
                            <Link to="/jokes">List of all jokes</Link>
                        </li>
                        <li>
                            <Link to="/top-n">Top 10 joke recommendations</Link>
                        </li>
                    </ul>
                </article>
            </div>
        );
    }

}

export default HomePage;