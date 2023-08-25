export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function firstNameValidation(fistName){
  if (fistName.length < 2) {
    return true;
  } else {
    return false;
  }
}

export function lastNameValidation(lastName){
  if (lastName.length < 2) {
    return true;
  } else {
    return false;
  }
}

