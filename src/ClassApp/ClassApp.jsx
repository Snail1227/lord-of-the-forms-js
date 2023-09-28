import  { Component } from 'react';
import { ProfileInformation } from "../ProfileInformation";
import ClassForm from './ClassForm';

export class ClassApp extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      user: null
    };
  }


  render() {

    const { user } = this.state
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation 
          userData={user} 
        />
        <ClassForm  
          onSubmitData={({  phoneNumber, ...restOfData }) => {
            this.setState({
              user: {
                ...restOfData,
                phone: phoneNumber
              }
            })
          }}
        />
      </>
    );
  }
}
