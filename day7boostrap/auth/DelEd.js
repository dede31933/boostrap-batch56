const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);
const { Project } = require('../models');

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

function getEdit(req, res) {
  res.render('editData', { isLogin: req.session.isLogin, user: req.session.user });
}

async function renderEdit(req, res) {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (project) {
      project.technologies = JSON.parse(project.technologies);
      project.start_date = formatDate(project.start_date);
      project.end_date = formatDate(project.end_date);

      if (project.userId !== req.session.user.id) {
        req.flash("danger", "You are not authorized to edit this project.");
        return res.redirect("/");
      }
      res.render('editData', { project, isLogin: req.session.isLogin, user: req.session.user });
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    console.error('Error when fetching projects:', error);
    res.status(500).send('anda harus login dulu yaa');
  }
}

async function edit(req, res) {
  const { id } = req.params;
  const { inputProject, Datestart, Datetime, description, technologies } = req.body;

  console.log("Edit Request Body:", req.body);
  console.log("Project ID:", id);

  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }

    // Cek apakah user yang login adalah pemilik proyek
    if (project.userId !== req.session.user.id) {
      req.flash("danger", "You are not authorized to update this project.");
      return res.redirect("/");
    }

    let imagePath = project.image;

    // Jika ada file baru yang diunggah
    if (req.file) {
      imagePath = `/src/uploads/${req.file.filename}`;
    }

    // Update proyek
    await Project.update({
      name: inputProject,
      start_date: Datestart,
      end_date: Datetime,
      image: imagePath,
      descriptions: description,
      technologies: JSON.stringify(Array.isArray(technologies) ? technologies : [technologies]),
      updatedAt: new Date()
    }, {
      where: { id }
    });

    res.redirect('/'); // Redirect ke halaman index setelah pembaruan
  } catch (error) {
    console.error('Error when updating project:', error);
    res.status(500).send('Failed to update project');
  }
}

async function deleteget(req, res) {
  const { id } = req.params;
  console.log('Delete Project ID:', id)
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    if (project.userId !== req.session.user.id) {
      req.flash("danger", "You are not authorized to delete this project.");
      return res.redirect("/");
    }
    await Project.destroy({
      where: { id }
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error when deleting project:', error);
    res.status(500).send('anda harus login');
  }
}

module.exports = { renderEdit, edit, deleteget, getEdit };