const JWT = require("jsonwebtoken");

const secret = "$uperman@123";

function createtokenforuser(user){
    const payload = {// payload is the data you want to include inside the JWT.
        _id:user._id,
        email: user.email,
        profileimage : user.profileimage,
        role:user.role,

        

    }
    const token = JWT.sign(payload,secret);
    return token;

}


function validatetoken(token){
    const payload = JWT.verify(token,secret);

    return payload;

}

module.exports={
    createtokenforuser,
    validatetoken,

}