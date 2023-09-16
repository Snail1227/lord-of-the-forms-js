export function emailValidation(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  console.log(!!emailAddress.match(regex));
  return !!emailAddress.match(regex);
}

export function firstNameValidation(firstName) {
  return firstName.length < 2;
}

export function lastNameValidation(lastName) {
  return lastName.length < 2;
}