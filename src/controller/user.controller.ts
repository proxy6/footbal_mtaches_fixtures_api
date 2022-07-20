import {Request, Response} from 'express'
import User from '../model/user.model'
import { GenerateSignature, HashPassword, validatePassword } from '../util/auth'
export const signUp = async (req: Request, res: Response)=>{
        let {name, email, password, role} = req.body
        //generate hash password
        try{
                const userPassword = await HashPassword(password)
                //create users here
                const user = new User({
                name,
                email,
                password: userPassword,
                role: role || 'user',
                })
                await user.save()
                const token = await GenerateSignature({email: user.email, _id: user._id, role: user.role})
                user.password = ''
                res.status(201).json({message: "User Created", token: token, data: user})
                }catch(e){
                  res.status(500).json({message: "Error Creating User", data:e})
                }
}
export const login = async(req: Request, res: Response)=>{
        let {email, password} = req.body
        //find user in db
        try{
        let user = await User.findOne({email:email})
            if(!user) res.status(404).json("User Not Found")
            console.log(user)
            let savedPassword = user?.password
            let validatePass = await validatePassword(password, savedPassword)
            console.log(validatePass)
            if(validatePass == false) res.status(401).json({message: "Email or Password Incorrect"})
            const token = await GenerateSignature({data:{email:user?.email, _id: user?._id, role: user?.role}})
            res.status(201).json({data: user, token})
        }catch(e){
            res.status(500).json({data:e})
        }
        //compare password
}

