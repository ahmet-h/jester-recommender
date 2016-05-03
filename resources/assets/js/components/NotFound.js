import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="not-found">
                        <div style={{marginBottom: '32px'}}>
                            <span>Page Not Found :(</span>
                        </div>
                        <Link to="/">Go to homepage</Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default NotFound;