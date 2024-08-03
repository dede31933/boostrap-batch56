const { DataArr } = require('../Data/DataArr')
function home(req, res) {
  res.render("index", { DataArr })
}
function getaddmyProject(req, res) {
  res.render("addmyProject")
}
function postaddmyProject(req, res) {
  const { inputProject, Date, Datetime, description, image, technologies } = req.body;
  const newProject = {
    inputProject: inputProject,
    Date: Date,
    Datetime: Datetime,
    description: description,
    image: image,
    technologies: Array.isArray(technologies) ? technologies : [technologies]
  };
  console.log(newProject);
  DataArr.push(newProject);
  res.redirect("/")
}


module.exports = { home, getaddmyProject, postaddmyProject }