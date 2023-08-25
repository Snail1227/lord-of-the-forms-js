import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
// import { useState } from 'react';

export const FunctionalApp = () => {
  
  const handleData = ((a) => {
    console.log(a);
  });
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation 
        userData={null} 
      />
      <FunctionalForm  
        handleData={handleData}
      // isValid={isValid}
      />
    </>
  );
};
