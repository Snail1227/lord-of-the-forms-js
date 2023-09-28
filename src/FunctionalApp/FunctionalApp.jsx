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
        onSubmitData={({ phoneNumber, ...restOfData }) => {
          setUser({
            ...restOfData,
            phone: phoneNumber
          })
        }}
      />
    </>
  );
};
