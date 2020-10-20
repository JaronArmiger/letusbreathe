const generatePassword = require('password-generator');

exports.getPasswords = (req, res, next) => {
  const count = 5;

  const passwords = Array.from(Array(count).keys()).map(i => 
    generatePassword(12, false)
  );

  res.json(passwords);
  console.log(`Sent ${count} passwords`);
};