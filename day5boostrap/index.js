const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
require('./Router/momenHbs');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/src/assests/css", express.static(path.join(__dirname, "src/assests/css")));
app.use("/src/assests/image", express.static(path.join(__dirname, "src/assests/image")));
app.use("/src/assests/js", express.static(path.join(__dirname, "src/assests/js")));
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use('/', require('./Router/appRandom'));

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
