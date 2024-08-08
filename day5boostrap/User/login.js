const { User } = require('../models');
const bcrypt = require('bcrypt');

function loginView(req, res) {
  res.render('login');
}
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (!user) {
      req.flash("danger", "Login Failed: Email is wrong!");
      return res.redirect("/login");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        req.flash("danger", "Login Failed: Internal Server Error");
        return res.redirect("/login");
      }

      if (!result) {
        req.flash("danger", "Login Failed: Password is wrong!");
        return res.redirect("/login");
      }

      req.flash("success", "Login Success!");
      req.session.isLogin = true;
      req.session.user = {
        name: user.name,
        email: user.email,
      };

      res.redirect("/");
    });
  } catch (error) {
    console.error("Error when finding user:", error);
    req.flash("danger", "Login Failed: Internal Server Error");
    res.redirect("/login");
  }
}
function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("login");
  });
}

module.exports = { loginView, login, logout };