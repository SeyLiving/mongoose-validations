const { exists } = require("./user.model");
const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// generated token
const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    "740ff4139d78f5b58d31a703996b1ab72d9a038fa20b3f7da05ec619cec8ee77",
    {
      expiresIn: "1h",
    }
  );
  return {
    token,
    user,
  };
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // checking if email already exists
  const emailExits = await User.findOne({ email });
  if (emailExits) {
    return res
      .status(400)
      .json({ Error: "Cannot register with this email. Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ ...req.body, password: hashedPassword });

  // replacing token
  const token = generateToken(user);

  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // replacing token
  const token = generateToken(user);

  res.status(200).json({ token });
};
