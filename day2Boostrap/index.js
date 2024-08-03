const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const RandomRouter = require('./Router/appRandom')
const handlebarsMoment = require('./Router/momenHbs')

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
app.use("/src/assests/css", express.static(path.join(__dirname, "src/assests/css")));
app.use("/src/assests/image", express.static(path.join(__dirname, "src/assests/image")));
app.use("/src/assests/js", express.static(path.join(__dirname, "src/assests/js")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', RandomRouter)


app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`)
})