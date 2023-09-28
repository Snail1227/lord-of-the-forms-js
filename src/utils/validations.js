import { lowerCaseCities } from "./all-cities";

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
  return !(lowerCaseCities.includes(city.toLowerCase()));
}

export function phoneValidation(phone) {
  return !(phone.join('').length === 7);
}