import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./TextInput";
import { allCities } from "../utils/all-cities";
import { PhoneInput } from "./PhoneInput";

import { useState, useRef } from 'react';


const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ( { handleData } ) => {

  // const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);
  // const refs = [useRef(), useRef(), useRef(), useRef()];

  // const ref0 = refs[0];
  // const ref1 = refs[1];
  // const ref2 = refs[2];
  // const ref3 = refs[3];

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput ] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState ('');
  const [phoneInput, setPhoneInput] = useState('');

  const [isFistNameValid, setFirstNameValid] = useState(false);
  const [isLastNameValid, setLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCityValid, setCityValid] = useState(false);


  // const createChangeHandler = (index) => (e) => {
  //   const length = [2, 2, 2, 1];
  //   const currentMaxLength = length[index];
  //   const nextRef = refs[index + 1];
  //   const prevRef = refs[index - 1];
  //   const value = e.target.value;

  //   const shouldGoToNextRef = currentMaxLength === value.length && nextRef !== undefined;
  //   const shouldGoToPrevRef = value.length === 0 && prevRef !== undefined;

  //   if (shouldGoToNextRef && nextRef.current) {
  //       nextRef.current.focus();
  //   }

  //   if (shouldGoToPrevRef && prevRef.current) {
  //       prevRef.current.focus();
  //   }

  //   const newState = phoneInputState.map((phoneInput, phoneInputIndex) => 
  //       index === phoneInputIndex ? e.target.value.slice(0, currentMaxLength) : phoneInput
  //   );

  //   setPhoneInputState(newState); 
  // }

  const reset = () => {
    setFirstNameInput('');
    setLastNameInput('');
    setEmailInput('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const handleData = Object.fromEntries(data.entries())
    console.log(handleData);
    console.log();
   
    reset();  
  }

  return (
    <form 
      onSubmit={handleSubmit}
      >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}

      <TextInput
        inputProps={{
          onChange:(e) => {
            setFirstNameInput(e.target.value);
          },
          name: "First name",
          value: firstNameInput,
          placeholder: "Bilbo",
        }}
        labelText={"First Name"}
      />
      <ErrorMessage message={firstNameErrorMessage}  show={isFistNameValid} />
        
      {/* last name input */}

      <TextInput
        inputProps={{
          onChange:(e) => {
            setLastNameInput(e.target.value);
          },
          name: "Last name",
          value: lastNameInput,
          placeholder:"Baggins",
        }}
        labelText={"Last Name"}
      />
      <ErrorMessage message={lastNameErrorMessage} show={isLastNameValid} />

      {/* Email Input */}

      <TextInput
        inputProps={{
          onChange : (e)=> {
            setEmailInput(e.target.value);
          },
          name:"Email",
          value: emailInput,
          placeholder:"bilbo-baggins@adventurehobbits.net",
        }}
        labelText={"Email"}
      />
      <ErrorMessage message={emailErrorMessage} show={isEmailValid} />

      {/* City Input */}

      <TextInput
      inputProps = {{
        onChange: (e) => {
          setCityInput(e.target.value);
        },
        name:"City",
        value: cityInput,
        placeholder:'Hobbiton',
      }}
      labelText={"City"}
      />
      <datalist id="cities">
                {allCities.map((city, index) => (
                    <option key={index} value={city} />
                ))}
            </datalist>
      <ErrorMessage message={cityErrorMessage} show={isCityValid} />

      {/* Phone Input */}
      <PhoneInput
        inputProps={{
          onChange: (e) => {
            setPhoneInput(e.target.value);
          },
          name:"Phone"
        }}
        labelText={"Phone"}
      />
      <ErrorMessage message={phoneNumberErrorMessage} />

      <input type="submit" value="Submit" />
    </form>
  );
};
