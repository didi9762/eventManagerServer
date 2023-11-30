import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'eventmanager', (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // Attach the decoded information to the request object
    req.userName = decoded.userName;

    next();
  });
}
