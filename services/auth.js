const JWT = require("jsonwebtoken");




// JWT is mainly used for authentication — that is, to verify who the user is without having to check the database every time.

// Instead of logging in on every request, here's what happens:

// ✅ A user logs in once (e.g. enters email and password).

// ✅ If the login is successful, your server creates a JWT and sends it back to the client.

// ✅ The client (like a browser) stores the token (in localStorage, cookie, etc.).

// ✅ On future requests, the client sends this token along (usually in a header).

// ✅ The server verifies the token to identify the user — without needing a password or DB query again.

const secret = "$uperman@123";//this will be used in jwt.io

function createtokenforuser(user){
    const payload = {// payload is the data you want to include inside the JWT.It contains information that might be useful on the client-side or during verification of the token on future requests.
        _id:user._id,
        email: user.email,
        profileimage : user.profileimage,
        role:user.role,

        

    }
    const token = JWT.sign(payload,secret);//jwt.sign it creates a JWT by encoding the payload and signing it with a secret key.
    return token;

}


function validatetoken(token){
    const payload = JWT.verify(token,secret);//If the token is valid and not expired, JWT.verify() returns the decoded payload (an object containing the data from the original JWT.sign() call).

    return payload;

}

module.exports={
    createtokenforuser,
    validatetoken,

}