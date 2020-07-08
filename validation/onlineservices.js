const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOnlineServicesInput(data) {
  let errors = {};

  data.dpate = !isEmpty(data.date) ? data.date : "";
  data.descrition = !isEmpty(data.description) ? data.description : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  data.onlinecategory = !isEmpty(data.onlinecategory)
    ? data.onlinecategory
    : "";
  data.cost = !isEmpty(data.cost) ? data.cost : "";

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity field is required";
  }
  if (Validator.isEmpty(data.onlinecategory)) {
    errors.onlinecategory = "Category field is required";
  }
  if (!Validator.isNumeric(data.quantity, { no_symbols: false })) {
    errors.quantity = "Enter a Numeric number";
  }
  if (!Validator.isNumeric(data.cost, { no_symbols: false })) {
    errors.cost = "Enter a Numeric number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
