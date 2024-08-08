const { User } = require('../models');
const bcrypt = require('bcrypt');

function registerView(req, res) {
  res.render("register");
}

async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      req.flash("danger", "Register Failed: Email Already Used!");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    req.flash("success", "Register Success!");
    res.redirect("/login");
  } catch (error) {
    console.error("Error when registering user:", error);
    req.flash("danger", "Register Failed: Internal Server Error");
    res.redirect("/register");
  }
}

module.exports = { register, registerView };
