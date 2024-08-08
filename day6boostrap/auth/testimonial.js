function testimonial(req, res) {
  res.render("testimonial", { isLogin: req.session.isLogin, user: req.session.user })
}

module.exports = { testimonial }