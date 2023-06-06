const router = require('express').Router();

router.post('/logout', (req, res) => {
  // Perform any necessary logout operations, such as invalidating tokens or session identifiers

  // For example, if you are using token-based authentication and storing the token in a cookie or header,
  // you can clear the token from the cookie or header:
  res.clearCookie('authToken'); // Clear the authentication token cookie

  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
