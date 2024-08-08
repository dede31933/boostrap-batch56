const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');
const { Project } = require('../models');
const sequelize = new Sequelize(config.development);

// Middleware untuk mengecek login
function checkAuth(req, res, next) {
  if (req.session.isLogin) {
    next();
  } else {
    req.flash("danger", "kamu harus login dulu");
    res.redirect("/login");
  }
}

async function home(req, res) {
  try {
    const projectsFromDB = await sequelize.query('SELECT * FROM "Projects"', { type: QueryTypes.SELECT });
    projectsFromDB.forEach(project => {
      project.technologies = JSON.parse(project.technologies);
    });
    console.log('Projects fetched from DB:', projectsFromDB);
    res.render('index', { projects: projectsFromDB, isLogin: req.session.isLogin, user: req.session.user });
  } catch (error) {
    console.error('Error when fetching projects:', error);
    res.status(500).send('Failed to fetch projects');
  }
}

function getaddmyProject(req, res) {
  if (!req.session.user) {
    req.flash("danger", "You need to login first.");
    return res.redirect("/login");
  }
  res.render("addmyProject", { isLogin: req.session.isLogin, user: req.session.user });
}

async function postaddmyProject(req, res) {
  const { inputProject, Datestart, Datetime, image, description, technologies } = req.body;

  if (!req.session.user) {
    req.flash("danger", "You need to login first.");
    return res.redirect("/login");
  }

  const userId = req.session.user.id;

  const newProject = {
    userId: userId,
    name: inputProject,
    start_date: Datestart,
    end_date: Datetime,
    image: image,
    descriptions: description,
    technologies: JSON.stringify(Array.isArray(technologies) ? technologies : [technologies]),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (req.file) {
    newProject.image = `/src/uploads/${req.file.filename}`;
    console.log("Image path:", newProject.image);
  }

  try {
    await Project.create(newProject);
    res.redirect('/');
  } catch (error) {
    console.error('Error when adding project:', error);
    res.status(500).send('Failed to add project');
  }
}


module.exports = { home, getaddmyProject, postaddmyProject, checkAuth };
