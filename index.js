// imports the express npm module
const express = require("express");
// imports the cors npm module
const cors = require("cors");
const { Sequelize, Model, DataTypes } = require('sequelize');

// Creates a new instance of express for our app
const app = express();

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Define User model
class User extends Model {}
User.init({
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    site: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

const users = [
    { name: "John Doe",  isAdmin: false, site: "HBG" },
    { name: "Jane Smith", isAdmin: false, site: "HBG" },
    { name: "Mike Johnson", isAdmin: false, site: "HBG" },
    { name: "Sarah Williams", isAdmin: false, site: "HBG" },
    { name: "Bruce Wayne", isBatman: true, site: "Bat cave" },
    { name: "David Brown", isAdmin: false, site: "HBG" }
];


//AUTH0


const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const jwtCheck = auth({
  audience: "http://localhost:8080",
  issuerBaseURL: "https://dev-dhtcsec1v610ng10.eu.auth0.com/",
  tokenSigningAlg: "RS256",

});

//END AUTH0

app.get('/api/seeds', async (req, res) => {
    users.forEach(u => User.create(u));
    res.json(users);
});


// .use is middleware - something that occurs between the request and response cycle.
app.use(cors());
// We will be using JSON objects to communcate with our backend, no HTML pages.
app.use(express.json());
// This will serve the React build when we deploy our app
app.use(express.static("react-frontend/dist"));

// AUTH0 Enforce on all endpoints
app.use(jwtCheck);

// This route will return 'Hello Ikea!' when you go to localhost:8080/ in the browser
app.get("/", (req, res) => {
    res.json({ data: 'Hello Ikea!' });
});

// Get all users
app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Get one user based on id
app.get("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

// Create new user
app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});

// Update user
app.put("/api/users/:id", async (req, res) => {
    const { name, isAdmin, site } = req.body;

    const user = await User.findByPk(req.params.id);
    await user.update({ name, isAdmin, site });
    await user.save();
    res.json(user);
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({data: `The user with id of ${req.params.id} is removed.`});
});



// This tells the express application to listen for requests on port 8080
const port = process.env.PORT || 8080;
server =  app.listen(port, async () => {
    console.log(`Server started at ${port}`)
});
module.exports = {app, server}

