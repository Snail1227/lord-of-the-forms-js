export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isFirstNameValid(firstName) {
  return firstName && firstName.length >= 2;
}
