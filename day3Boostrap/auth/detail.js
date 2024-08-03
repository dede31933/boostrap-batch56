const { DataArr } = require('../Data/DataArr')

function detailProject(req, res) {
  res.render("detailProject")
}
function detailProjectindex(req, res) {
  const { index } = req.params;
  const detailProject = DataArr[index]
  if (detailProject) {
    res.render('detailProject', { detailProject });
  } else {
    res.status(404).send('Project not found');
  }
};
module.exports = { detailProject, detailProjectindex }