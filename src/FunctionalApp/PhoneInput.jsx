import { useState, useRef } from "react"

export function PhoneInput( { labelText, inputProps } ) {
    const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);
    const refs = [useRef(), useRef(), useRef(), useRef()];

    const ref0 = refs[0];
    const ref1 = refs[1];
    const ref2 = refs[2];
    const ref3 = refs[3];

    const createChangeHandler = (index) => (e) => {
        const length = [2, 2, 2, 1];
        const currentMaxLength = length[index];
        const nextRef = refs[index + 1];
        const prevRef = refs[index - 1];
        const value = e.target.value;

        const shouldGoToNextRef = currentMaxLength === value.length && nextRef !== undefined;
        const shouldGoToPrevRef = value.length === 0 && prevRef !== undefined;

        if (shouldGoToNextRef && nextRef.current) {
            nextRef.current.focus();
        }

        if (shouldGoToPrevRef && prevRef.current) {
            prevRef.current.focus();
        }

        const newState = phoneInputState.map((phoneInput, phoneInputIndex) => 
            index === phoneInputIndex ? e.target.value.slice(0, currentMaxLength) : phoneInput
        );

        setPhoneInputState(newState); 
    }

    
    return (
        <div>
            <div className="input-wrap" >
                <label htmlFor="phone">{labelText}:</label>
                <div id="phone-input-wrap">

                    <input 
                        name={`${inputProps.name}-1`}
                        type="text" 
                        id="phone-input-1" 
                        placeholder="55" 
                        ref={ref0} 
                        value={phoneInputState[0]}
                        onChange={createChangeHandler(0)}
                    />
                    -
                    <input 
                        name={`${inputProps.name}-2`}
                        type="text" 
                        id="phone-input-2"
                        placeholder="55" 
                        ref={ref1}
                        value={phoneInputState[1]}
                        onChange={createChangeHandler(1)}
                        
                    />
                    -
                    <input 
                        name={`${inputProps.name}-3`}
                        type="text" 
                        id="phone-input-3" 
                        placeholder="55" 
                        ref={ref2}
                        value={phoneInputState[2]}
                        onChange={createChangeHandler(2)}
                    />
                    -
                    <input 
                        name={`${inputProps.name}-4`}
                        type="text" 
                        id="phone-input-4" 
                        placeholder="5" 
                        ref={ref3}
                        value={phoneInputState[3]}
                        onChange={createChangeHandler(3)}
                    />

                </div>
            </div>
        </div>
    )
}