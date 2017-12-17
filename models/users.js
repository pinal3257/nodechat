let mongoose = require('mongoose');

//Artical Schemas

let articleSchemas = mongoose.Schema({
   title:{
       type:String,
       required:true
   },
    author:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
});

let Article = module.exports = mongoose.model('Articles', articleSchemas);
