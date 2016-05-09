import React, { Component, PropTypes } from 'react';

class RatePicker extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        rated: PropTypes.bool.isRequired,
        picker: PropTypes.object.isRequired
    };

    render() {
        const { onChange, picker, rated } = this.props;

        return (
            <div className="joke-rate">
                <div style={{marginBottom: '12px'}}>
                    <span>Your Rating: {(!rated && !picker.moved) ? '-' : picker.value}</span>
                    <span style={{color: '#2c2', float: 'right'}}>Saved!</span>
                </div>
                <input type="range" min="-10" max="10" step="0.1" defaultValue={picker.value}
                       onMouseUp={e => {console.log('Hi there!')}}
                       onChange={e => onChange(e.target.value)} />
            </div>
        );
    }

}

export default RatePicker;