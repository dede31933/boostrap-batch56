function contact(req, res) {
  res.render("contact", { isLogin: req.session.isLogin, user: req.session.user })
}

module.exports = { contact }