const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const usersModel = require('./db/model/users.model')

const app = express();

app.use(cors());
app.use(bodyParser.json());

// sample route to test the app
app.get('/api', (req, res) => {
    res.send('Welcome to auth api !');
});

// login page
app.post('/login', (req, res) => {
    // verify username and pass
    usersModel.getUser(req.body.username, req.body.pass, (error, user)=> {
        if(error) {
            res.send({ error: error, err_msg: 'Error in accessing db !' });
        }else {
            //console.log(user[0]);
            if(user.length > 0) {
                jwt.sign(user[0].toJSON(), 'secret', { expiresIn: '20m' }, (err, data) => {
                    if(err) {
                        console.log('Error=> '+err);
                        res.send({ error: err, err_msg: 'Unable to generate token !' });
                    }else {
                        //console.log('Token=> '+data);
                        res.json({ token: data });
                    }
                });
            }else {
                console.log({ error: 'Login error', err_msg: 'User not found !' });
                res.send({ error: 'Login error', err_msg: 'User not found !' });
            }
            
        }
    });

    // sample user
    // const user = {
    //     id : 102,
    //     fname : "John",
    //     lname : "Cena",
    //     age : 21,
    //     email : req.body.username
    // }
    // generate jwt token
    
});

// registration page
app.post('/reguser', (req, res) => {
    // add user to db
    usersModel.addUser(req.body.fname,req.body.lname,req.body.age,req.body.pass,req.body.email, (err,data)=> {
        if(err) {
            //console.log(err);
            res.json({ status: "failed" });
        }else {
            //console.log('=> '+data);
            res.json({ status: "success" });
        }
    });
    
});

// show profile page
app.post('/profile', getHeaderToken, (req, res) => {
    // verify the token
    jwt.verify(req.token, 'secret', (err, data) => {
        if(err) {
            res.status(403).send({
                error : err,
                err_msg: 'Un-authorized request. Permission denied !'
            });
        }else {
            res.send(data);
        }
    });
});
// get the token from req header
function getHeaderToken(req, res, next) {
    // get full header
    const auth_header = req.headers['authorization'];
    // check if authorization header is present or not
    if(typeof auth_header === 'undefined') {
        res.status(403).send('Un-authorized request !');
    } else {
        const bearer_header = auth_header.split(' ');
        // check the word 'bearer' in header. Ex. Authorization: Bearer <token>
        const bearer = bearer_header[0];
        const token = bearer_header[1];
        if(bearer != 'Bearer') {
            res.status(403).send('Un-authorized request. Invalid header !');
        } else {
            req.token = token;
            next();
        }
    }
}

// start web server
app.listen(3001, () => {
    console.log('Server started on port 3001');
})