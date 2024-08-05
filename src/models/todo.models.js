const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title : {
    type:String,
    required:true,
    unique : true,
  },
  isComplete : {
    type : Boolean,
    default:false,
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true,
  },
}, {timestamps : true});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;