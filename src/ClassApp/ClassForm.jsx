import { Component } from 'react';
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./TextInput";
import { PhoneInput } from "./PhoneInput";
import { capitalize, formatPhoneNumber } from "../utils/transformations"
import { 
  firstNameValidation, 
  lastNameValidation,
  emailValidation,
  cityValidation, 
  phoneValidation } from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export default class ClassForm extends Component {

  state = {
    submitCount: 0,
    firstNameInput: '',
    lastNameInput: '',
    emailInput: '',
    cityInput: '',
    phoneInputState: ["", "", "", ""]
  };

  isFirstNameBad = () => this.state.submitCount >= 1 && firstNameValidation(this.state.firstNameInput);
  isLastNameBad = () => this.state.submitCount >= 1 && lastNameValidation(this.state.lastNameInput);
  isEmailBad = () => this.state.submitCount >= 1 && emailValidation(this.state.emailInput);
  isCityBad = () => this.state.submitCount >= 1 && cityValidation(this.state.cityInput);
  isPhoneBad = () => this.state.submitCount >= 1 && phoneValidation(this.state.phoneInputState);

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
    this.setState(prevState => ({ submitCount: prevState.submitCount + 1}));

    firstNameValidation(this.state.firstNameInput)
    lastNameValidation(this.state.lastNameInput);
    emailValidation(this.state.emailInput);
    cityValidation(this.state.cityInput);
    phoneValidation(this.state.phoneInputState);

    const isDataValid = (
      !firstNameValidation(this.state.firstNameInput) &&
      !lastNameValidation(this.state.lastNameInput) &&
      !emailValidation(this.state.emailInput) &&
      !cityValidation(this.state.cityInput) &&
      !phoneValidation(this.state.phoneInputState)
      )

    if (isDataValid) {
      this.props.onSubmitData({
        firstName: this.state.firstNameInput,
        lastName: this.state.lastNameInput,
        email: this.state.emailInput,
        city: this.state.cityInput,
        phoneNumber: formatPhoneNumber(this.state.phoneInputState)
      });
      this.setState({ submitCount: 0 });
      this.reset();  
    } 
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        <TextInput
          inputProps={{
            onChange:(e) => {
              this.setState({ firstNameInput: capitalize(e.target.value) }); 
            },
            name: "First name",
            value: this.state.firstNameInput,
            placeholder: "Bilbo",
          }}
          labelText={"First Name"}
        />
        <ErrorMessage message={firstNameErrorMessage}  show={this.isFirstNameBad()} />
        
        <TextInput
          inputProps={{
            onChange:(e) => {
              this.setState({ lastNameInput: capitalize(e.target.value) });
            },
            name: "Last name",
            value: this.state.lastNameInput,
            placeholder:"Baggins",
          }}
          labelText={"Last Name"}
        />
        <ErrorMessage message={lastNameErrorMessage} show={this.isLastNameBad()} />

        <TextInput
          inputProps={{
            onChange : (e)=> {
              this.setState({ emailInput: e.target.value });
            },
            name: "Email",
            value: this.state.emailInput,
            placeholder:"bilbo-baggins@adventurehobbits.net",
          }}
          labelText={"Email"}
        />
        <ErrorMessage message={emailErrorMessage} show={this.isEmailBad()} />

        <TextInput
          inputProps = {{
            onChange: (e) => {
              this.setState({ cityInput: e.target.value });
            },
            name: "City",
            value: this.state.cityInput,
            placeholder: 'Hobbiton',
            list: "cities",
          }}
          labelText={"City"}
        />
        <ErrorMessage message={cityErrorMessage} show={this.isCityBad()} />

        <PhoneInput
                   phoneInputState={this.state.phoneInputState}
                   setPhoneInputState={(phoneState) => this.setState({ phoneInputState: phoneState })}
                   phoneNumberErrorMessage={phoneNumberErrorMessage}
                   onChangeInputState={(newPhoneInputState) => {
                     this.setState({ phoneInputState: newPhoneInputState })
                   }}
                   isPhoneBad={this.isPhoneBad()}
                 />
         
                 <input type="submit" value="Submit" />
               </form>
             );
           }
         }
         