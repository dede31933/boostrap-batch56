const express = require('express');
const router = express.Router();
const { home, getaddmyProject, postaddmyProject } = require('../auth/home');
const { testimonial } = require('../auth/testimonial');
const { detailProject, detailProjectindex } = require('../auth/detail');
const { renderEdit, edit, deleteget, getEdit } = require('../auth/DelEd');
const { contact } = require('../auth/contact');
const { loginView, login, logout } = require('../User/login');
const { register, registerView } = require('../User/register');

// Routing
router.get("/", home);
router.get("/addmyProject", getaddmyProject);
router.post("/addmyProject", postaddmyProject);
router.get("/testimonial", testimonial);
router.get("/detailProject", detailProject);
router.get("/detailProject/:index", detailProjectindex);

router.get("/editData", getEdit);
router.get("/editData/:index", renderEdit);
router.post("/editData/:index", edit);
router.post("/deleteData/:index", deleteget);
router.get("/contact", contact);


router.get("/login", loginView);
router.post("/login", login);
router.get("/register", registerView);
router.post("/register", register);
router.get('/logout', logout);

module.exports = router;
