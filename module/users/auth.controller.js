const { exists } = require("./user.model");
const User = require("./user.model");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // checking if email already exists
  const emailExits = await User.findOne({ email });
  if (emailExits) {
    return res
      .status(400)
      .json({ Error: "Cannot register with this email. Email already in use" });
  }

  const user = await User.create({ ...req.body });

  res.status(201).json({ user });
};
