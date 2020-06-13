const isEmpty = string => string.trim() === '';

const isIsoDate = string => {
  return /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/.test(
    string
  );
};

const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regEx);
};

const isLocation = string => {
  const regEx = /\[-?\d+\.?\d*, *-?\d+\.?\d*, *(-?\d+\.?\d*|null)\]/g;
  if (!regEx.test(string)) {
    console.log('bad format');
    return false;
  }
  const array = JSON.parse(string);
  return (
    parseFloat(array[0]) >= -90 &&
    parseFloat(array[0]) <= 90 &&
    parseFloat(array[1]) >= -180 &&
    parseFloat(array[1]) <= 180
  );
};

exports.validateNewTreeData = data => {
  const { description, plantedAt, location, image } = data;
  // FIXME: w10 simplify data verification process
  let errors = {};
  // image
  if (!(image && description && plantedAt && location)) {
    errors.general = 'Not all data fields are present';
  } else {
    if (isEmpty(description)) errors.description = 'Must not be empty';
    if (isEmpty(plantedAt)) errors.plantedAt = 'Must not be empty';
    else if (!isIsoDate(plantedAt))
      errors.plantedAt = 'Not a valid date format';
    if (!isLocation(location)) errors.location = 'Not a valid location format';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

exports.validateUpdateTreeData = data => {
  const { description, plantedAt, location } = data;
  const errors = {};

  // description
  if (!(description && plantedAt && location)) {
    errors.general = 'Not all data fields are present';
  } else {
    if (isEmpty(description)) errors.description = 'Must not be empty';
    if (isEmpty(plantedAt)) errors.plantedAt = 'Must not be empty';
    else if (!isIsoDate(plantedAt))
      errors.plantedAt = 'Not a valid date format';
    if (!isLocation(location)) errors.location = 'Not a vlid location format';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

exports.validateSignupData = data => {
  const { email, password, confirmPassword, handle, accessCode } = data;
  const errors = {};

  if (!(email && password && confirmPassword && handle && accessCode)) {
    errors.general = 'Not all data fields are present';
  } else {
    if (isEmpty(email)) errors.email = 'Must not be empty';
    else if (!isEmail(email)) errors.email = 'Must be a valid email address';
    if (isEmpty(password)) errors.password = 'Must not be empty';
    if (password !== confirmPassword)
      errors.confirmPassword = 'Password must match';
    if (isEmpty(handle)) errors.handle = 'Must not be empty';
    if (isEmpty(accessCode)) errors.accessCode = 'Must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

exports.validateLoginData = data => {
  const { email, password } = data;
  let errors = {};

  if (isEmpty(email)) errors.email = 'Must not be empty';
  else if (!isEmail(email)) errors.email = 'Must be a valid email address';

  if (isEmpty(password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
