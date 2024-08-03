const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);

async function home(req, res) {
  try {
    // Ambil semua proyek dari database
    const projectsFromDB = await sequelize.query('SELECT * FROM "Projects"', { type: QueryTypes.SELECT });
    // Parsing JSON string technologies back to array
    projectsFromDB.forEach(project => {
      project.technologies = JSON.parse(project.technologies);
    });

    res.render('index', { projects: projectsFromDB });
  } catch (error) {
    console.error('Error when fetching projects:', error);
    res.status(500).send('Failed to fetch projects');
  }
}

function getaddmyProject(req, res) {
  res.render("addmyProject");
}

async function postaddmyProject(req, res) {
  const { inputProject, Datestart, Datetime, description, technologies } = req.body;
  console.log('Received data:', { inputProject, Datestart, Datetime, description, technologies });

  const newProject = {
    name: inputProject,
    start_date: Datestart,
    end_date: Datetime,
    descriptions: description,
    technologies: JSON.stringify(Array.isArray(technologies) ? technologies : [technologies]),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  console.log('Project object for SQL:', newProject);

  try {
    await sequelize.query(
      `INSERT INTO "Projects" (name, start_date, end_date, descriptions, technologies, "createdAt", "updatedAt") VALUES (:name, :start_date, :end_date, :descriptions, :technologies, :createdAt, :updatedAt)`,
      {
        replacements: newProject,
        type: QueryTypes.INSERT
      }
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error when adding project:', error);
    res.status(500).send('Failed to add project');
  }
}

module.exports = { home, getaddmyProject, postaddmyProject };
