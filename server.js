const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pagesRouter = require('./controllers/pages');
const mongoose = require('mongoose');
const session = require('express-session');
const user = require('./models/user');

require("dotenv").config({
  path: path.join(__dirname, "../.env")
 });
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', pagesRouter);

app.use(session({
  secret: user.accessToken,
  resave: true,
  savaUninitialized: true
}))

const connBlogDB = mongoose.connect('mongodb://localhost:27017/BlogDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(3000, () => {
            console.log('MongoDB connected. Express server is running')
    });
})

const Post = require('./models/post')(connBlogDB);
const Event = require('./models/event')(connBlogDB);
const User = require('./models/user')(connBlogDB);
const Category = require('./models/category')(connBlogDB);
const Tag = require('./models/tag')(connBlogDB);

/*//Gives error for jsonwebtoken
//Base server file
//const express = require('express');
//const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
//const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/route.js');
 
require("dotenv").config({
 path: path.join(__dirname, "../.env")
});
 
//const app = express();
 
const PORT = process.env.PORT || 3000;
 
mongoose
 .connect('mongodb://localhost:27017/rbac')
 .then(() => {
  console.log('Connected to the Database successfully');
 });
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(userId); next(); 
 } else { 
  next(); 
 } 
});
 
app.use('/', routes); app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})
*/