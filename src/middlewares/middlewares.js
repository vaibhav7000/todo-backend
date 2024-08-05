const jwt  = require('jsonwebtoken');

function userCredentialsMid(req,res,next){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(403).json({
            error: "user does not provide necessay credentials"
        })
        return ;
    }

    next();
};

function userCredMid_Register(req,res,next){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !name || !password){
        res.status(403).json({
            error: "user does not provide necessay credentials"
        })
        return;
    }
    next();
}

function tokenVerifyMid(req,res,next){
    const token = req.body.token;

    if(!token){
        res.status(200).json({
            action:false,
            message:'Token not present naviagte to register',
        })
        return;
    }
    jwt.verify(token,'1234',(err,decodeData) => {
        if(err){
            res.status(200).json({
                action:false,
                message:'Token Invalid naviagte to the login page'
            })
            return ;
        }
        req.body.userId = decodeData.userId
        next();
    })
}

module.exports = {
    userCredentialsMid,
    userCredMid_Register,
    tokenVerifyMid
}