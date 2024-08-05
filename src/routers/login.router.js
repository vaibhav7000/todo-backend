const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const user = require('../models/user.models');
const router = express.Router();

router.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userPresent = await user.findOne({ email });

    if (userPresent) {
      const isPasswordCorrect = await bycrypt.compare(password, userPresent.password);

      if (isPasswordCorrect) {

        const payload = {
          userId:userPresent._id,
        };

        const token = await jwt.sign(payload, process.env.JWT_SECRET);

        res.status(200).json({
          token,
          action:true
        })
        return;
      }

      res.status(200).json({
        action:false,
        message:'Password is incorrect'
      })
      return
      
    }       
    
    res.status(200).json({ message: 'No user Found' ,action:false});

  } catch (error) {
    return res.status(500).json({ message: 'internal server error', });
  }

});

module.exports = router;

