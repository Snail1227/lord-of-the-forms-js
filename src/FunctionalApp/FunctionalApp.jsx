import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { useState } from 'react';

export const FunctionalApp = () => {
  const [user, setUser] = useState(null)

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation 
        userData={user} 
      />
      <FunctionalForm  
        onSubmitData={userData => {
          setUser({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            city: userData.city,
            phone: userData.phoneNumber
          })
        }}
      />
    </>
  );
};
