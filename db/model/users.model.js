const db = require('../mongodb');
const Users = require('../schemas/users.schema');

// get user data
function getUser(email, pass, callback) {
    Users.find({email: email, pass: pass},(err, data) => {
        if(err){
            console.log('Error in fetching db data !');    
            return callback(err, null);
        }else {
            //console.log(data);
            return callback(null, data);
        }
    });
}

// insert new user data
function addUser(fname, lname, age, pass, email,callback) {
    var user = new Users({
        fname,
        lname,
        age,
        pass,
        email
    });
    var status = '';
    user.save((err, data) => {
        if(err) {
            //console.log('Error');
            return callback(err,null);
        }else {
            //console.log(data);
            return callback(null,data);
        }
    });
    return status;
}

module.exports = {
    getUser,
    addUser
}

/**
//addUser('hey','hey',23,'123','hey');
var user = new Users({
    fname: 'hey',
    lname: 'hey',
    age: 21,
    pass: '123',
    email: 'hey'
});
user.save((err, data) => {
    if(err) {
        console.log('Error');
    }else {
        console.log(data);
    }
});
*/