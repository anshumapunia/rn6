const verifyrole=(roles)=>{

    return(req,res,next)=>{
        if(roles.includes(req.body.role)){
           return next()
        }else{
            return res.status(403).send('Forbidden');
        }
    }
   
}

module.exports={verifyrole}