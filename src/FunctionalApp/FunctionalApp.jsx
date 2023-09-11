import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
// import { useState } from 'react';

export const FunctionalApp = () => {
  

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation 
        userData={null} 
      />
      <FunctionalForm  
      />
    </>
  );
};
