export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(!rules) {
        return true;
    }

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;                                   
    }                                           //value.trim() to remove whitespaces

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
}