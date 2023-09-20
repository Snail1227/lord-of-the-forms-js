import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { capitalize, formatPhoneNumber } from "../utils/transformations"
import { useState } from 'react';

export const FunctionalApp = () => {

  const [transformedFirstName, setTransformedFirstName] = useState('');
  const [transformedLastName, setTransformedLastName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  
  const firstNameInput = (firstName) => {
    setTransformedFirstName(capitalize(firstName));
  }

  const lastNameInput = (lastName) => {
    setTransformedLastName(capitalize(lastName));
  }

  const email = (e) => {
    setEmailInput(e);
  }

  const city = (c) => {
    setCityInput(c);
  }

  const phoneNumber = (phone) => {
    setPhoneInput(formatPhoneNumber(phone));
  }

  const userData = {
    firstName: transformedFirstName,
    lastName: transformedLastName,
    email: emailInput,
    city: cityInput,
    phone: phoneInput
  };

  return (
    <>
      <h2>Functional</h2>
      {<ProfileInformation 
        userData={userData} 
      />}
      <FunctionalForm  
        firstName={firstNameInput}
        lastName={lastNameInput}
        email={email}
        city={city}
        phoneNumber={phoneNumber}
      />
    </>
  );
};
