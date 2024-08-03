const express = require('express');
const router = express.Router();
const { home, getaddmyProject, detailProject, postaddmyProject } = require('../auth/home');
const { testimonial } = require('../auth/testimonial');
const { contact } = require('../auth/contact');
// routing
router.get("/", home);
router.get("/addmyProject", getaddmyProject);
router.post("/addmyProject", postaddmyProject)
router.get("/testimonial", testimonial);
router.get("/detailProject", detailProject);
router.get("/contact", contact);
module.exports = router