const express = require('express');
const router = express.Router();
const { home, getaddmyProject, postaddmyProject, checkAuth } = require('../auth/home');
const { testimonial } = require('../auth/testimonial');
const { detailProject, detailProjectindex } = require('../auth/detail');
const { renderEdit, edit, deleteget, getEdit } = require('../auth/DelEd');
const { contact } = require('../auth/contact');
const { loginView, login, logout } = require('../User/login');
const { register, registerView } = require('../User/register');

// Routing
router.get("/", home);
router.get("/addmyProject", getaddmyProject, checkAuth);
router.post("/addmyProject", postaddmyProject, checkAuth);
router.get("/testimonial", testimonial);
router.get("/detailProject", detailProject);
router.get("/detailProject/:index", detailProjectindex);

router.get("/editData", getEdit);
router.get("/editData/:id", renderEdit, checkAuth);
router.post("/editData/:id", edit, checkAuth);
router.post("/deleteData/:id", deleteget, checkAuth);
router.get("/contact", contact);

router.get("/login", loginView);
router.post("/login", login);
router.get("/register", registerView);
router.post("/register", register);
router.get('/logout', logout);

module.exports = router;
