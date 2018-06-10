require('dotenv').config();

const express = require('express'),
    bodyParser = require('body-parser'),
    ctrl = require('./usersCtrl.js');


const app = express();

const {
    SERVER_PORT
} = process.env;

app.use(bodyParser.json());

//GET all - or by req.query
app.get('/api/users', ctrl.getUsers);

//GET by id - req.params
app.get('/api/users/:id', ctrl.getUserById);

//GET by admin
app.get('/api/admins', ctrl.getAdmins);

//GET nonAdmins
app.get('/api/nonadmins', ctrl.getNonAdmins);

//GET users by userType - req.params
app.get('/api/user_type/:usertype', ctrl.getUsersByType);

//PUT find user with req.params, pass new content with req.body
app.put('/api/users/:id', ctrl.updateUser)

//POST create user
app.post('/api/users', ctrl.createUser);

//DELETE user by id
app.delete('/api/users/:id', ctrl.deleteUser);



app.listen(SERVER_PORT, () => {
    console.log(`Listeny McListenerson on port: ${SERVER_PORT}`);
})