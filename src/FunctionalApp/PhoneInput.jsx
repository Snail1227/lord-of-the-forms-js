import { Fragment } from "react";
import { ErrorMessage } from "../ErrorMessage";

export function PhoneInput( { 
    phoneInputState,
    isPhoneBad, 
    refs, 
    createChangeHandler,
    phoneNumberErrorMessage } ) {
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