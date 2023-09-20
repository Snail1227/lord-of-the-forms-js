import React from 'react';

export class TextInput extends React.Component {
    render() {
        const { labelText, inputProps } = this.props;

        return (
            <div>
                <div className="input-wrap"> 
                    <label>{labelText}:</label>
                    <input type="text" {...inputProps} /> 
                </div>
            </div>
        );
    }
}
