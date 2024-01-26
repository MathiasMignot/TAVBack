const auth = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      if (bearerToken) {
        req.session.token = bearerToken;
        return next();
      }
      return res.status(403).json({ message: 'Forbidden access 1' });
    }
    return res.status(403).json({ message: 'Forbidden access 2' });
  };
  
  module.exports = auth;