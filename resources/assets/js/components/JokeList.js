import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class JokeList extends Component {

    static propTypes = {
        jokes: PropTypes.array.isRequired,
        showRatings: PropTypes.bool
    };

    static defaultProps = {
        showRatings: true
    };

    render() {
        const { jokes, showRatings } = this.props;

        const style = (showRatings) ? {} : {width: '690px'};
        
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
                            {showRatings &&
                            <th>
                                Your Rating
                            </th>
                            }
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
                                    <span className="joke-summary" style={style}>{joke.content}</span>
                                </Link>
                            </td>
                            {showRatings &&
                            <td style={{textAlign: 'center'}}>
                                <span>{joke.rating ? joke.rating : '-'}</span>
                            </td>
                            }
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default JokeList;