import bcrypt from "bcryptjs"
import {db} from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"

export const register = async(req, res) => {

    const {email, password, name} = req.body

    try{
        existingUser = await db.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return res.status(400).json({
                error:"User already exists"
            })

        } 

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await db.User.Create({
            data : {
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })

        const token = jwt.sign(
            {id:newUser.id}, process.env.JWT_SECRET, {
                expiresIn:"7d"
            }
        
        )

      
    } catch(error) {
            
    }
  }


export const login = async(req, res) =>{


}

export const logout = async(req, res) => {

}

export const check = async(req,res) => {
    
}