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
  const { inputProject, Datestart, Datetime, description, technologies } = req.body;
  console.log('Session data:', req.session);
  if (!req.session.user) {
    req.flash("danger", "You need to login first.");
    return res.redirect("/login");
  }
  const userId = req.session.user.id;
  console.log('Received data:', { inputProject, Datestart, Datetime, description, technologies });

  const newProject = {
    userId: userId,
    name: inputProject,
    start_date: Datestart,
    end_date: Datetime,
    descriptions: description,
    technologies: JSON.stringify(Array.isArray(technologies) ? technologies : [technologies]),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log('Project object for SQL:', newProject);

  try {
    await Project.create(newProject);
    res.redirect('/');
  } catch (error) {
    console.error('Error when adding project:', error);
    res.status(500).send('Failed to add project');
  }
}

module.exports = { home, getaddmyProject, postaddmyProject, checkAuth };
