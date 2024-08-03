const { DataArr } = require('../Data/DataArr');

function getEdit(req, res) {
  res.render('editData');
}

function renderEdit(req, res) {
  const { index } = req.params;
  const editData = DataArr[index];
  if (editData) {
    res.render('editData', { editData, editDataindex: index });
  } else {
    res.status(404).send('Project not found');
  }
}

function edit(req, res) {
  const { index } = req.params;
  const { inputProject, Date, Datetime, description, image, technologies } = req.body;
  DataArr[index] = {
    inputProject: inputProject,
    Date: Date,
    Datetime: Datetime,
    description: description,
    image: image,
    technologies: Array.isArray(technologies) ? technologies : [technologies]
  };
  res.redirect("/"); // Redirect ke halaman utama
}

function deleteget(req, res) {
  const { index } = req.params;
  DataArr.splice(index, 1);
  res.redirect("/");
}

module.exports = { renderEdit, edit, deleteget, getEdit };
