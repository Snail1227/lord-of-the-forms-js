import { Fragment } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { useRef } from "react";

export function PhoneInput( { 
    phoneInputState,
    onChangeInputState,
    isPhoneBad,
    phoneNumberErrorMessage } ) {

      const refs = [useRef(), useRef(), useRef(), useRef()];

      const createChangeHandler = (index) => (e) => {
        const length = [2, 2, 2, 1];
        const currentMaxLength = length[index];
        const nextRef = refs[index + 1];
        const prevRef = refs[index - 1];
        
        const value = e.target.value.replace(/[^0-9]/g, '');
    
        const shouldGoToNextRef = currentMaxLength === value.length && nextRef !== undefined;
        const shouldGoToPrevRef = value.length === 0 && prevRef !== undefined;
    
        if (shouldGoToNextRef && nextRef.current) {
            nextRef.current.focus();
        }
        if (shouldGoToPrevRef && prevRef.current) {
            prevRef.current.focus();
        }
    
        const newState = phoneInputState.map((phoneInput, phoneInputIndex) => 
            index === phoneInputIndex ? value.slice(0, currentMaxLength) : phoneInput
        );
        onChangeInputState(newState);
    };


    return (
        <>
        <div className="input-wrap" >
        <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            {phoneInputState.map((inputValue, i) => (
              <Fragment key={i}>
                <input 
                    onChange={(e) => createChangeHandler(i)(e)}
                    name={`Phone-${i}`}
                    id={`phone-input-${i}`}
                    placeholder={i < 3 ? "55" : "5"}
                    ref={refs[i]}
                    value={inputValue}
                    maxLength={i < 3 ? 2 : 1}
                />
                {i < phoneInputState.length - 1 && <span>-</span>}
              </Fragment>
              ))}   
          </div>
      </div>
      <ErrorMessage message={phoneNumberErrorMessage} show={isPhoneBad} />
      </>
    )
}