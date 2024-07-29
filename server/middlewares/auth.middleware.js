const authMiddelware = (roles = []) => {
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      const token = req.cookies.access_token;
  
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log(req.user)
  
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }
  
        next();
      } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
      }
    };
  };