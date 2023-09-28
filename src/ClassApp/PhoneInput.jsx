import React, { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";

export class PhoneInput extends Component {
    constructor(props) {
        super(props);

        this._inputRefs = [createRef(), createRef(), createRef(), createRef()];
    }

    createChangeHandler = (index) => (e) => {

        const lengths = [2, 2, 2, 1];
        const currentMaxLength = lengths[index];
        const nextRef = this._inputRefs[index + 1];
        const prevRef = this._inputRefs[index - 1];

        const value = e.target.value.replace(/[^0-9]/g, '');

        const shouldGoToNextRef = currentMaxLength === value.length && nextRef !== undefined;
        const shouldGoToPrevRef = value.length === 0 && prevRef !== undefined;

        if (shouldGoToNextRef && nextRef.current) {
            nextRef.current.focus();
        }
        if (shouldGoToPrevRef && prevRef.current) {
            prevRef.current.focus();
        }

        const newState = this.props.phoneInputState.map((phoneInput, phoneInputIndex) =>
            index === phoneInputIndex ? value.slice(0, currentMaxLength) : phoneInput
        );
        this.props.onChangeInputState(newState);
    };

    render() {
        return (
            <>
                <div className="input-wrap">
                    <label htmlFor="phone">Phone:</label>
                    <div id="phone-input-wrap">
                        {this.props.phoneInputState.map((inputValue, i) => (
                            <React.Fragment key={i}>
                                <input 
                                    onChange={this.createChangeHandler(i)}
                                    name={`Phone-${i}`}
                                    id={`phone-input-${i}`}
                                    placeholder={i < 3 ? "55" : "5"}
                                    ref={this._inputRefs[i]}
                                    value={inputValue}
                                    maxLength={i < 3 ? 2 : 1}
                                />
                                {i < this.props.phoneInputState.length - 1 && <span>-</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <ErrorMessage message={this.props.phoneNumberErrorMessage} show={this.props.isPhoneBad} />
            </>
        );
    }
}
