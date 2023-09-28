import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./TextInput";
import { PhoneInput } from "./PhoneInput";
import { useState } from 'react';
import { capitalize, formatPhoneNumber } from "../utils/transformations"
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

export const FunctionalForm = ( { onSubmitData } ) => {

  const [submitCount, setSubmitCount] = useState(0);

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput ] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState ('');
  const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]); 

  const isFirstNameBad = submitCount >= 1 ? firstNameValidation(firstNameInput) : false;
  const isLastNameBad = submitCount >= 1 ? lastNameValidation(lastNameInput) : false;
  const isEmailBad = submitCount >= 1 ? emailValidation(emailInput) : false;
  const isCityBad = submitCount >= 1 ? cityValidation(cityInput) : false;
  const isPhoneBad = submitCount >= 1 ? phoneValidation(phoneInputState) : false;
  
  const handleCityChanges = (city) => {
    setCityInput(city);
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

    if (isDataValid) {

      onSubmitData({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phoneNumber: formatPhoneNumber(phoneInputState),
      })

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
            setFirstNameInput(capitalize(e.target.value)); 
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
            setLastNameInput(capitalize(e.target.value));
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
        phoneNumberErrorMessage={phoneNumberErrorMessage}
        onChangeInputState={(newPhoneInputState) => {
          setPhoneInputState(newPhoneInputState)
        }}
        isPhoneBad={isPhoneBad}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
