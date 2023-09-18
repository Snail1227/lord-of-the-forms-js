import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { useState } from 'react';

export const FunctionalApp = () => {

  // const [formData, setFormData] = useState({
  //   firstName: 'Garri',
  //   lastName: 'Doe',
  //   email: 'john.doe@example.com',
  //   // ... any other necessary data ...
  // });

  const formData = (d) => {
    const firstName = d['First Name'];
    console.log(firstName);
  }

  


  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation 
        userData={formData} 
      />
      <FunctionalForm  
        formData={formData}
      />
    </>
  );
};
