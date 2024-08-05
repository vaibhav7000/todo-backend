const express = require('express');
require('dotenv').config();
const bycrypt = require('bcryptjs');
const user = require('../models/user.models');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/', async (req, res) => {
  const userData = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  console.log('jkdfbjksfhbsrbgoirbghoi');
  const isExist = await user.findOne({email});
  console.log(isExist,'wbgouwb');


  if (isExist) {
    res.status(200).json({
      action:false,
      message: 'user already exist',
    })
    return;
  }

  try {
    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(password, salt);

    const newUser = new user({...userData,password:hashPassword});
    const response = await newUser.save();
    const token = await jwt.sign({userId:newUser._id},process.env.JWT_SECRET);

    res.status(200).json({
      messge:'New user is credited',
      response:{...userData,password:hashPassword},
      action:true,
      token
    });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error',action:false });
  }
});

module.exports = router;