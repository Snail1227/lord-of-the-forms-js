export const capitalize = (name) => {
    return (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
}

export const formatPhoneNumber = (phone) => {
    return phone.join('-');
}