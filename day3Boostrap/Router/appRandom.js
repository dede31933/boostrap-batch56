const express = require('express');
const router = express.Router();
const { home, getaddmyProject, postaddmyProject } = require('../auth/home');
const { testimonial } = require('../auth/testimonial');
const { detailProject, detailProjectindex } = require('../auth/detail');
const { renderEdit, edit, deleteget, getEdit } = require('../auth/DelEd');
const { contact } = require('../auth/contact');

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
router.post("/deleteData/:index", deleteget); // Ensure this route is correct
router.get("/contact", contact);

module.exports = router;
