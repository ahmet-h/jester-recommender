import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class JokeList extends Component {

    static propTypes = {
        jokes: PropTypes.array.isRequired
    };

    render() {
        const { jokes } = this.props;
        
        return (
            <div className="joke-list">
                <ul>
                    {jokes.map((joke, i) =>
                        <li key={i}>
                            <Link to={`/joke/${joke.id}`}>
                                <span>Joke #{joke.no}</span>
                                <span className="joke-summary">{joke.content}</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

}

export default JokeList;