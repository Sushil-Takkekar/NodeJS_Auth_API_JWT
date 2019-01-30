const mongoose = require('mongoose');

const db_url_local = 'mongodb://localhost:27017/NodeJS_Auth_API_JWT';
const db_url_cloud = 'mongodb://localhost:27017/NodeJS_Auth_API_JWT';

mongoose.connect(db_url_local, { useNewUrlParser: true },(err)=>{
    if(err)
        console.log('MongoDb connection failed !');
    else
        console.log('MongoDb connection Successful..');
});