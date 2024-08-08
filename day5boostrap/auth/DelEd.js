const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);
const { Project } = require('../models');

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

function getEdit(req, res) {
  res.render('editData');
}

async function renderEdit(req, res) {
  const { index } = req.params;
  try {
    // Ambil semua proyek dari database
    const projectsFromDB = await sequelize.query('SELECT * FROM "Projects"', { type: QueryTypes.SELECT });
    projectsFromDB.forEach(project => {
      project.technologies = JSON.parse(project.technologies);
      project.start_date = formatDate(project.start_date);
      project.end_date = formatDate(project.end_date);
    });

    const project = projectsFromDB[index];
    if (project) {
      res.render('editData', { project, projectIndex: index });
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    console.error('Error when fetching projects:', error);
    res.status(500).send('Failed to fetch projects');
  }
}

async function edit(req, res) {
  const { index } = req.params;
  const { inputProject, Datestart, Datetime, description, technologies } = req.body;

  try {
    await Project.update({
      name: inputProject,
      start_date: Datestart,
      end_date: Datetime,
      descriptions: description,
      technologies: JSON.stringify(Array.isArray(technologies) ? technologies : [technologies]),
      updatedAt: new Date()
    }, {
      where: { id: index }
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error when updating project:', error);
    res.status(500).send('Failed to update project');
  }
}

async function deleteget(req, res) {
  const { index } = req.params;
  try {


    await sequelize.query(
      `DELETE FROM "Projects" WHERE id = :id`,
      {
        replacements: { id: index },
        type: QueryTypes.DELETE
      }
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error when deleting project:', error);
    res.status(500).send('Failed to delete project');
  }
}

module.exports = { renderEdit, edit, deleteget, getEdit };
