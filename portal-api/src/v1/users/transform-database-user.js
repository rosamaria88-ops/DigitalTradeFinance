const transformDatabaseUser = (user) => {
  const userToReturn = { ...user };
  if (userToReturn.signInToken) {
    const { hashHex, saltHex } = userToReturn.signInToken;
    userToReturn.signInToken = {
      hash: Buffer.from(hashHex, 'hex'),
      salt: Buffer.from(saltHex, 'hex'),
    };
    delete userToReturn.signInToken.hashHex;
    delete userToReturn.signInToken.saltHex;
  }
  return userToReturn;
};

const transformDatabaseUsers = (users) => users.map(transformDatabaseUser);

module.exports = {
  transformDatabaseUser,
  transformDatabaseUsers,
};