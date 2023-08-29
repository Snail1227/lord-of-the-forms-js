import { useState, useRef } from "react"

export function PhoneInput() {
    const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);

    const refs = [useRef(), useRef(), useRef(), useRef()];

    const ref0 = refs[0];
    const ref1 = refs[1];
    const ref2 = refs[2];
    const ref3 = refs[3];

    const createChangeHandler = (index) => (e) => {
        const length = [2, 2, 2, 2];
        const currentMaxLength = length[index];
        const nextRef = refs[index + 1];
        const prevRef = refs[index - 1];
        const value = e.target.value;

        const shouldGoToNextRef = 
            currentMaxLength === value.length && nextRef.current;  

        const shouldGoToPrevRef = value.length === 0;

        const newState = phoneInputState.map((phoneInput, phoneInputIndex) => 
            index === phoneInputIndex ? e.target.value : phoneInput
        );

        if (shouldGoToNextRef) {
            nextRef.current.focus();
        }

        if (shouldGoToPrevRef) {
            prevRef.current.focus();
        }

        setPhoneInputState(newState);
    }

    return (
        <div>
            <div className="input-wrap" >
                <label htmlFor="phone">Phone:</label>
                <div id="phone-input-wrap">

                    <input 
                        type="text" 
                        id="phone-input-1" 
                        placeholder="55" 
                        ref={ref0} 
                        value={phoneInputState[0]}
                        onChange={createChangeHandler(0)}
                    />
                    -
                    <input 
                        type="text" 
                        id="phone-input-2"
                        placeholder="55" 
                        ref={ref1}
                        value={phoneInputState[1]}
                        onChange={createChangeHandler(1)}
                        
                    />
                    -
                    <input 
                        type="text" 
                        id="phone-input-3" 
                        placeholder="55" 
                        ref={ref2}
                        value={phoneInputState[2]}
                        onChange={createChangeHandler(2)}
                    />
                    -
                    <input 
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