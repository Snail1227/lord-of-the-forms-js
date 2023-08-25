import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./TextInput";
import { 
  firstNameValidation,
  lastNameValidation,
  isEmailValid
} from "../utils/validations";

import { useState } from 'react';

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput ]=useState('');
  const [emailInput ,setEmailInput]=useState('');

  const [isFistNameValid, setFirstNameValid] = useState(false);
  const [isLastNameValid, setLastNameValid] = useState(false);
  // const [isEmailValid, setIsEmailValid] = useState(false);
  const reset = () => {
    setFirstNameInput('');
    setLastNameInput('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFirstNameValid(firstNameValidation(firstNameInput));
    setLastNameValid(lastNameValidation(lastNameInput));

    if (isFistNameValid === true || isLastNameValid === true) {
      alert('bad data input');
    }

    if (isFistNameValid === false && isLastNameValid === false) {
      reset();
    }
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
          value: emailInput,
          placeholder:"bilbo-baggins@adventurehobbits.net",
        }}
        labelText={"Email"}
      />
      <ErrorMessage message={emailErrorMessage} show={true} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input placeholder="Hobbiton" />
      </div>
      <ErrorMessage message={cityErrorMessage} show={true} />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input type="text" id="phone-input-1" placeholder="55" />
          -
          <input type="text" id="phone-input-2" placeholder="55" />
          -
          <input type="text" id="phone-input-3" placeholder="55" />
          -
          <input type="text" id="phone-input-4" placeholder="5" />
        </div>
      </div>

      <ErrorMessage message={phoneNumberErrorMessage} show={true} />

      <input type="submit" value="Submit" />
    </form>
  );
};
