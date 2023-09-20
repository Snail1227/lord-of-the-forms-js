import { Component } from 'react';

export class PhoneInput extends Component {
    render() {
        const { inputProps } = this.props;

        return (
            <input 
                type="text"
                {...inputProps}
            />
        );
    }
}

