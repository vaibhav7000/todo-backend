const express = require('express');
const router = express.Router();
const todo = require('../models/todo.models');

router.post('/addtodo' , async(req,res) => {
  const userId = req.body.userId;
  
  try {
    const todoData = req.body;
    todoData.user = userId;

    const newTodo = new todo(todoData);
    const response = await newTodo.save();

    const allTodo = await todo.find({user : userId});
    res.status(200).json({
      action:true,
      allTodo
    });
    return ;
  } catch (error) {
    res.status(500).json({
      action:false,
      error:'Internal Server error'
    });
  }

});

router.post('/alltodo' , async(req,res) => {
  const userId = req.body.userId;
  try{
    const allTodo = await todo.find({user : userId});
    res.status(200).json({
      action:true,
      allTodo
    })
  } catch(error){
    res.status(500).json({
      message:'Internal server error'
    });
  }
});

router.put('/updatetodo' , async(req,res) => {
  try {
    const todoId = req.body.todoId;
    const userId = req.body.userId;
    const title = req.body.title;

    await todo.findByIdAndUpdate(todoId,{title,isComplete:false,user:userId},{
      new:true,
      runValidators:true,
    });

    const allTodo = await todo.find({user : userId});

    res.status(200).json({
      allTodo
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:'Internal server error'
    });
  }
});

router.put('/deletetodo' , async(req,res) => {
  try {
    const todoId = req.body.todoId;
    const userId = req.body.userId;
    await todo.findByIdAndDelete(todoId);

    const allTodo = await todo.find({user : userId});
    res.status(200).json({
      allTodo
    });
  } catch (error) {
    return res.status(500).json({
      message:'Internal server error'
    });
  }
});

module.exports = router;