import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./TextInput";
import { allCities } from "../utils/all-cities";
import { PhoneInput } from "./PhoneInput";
import { useState, useRef, Fragment } from 'react';
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

  const [filteredCities, setFilteredCities] = useState([]);
  
  const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const [isFirstNameValid, setFirstNameValid] = useState(false);
  const [isLastNameValid, setLastNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isCityValid, setCityValid] = useState(false);
  const [isPhoneValid, setPhoneValid] = useState(false);


  const currentFirstNameValidation = (firstName) => {
    if (submitCount >= 1) {
      setFirstNameValid(firstNameValidation(firstName));
    }
  };

  const currentLastNameValidation = (lastName) => {
    if (submitCount >= 1) {
      setLastNameValid(lastNameValidation(lastName));
    }
  };

  const currentEmailValidation = (email) => {
    if (submitCount >= 1) {
      setEmailValid(emailValidation(email));
    }
  }

  const currentCityValidation = (city) => {
    if (submitCount >= 1) {
      setCityValid(cityValidation(city));
    }
  } 

  const currentPhoneValidation = (phone) => {
    if (submitCount >= 1) {
      setPhoneValid(phoneValidation(phone));
    }
  }

  const handleCityChanges = (city) => {
    if (city != "" ) {
      const matchedCities = allCities.filter(c => c.toLowerCase().startsWith(city.toLowerCase()));
      setFilteredCities(matchedCities);
    }
    setCityInput(city);
  };


  const handleFocus = () => {
    setFilteredCities(allCities);
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

    setFirstNameValid(firstNameValidation(firstNameInput));
    setLastNameValid(lastNameValidation(lastNameInput));
    setEmailValid(emailValidation(emailInput));
    setCityValid(cityValidation(cityInput));
    setPhoneValid(phoneValidation(phoneInputState));

    const isValidData = (
      !(isFirstNameValid && isLastNameValid && isCityValid && 
      isEmailValid && isPhoneValid) &&
      Boolean(firstNameInput && lastNameInput && 
        emailInput && cityInput && phoneInputState.join('')));
    
    if (isValidData) {
      firstName(firstNameInput);
      lastName(lastNameInput);
      email(emailInput);
      city(cityInput);
      phoneNumber(phoneInputState);

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
            currentFirstNameValidation(e.target.value);
            setFirstNameInput(e.target.value); 
          },
          name: "First name",
          value: firstNameInput,
          placeholder: "Bilbo",
        }}
        labelText={"First Name"}
      />
      <ErrorMessage message={firstNameErrorMessage}  show={isFirstNameValid} />
        
      {/* last name input */}
      <TextInput
        inputProps={{
          onChange:(e) => {
            currentLastNameValidation(e.target.value);
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
            currentEmailValidation(e.target.value);
            setEmailInput(e.target.value);
          },
          name: "Email",
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
          currentCityValidation(e.target.value);
          handleCityChanges(e.target.value);
          setCityInput(e.target.value);
        },
        name: "City",
        onFocus: handleFocus,
        value: cityInput,
        placeholder: 'Hobbiton',
        list: "cities",
      }}
      labelText={"City"}
      />
      <datalist id="cities">
        {filteredCities.map((city) => (
            <option key={city} value={city} />
        ))}
      </datalist>
      <ErrorMessage message={cityErrorMessage} show={isCityValid} />

      {/* Phone Input */}
      <div className="input-wrap" >
        <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            {phoneInputState.map((inputValue, i) => (
              <Fragment key={i}>
                <PhoneInput
                  inputProps={{
                    onChange: (e) => {
                      createChangeHandler(i)(e);
                      currentPhoneValidation(e.target.value);
                    },
                    name: 'Phone-' + i,
                    id:"phone-input-" + i,
                    placeholder: i < 3 ? "55" : "5", 
                    ref: refs[i], 
                    value: inputValue,
                    maxLength: i < 3 ? 2 : 1
                  }}
                />
                {i < phoneInputState.length - 1 && <span>-</span>}
              </Fragment>
              ))}   
          </div>
      </div>
      <ErrorMessage message={phoneNumberErrorMessage} show={isPhoneValid} />

      <input type="submit" value="Submit" />
    </form>
  );
};
