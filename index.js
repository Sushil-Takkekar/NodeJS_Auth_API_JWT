const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// sample user
const user = {
    id : 101,
    fname : "John",
    lname : "Cena",
    email : "johnc123@gmial.com"
}

// sample route to test the app
app.get('/api', (req, res) => {
    res.send('Welcome to auth api !');
});

// login page
app.post('/login', (req, res) => {
    // verify username and pass

    // generate jwt token
    jwt.sign(user, 'secret', (err, data) => {
        if(err) {
            res.send('Unable to generate token !');
        }
        res.json({ token: data });
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