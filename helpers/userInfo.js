const User = require("../models/User");

module.exports = async function (userObject) {
  try {
    const user = await User.findById(userObject.id).select("-password");
    return user;
  } catch {
    return null;
  }
};
