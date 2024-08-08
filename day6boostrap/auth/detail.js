const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);

function detailProject(req, res) {
  res.render("detailProject", { isLogin: req.session.isLogin, user: req.session.user })
}
async function detailProjectindex(req, res) {
  const { index } = req.params;
  try {
    // Ambil semua proyek dari database
    const projectsFromDB = await sequelize.query('SELECT * FROM "Projects"', { type: QueryTypes.SELECT });
    projectsFromDB.forEach(project => {
      project.technologies = JSON.parse(project.technologies);
    });

    const project = projectsFromDB[index];
    if (project) {
      res.render('detailProject', { project });
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    console.error('Error when fetching projects:', error);
    res.status(500).send('Failed to fetch projects');
  }
};
module.exports = { detailProject, detailProjectindex }