import React, { Component, Fragment } from 'react';
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./TextInput";
import { allCities }  from "../utils/all-cities";
import { PhoneInput } from "./PhoneInput";
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

export default class FunctionalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitCount: 0,
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      cityInput: '',
      filteredCities: [],
      phoneInputState: ["", "", "", ""],
      isFirstNameValid: false,
      isLastNameValid: false,
      isEmailValid: false,
      isCityValid: false,
      isPhoneValid: false
    };

    
    this.phoneRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];
  }

  currentFirstNameValidation = (firstName) => {
    if (this.state.submitCount >= 1) {
      this.setState({ isFirstNameValid: firstNameValidation(firstName) });
    }
  };

  currentLastNameValidation = (lastName) => {
    if (this.state.submitCount >= 1) {
      this.setState({ isLastNameValid: lastNameValidation(lastName) });
    }
  };

  currentEmailValidation = (email) => {
    if (this.state.submitCount >= 1) {
      this.setState({ isEmailValid: emailValidation(email) });
    }
  };

  currentCityValidation = (city) => {
    if (this.state.submitCount >= 1) {
      this.setState({ isCityValid: cityValidation(city) });
    }
  };

  currentPhoneValidation = (phone) => {
    if (this.state.submitCount >= 1) {
      this.setState({ isPhoneValid: phoneValidation(phone) });
    }
  };

  handleCityChanges = (city) => {
    if (city !== "") {
      const matchedCities = allCities.filter(c => c.toLowerCase().startsWith(city.toLowerCase()));
      this.setState({ filteredCities: matchedCities });
    }
    this.setState({ cityInput: city });
  };

  handleFocus = () => {
    this.setState({ filteredCities: allCities });
  };

  createChangeHandler = (index) => (e) => {
    const length = [2, 2, 2, 1];
    const currentMaxLength = length[index];
    const nextRef = this.phoneRefs[index + 1];
    const prevRef = this.phoneRefs[index - 1];

    const value = e.target.value.replace(/[^0-9]/g, '');
    const shouldGoToNextRef = currentMaxLength === value.length && nextRef;
    const shouldGoToPrevRef = value.length === 0 && prevRef;

    if (shouldGoToNextRef && nextRef.current) {
      nextRef.current.focus();
    }
    if (shouldGoToPrevRef && prevRef.current) {
      prevRef.current.focus();
    }

    const newState = this.state.phoneInputState.map((phoneInput, phoneInputIndex) => 
      index === phoneInputIndex ? value.slice(0, currentMaxLength) : phoneInput
    );
    this.setState({ phoneInputState: newState });
  };

  reset = () => {
    this.setState({
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      cityInput: '',
      phoneInputState: ["", "", "", ""]
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      submitCount: prevState.submitCount + 1,
      isFirstNameValid: firstNameValidation(prevState.firstNameInput),
      isLastNameValid: lastNameValidation(prevState.lastNameInput),
      isEmailValid: emailValidation(prevState.emailInput),
      isCityValid: cityValidation(prevState.cityInput),
      isPhoneValid: phoneValidation(prevState.phoneInputState)
    }));

    const { isFirstNameValid, isLastNameValid, isCityValid, isEmailValid, isPhoneValid } = this.state;

    if (isFirstNameValid && isLastNameValid && isCityValid && isEmailValid && isPhoneValid) {
      this.reset();  
    }
  };

  render() {
    const { firstNameInput, lastNameInput, emailInput, cityInput, filteredCities, phoneInputState, isFirstNameValid, isLastNameValid, isEmailValid, isCityValid, isPhoneValid } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        <TextInput
          inputProps={{
            onChange: (e) => {
              this.currentFirstNameValidation(e.target.value);
              this.setState({ firstNameInput: e.target.value });
            },
            name: "First name",
            value: firstNameInput,
            placeholder: "Bilbo",
          }}
          labelText={"First Name"}
        />
        <ErrorMessage message={firstNameErrorMessage} show={isFirstNameValid} />

        <TextInput
          inputProps={{
            onChange: (e) => {
              this.currentLastNameValidation(e.target.value);
              this.setState({ lastNameInput: e.target.value });
            },
            name: "Last name",
            value: lastNameInput,
            placeholder: "Baggins",
          }}
          labelText={"Last Name"}
        />
        <ErrorMessage message={lastNameErrorMessage} show={isLastNameValid} />

        <TextInput
          inputProps={{
            onChange: (e) => {
              this.currentEmailValidation(e.target.value);
              this.setState({ emailInput: e.target.value });
            },
            name: "Email",
            value: emailInput,
            placeholder: "bilbo-baggins@adventurehobbits.net",
          }}
          labelText={"Email"}
        />
        <ErrorMessage message={emailErrorMessage} show={isEmailValid} />

        <TextInput
          inputProps={{
            onChange: (e) => {
              this.currentCityValidation(e.target.value);
              this.handleCityChanges(e.target.value);
              this.setState({ cityInput: e.target.value });
            },
            name: "City",
            onFocus: this.handleFocus,
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

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            {phoneInputState.map((inputValue, i) => (
              <Fragment key={i}>
                <PhoneInput
                  inputProps={{
                    onChange: (e) => {
                      this.currentPhoneValidation(e.target.value);
                      this.createChangeHandler(i)(e);
                    },
                    name: 'Phone-' + i,
                    id: "phone-input-" + i,
                    placeholder: i < 3 ? "55" : "5",
                    ref: this.phoneRefs[i],
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
  }
}

