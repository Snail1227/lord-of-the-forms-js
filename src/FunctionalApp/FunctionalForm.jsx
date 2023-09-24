import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./TextInput";
import { PhoneInput } from "./PhoneInput";
import { useState, useRef, } from 'react';
import { 
  firstNameValidation, 
  lastNameValidation,
  emailValidation,
  cityValidation, 
  phoneValidation} from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ( { firstName, lastName, email, city, phoneNumber } ) => {

  const [submitCount, setSubmitCount] = useState(0);

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput ] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState ('');
  
  const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const isFirstNameBad = submitCount >= 1 ? firstNameValidation(firstNameInput) : false;
  const isLastNameBad = submitCount >= 1 ? lastNameValidation(lastNameInput) : false;
  const isEmailBad = submitCount >= 1 ? emailValidation(emailInput) : false;
  const isCityBad = submitCount >= 1 ? cityValidation(cityInput) : false;
  const isPhoneBad = submitCount >= 1 ? phoneValidation(phoneInputState) : false;
  

  const handleCityChanges = (city) => {
    setCityInput(city);
  };


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
    setPhoneInputState(newState);
};

  const reset = () => {
    setFirstNameInput('');
    setLastNameInput('');
    setEmailInput('');
    setCityInput('');
    setPhoneInputState(["", "", "", ""]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitCount((preCount) => preCount + 1);

    firstNameValidation(firstNameInput);
    lastNameValidation(lastNameInput);
    emailValidation(emailInput);
    cityValidation(cityInput);
    phoneValidation(phoneInputState);

    const isDataValid = (
      (!firstNameValidation(firstNameInput) &&
      !lastNameValidation(lastNameInput) && 
      !emailValidation(emailInput) && 
      !cityValidation(cityInput) && 
      !phoneValidation(phoneInputState)
      )
    )

    console.log(isDataValid)

    if (isDataValid) {
      firstName(firstNameInput);
      lastName(lastNameInput);
      email(emailInput);
      city(cityInput);
      phoneNumber(phoneInputState);

      setSubmitCount((preCount) => preCount === 0);
      reset();  
    }
    
  };

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
      <ErrorMessage message={firstNameErrorMessage}  show={isFirstNameBad} />
        
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
      <ErrorMessage message={lastNameErrorMessage} show={isLastNameBad} />

      {/* Email Input */}
      <TextInput
        inputProps={{
          onChange : (e)=> {
            setEmailInput(e.target.value);
          },
          name: "Email",
          value: emailInput,
          placeholder:"bilbo-baggins@adventurehobbits.net",
        }}
        labelText={"Email"}
      />
      <ErrorMessage message={emailErrorMessage} show={isEmailBad} />

      {/* City Input */}
      <TextInput
      inputProps = {{
        onChange: (e) => {
          handleCityChanges(e.target.value);
          setCityInput(e.target.value);
        },
        name: "City",
        value: cityInput,
        placeholder: 'Hobbiton',
        list: "cities",
      }}
      labelText={"City"}
      />
      <ErrorMessage message={cityErrorMessage} show={isCityBad} />

      {/* Phone Input */}
      
      <PhoneInput
        phoneInputState={phoneInputState}
        setPhoneInputState={setPhoneInputState}
        refs={refs}
        createChangeHandler={createChangeHandler}
        phoneNumberErrorMessage={phoneNumberErrorMessage}
        isPhoneBad={isPhoneBad}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
