import { allCities } from "./all-cities";

export function firstNameValidation(firstName) {
  return firstName.length < 2;
}

export function lastNameValidation(lastName) {
  return lastName.length < 2;
}

export function emailValidation(emailAddress) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !regex.test(emailAddress);
}

export function cityValidation(city) {
  if (allCities.includes(city)) {
    return false;
  } else {
    return true;
  }
}

export function phoneValidation(phone) {
  
  if (phone.join('').length === 7) {
    return false
  } else {
    return true
  }

}