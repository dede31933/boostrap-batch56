const DataArr = [];
function home(req, res) {
  res.render("index", { DataArr })
}
function getaddmyProject(req, res) {
  res.render("addmyProject")
}
function postaddmyProject(req, res) {
  const { inputProject, Date, Datetime, description, image, technologies } = req.body;
  const newProject = {
    inputProject,
    Date,
    Datetime,
    description,
    image,
    technologies: Array.isArray(technologies) ? technologies : [technologies]
  };
  console.log(newProject);
  DataArr.push(newProject);
  res.redirect("/")
}
function detailProject(req, res) {
  res.render("detailProject")
}

module.exports = { home, getaddmyProject, detailProject, postaddmyProject }