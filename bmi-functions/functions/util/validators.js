const isEmpty = (string) => {
  if (string === "") return true;
  else return false;
};

const isNotValid = (string) => {
  if (!parseFloat(string) > 0) return true;
  else return false;
};

exports.validateData = (data) => {
  let errors = {};

  if (isEmpty(data.age)) {
    errors.age = "Must not be empty";
  } else {
    if (isNotValid(data.age)) {
      errors.age = "Must be a number bigger than 0";
    }
  }
  if (isEmpty(data.weight)) {
    errors.weight = "Must not be empty";
  } else {
    if (isNotValid(data.weight)) {
      errors.weight = "Must be a number bigger than 0";
    }
  }
  if (isEmpty(data.height)) {
    errors.height = "Must not be empty";
  } else {
    if (isNotValid(data.height)) {
      errors.height = "Must be a number bigger than 0";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
