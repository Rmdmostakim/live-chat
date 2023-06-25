const middleware = (req, res, next) => {
    const headers = req.headers;
    // write your business logic here
    console.log('auth middleware');
    next();
};
  
module.exports = middleware;