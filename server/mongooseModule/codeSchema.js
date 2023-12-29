const { Schema, model} = require('mongoose');

const codeSaveSchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    }
});

const codeMod = model("codeSave", codeSaveSchema);
module.exports = {codeMod};

