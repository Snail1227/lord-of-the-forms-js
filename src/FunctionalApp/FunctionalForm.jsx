import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./TextInput";
import { allCities } from "../utils/all-cities";
// import { 
//   firstNameValidation,
//   lastNameValidation,
//   isEmailValid
// } from "../utils/validations";

import { useState } from 'react';


const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ( { handleData } ) => {

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput ] = useState('');
  const [emailInput ,setEmailInput] = useState('');
  const [cityInput ,setCityInput] = useState ('');

  const [isFistNameValid, setFirstNameValid] = useState(false);
  const [isLastNameValid, setLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCityValid, setCityValid] = useState(false);

  const reset = () => {
    setFirstNameInput('');
    setLastNameInput('');
    setEmailInput('');
  }

  // const badRequest = () => {  
  //   if (isFistNameValid || isLastNameValid) {
  //     alert('bad data input');
  //   }
  // }


  // const firstNameValidation = (firstName) => {
  //   if (firstName.length < 1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // const lastNameValidation = (lastName) => {
  //   if (lastName.length < 1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const handleData = Object.fromEntries(data.entries())
    console.log(handleData);
    // const isFirstNameInvalid = firstNameValidation(firstNameInput);
    // const isLastNameInvalid = lastNameValidation(lastNameInput);
    
    // setFirstNameValid(isFirstNameInvalid);
    // setLastNameValid(isLastNameInvalid);

    
    // badRequest();
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
