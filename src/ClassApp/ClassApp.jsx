import  { Component } from 'react';
import { ProfileInformation } from "../ProfileInformation";
import ClassForm from './ClassForm';
import { capitalize, formatPhoneNumber } from "../utils/transformations";

export class ClassApp extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      transformedFirstName: '',
      transformedLastName: '',
      emailInput: '',
      cityInput: '',
      phoneInput: '',
    };
  }

  firstNameInput = (firstName) => {
    this.setState({ transformedFirstName: capitalize(firstName) });
  }

  lastNameInput = (lastName) => {
    this.setState({ transformedLastName: capitalize(lastName) });
  }

  email = (e) => {
    this.setState({ emailInput: e });
  }

  city = (c) => {
    this.setState({ cityInput: c });
  }

  phoneNumber = (phone) => {
    this.setState({ phoneInput: formatPhoneNumber(phone) });
  }

  render() {
    const userData = {
      firstName: this.state.transformedFirstName,
      lastName: this.state.transformedLastName,
      email: this.state.emailInput,
      city: this.state.cityInput,
      phone: this.state.phoneInput
    };

    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={userData} />
        <ClassForm  
          firstName={this.firstNameInput}
          lastName={this.lastNameInput}
          email={this.email}
          city={this.city}
          phoneNumber={this.phoneNumber}
        />
      </>
    );
  }
}
