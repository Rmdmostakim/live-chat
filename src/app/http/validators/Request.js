/*
* Request data validation
*/
const Request = (error, res) => {
    // Check if the error is a validation error for required fields
    if (error.name === "ValidationError") {
      const errorArray = Object.entries(error.errors).map(([field, error]) => ({
        [field]: error.message,
      }));
      res.status(422).json(errorArray);
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = `This ${field} already taken`;
      const errorArray = [{ [field]: message }];
      res.status(422).json(errorArray);
    } else {
      res.status(500).json("server error");
    }
  };
  
  module.exports = Request;