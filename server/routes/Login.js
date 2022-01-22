const router =require('express').Router()
const User = require("../models/User")
const  {body,validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const path = require('path')
const dotenv = require('dotenv')


dotenv.config({
    path:path.join(__dirname,"../",".env")
})

router.get("/",(req,res) => {
    res.sendStatus(404)
})

const login = (email,password)=>{
    const promise = new Promise(async (resolve,reject)=>{
        try {
            const user = await User.findOne({email:email})
            if (user) {
                const validate = bcrypt.compareSync(password.toString(),user.password)
                if(validate){   
                    const token = jwt.sign({
                        name:user.name,
                        email:user.email
                    },process.env.JWT_KEY)

                    resolve({ok:true,token})
                }else{
                    reject({ok:false,msg:"Password Incorrect"})
                }
            } else {
                reject({ok:false,msg:"User not found"})
            }
        } catch (err) {
            console.log(err);
            reject({ok:false,msg:"An error occured",error:err})
        }
    })
    return promise
}
router.post("/",
    body("email").isEmail(),
    body("password").isLength({min:5}),
    async (req,res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                res.json({ok:false,error:errors.array()})
            }else{
                const {email,password} = req.body
                const data = await login(email,password)
                res.json(data)
            }  
        } catch (err) {
            res.json(err)
        }
    }
)
module.exports = router