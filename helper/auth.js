const auth = {};

auth.validateUser = (req, res, next) => {
  // Todo :- Validate User By access token
  //         Decode account id and set in body (for now passed in body)
  next();
};

module.exports = auth;
