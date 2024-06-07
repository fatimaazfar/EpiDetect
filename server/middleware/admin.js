module.exports = function (req, res, next) {
    console.log(`User Role: ${req.user.role}`); // Log the user's role
  
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  };
  