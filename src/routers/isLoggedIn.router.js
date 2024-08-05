const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

router.post('/' , async(req,res) => {
  const token = req.body.token;
  console.log('present',token)

  if (!token) {
    res.status(403).json({
      action:false,
      errMessage:'Token does not present'
    })
    return;
  }

  jwt.verify(token,'1234',(err,decode) => {
    if(err){
      res.status(200).json({
        action:false,
        errMessage:'Invalid token been sent'
      })
      return;
    }
    res.status(200).json({
      action:true,
      decode
    })

  });
  
});

module.exports = router;