const Joi = require('joi');

module.exports = {
  signupValidation: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/[!@#$%^&*(),.?":{}|<>]/).required(),
  }),
};