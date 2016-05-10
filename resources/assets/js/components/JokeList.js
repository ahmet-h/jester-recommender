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
                <table>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Joke Text
                            </th>
                            <th>
                                Your Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {jokes.map((joke, i) =>
                        <tr key={i}>
                            <td>
                                <Link to={`/joke/${joke.id}`}>
                                    <span>{joke.no}</span>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/joke/${joke.id}`}>
                                    <span className="joke-summary">{joke.content}</span>
                                </Link>
                            </td>
                            <td style={{textAlign: 'center'}}>
                                <span>{joke.rating ? joke.rating : '-'}</span>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default JokeList;