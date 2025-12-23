//this middleware is used to check whether is user is login or not so that we can display his/her name or login button on home page 

const {validatetoken}= require("../services/auth");

function checkforauthcookie(cookiename){
    return(req,res,next)=>{
        const tokencookievalue = req.cookies[cookiename];
        if(!tokencookievalue){
            return next();
        }

        try{
            const userpayload = validatetoken(tokencookievalue);
            req.user = userpayload;
            // expose user to templates as locals.user
            res.locals.user = userpayload;

        }catch(error){}
        next();

    }
}

module.exports={

    checkforauthcookie,

}