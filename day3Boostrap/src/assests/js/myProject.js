let Dataproject = [];

function submitBlog(event) {
  event.preventDefault();

  let inputProject = document.getElementById("inputProject").value;
  let inputDate = document.getElementById("inputDate").value;
  let inputDatetime = document.getElementById("inputDatetime").value;
  let inputDescription = document.getElementById("inputDescription").value;
  let inputImage = document.getElementById("inputImage").files[0];
  let NodeJs = document.getElementById("NodeJs").checked;
  let ReactJs = document.getElementById("ReactJs").checked;
  let NextJs = document.getElementById("NextJs").checked;
  let TypeScript = document.getElementById("TypeScript").checked;

  if (!inputProject || !inputDate || !inputDatetime || !inputDescription || !inputImage) {
    alert("Tolong isikan semua field yang diperlukan");
    return;
  }

  let imageURL = URL.createObjectURL(inputImage);

  const MyProject = {
    project: inputProject,
    date: inputDate,
    datetime: inputDatetime,
    description: inputDescription,
    nodeJs: NodeJs,
    reactJs: ReactJs,
    nextJs: NextJs,
    typeScript: TypeScript,
    image: imageURL,
  };

  Dataproject.push(MyProject);
  renderMyProject();
}

function getDistanceTime(postAt) {
  const postDate = new Date(postAt);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate - postDate);

  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const monthsDiff = Math.ceil(daysDiff / 30);
  const yearsDiff = Math.floor(monthsDiff / 12);

  if (yearsDiff > 0) {
    return `${yearsDiff} years ago`;
  } else if (monthsDiff > 0) {
    return `${monthsDiff} months ago`;
  } else {
    return `${daysDiff} days ago`;
  }
}

function renderMyProject() {
  const content = document.getElementById("content");
  content.innerHTML = "";
  Dataproject.forEach((project) => {
    content.innerHTML += `
      <div class="col-md-3 mb-3">
         <div class="card">
    <img src="${project.image}" class="card-img-top" alt="Project Image">
    <div class="card-body">
      <h5 class="card-title"><a href="./detailProject.html">${project.project} - ${new Date(project.date).getFullYear()}</a></h5>
      <p class="card-text">Duration: ${getDistanceTime(project.date)}</p>
      <p class="card-text">${project.description}</p>
            <div class="d-flex justify-content-between mb-2">
              <div class="icon-container">
                ${project.nodeJs ? '<i class="fab fa-node-js custom-size "></i>' : ""}
                ${project.reactJs ? '<i class="fab fa-react custom-size "></i>' : ""}
                ${project.nextJs ? '<i class="fab fa-js custom-size "></i>' : ""}
                ${project.typeScript ? `
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="35" viewBox="0 0 50 50">
                    <path d="M45,4H5C4.447,4,4,4.448,4,5v40c0,0.552,0.447,1,1,1h40c0.553,0,1-0.448,1-1V5C46,4.448,45.553,4,45,4z M29,26.445h-5V42h-4V26.445h-5V23h14V26.445z M30.121,41.112v-4.158c0,0,2.271,1.712,4.996,1.712c2.725,0,2.62-1.782,2.62-2.026c0-2.586-7.721-2.586-7.721-8.315c0-7.791,11.25-4.717,11.25-4.717l-0.14,3.704c0,0-1.887-1.258-4.018-1.258s-2.9,1.013-2.9,2.096c0,2.795,7.791,2.516,7.791,8.141C42,44.955,30.121,41.112,30.121,41.112z"></path>
                  </svg>
                ` : ""}
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button class="btn btn-outline-primary w-100 mr-2">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-outline-danger w-100">
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

