const mongoose = require("mongoose");
const User = mongoose.model("User")

const checkPassword = async function(email,password){
  let match = false
  const user = await User.findOne({ email })
  if (user) {
    match = await user.comparePassword(password, user.password)
  }
  return {
    match,
    user
  }
}

export {
  checkPassword
}