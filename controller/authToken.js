import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const authToken = async(req, res)=>{
    try{
        const authToken = req.cookies.authToken;
        if(!authToken) return res.sendStatus(401);
        console.log("sudah lewat 401 di authcontroller")
        const user = await User.findOne({
            where:{
                auth_token:authToken
            }
        });
        if(!user.auth_token) return res.sendStatus(403);
        else jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET,(err, decoded)=>{
            if(err) return res.sendStatus(403);
            console.log("sudah lewat 403 ke dua di controller")
            const userPayload = {
                id: user.id,
                nama: user.nama,
                email: user.email,
                notelp: user.notelp,
                alamat: user.alamat,
                username: user.username
            };
            const accessToken = jwt.sign(userPayload,   process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '30s'
            });
            res.json({accessToken});
        });
    }catch(error){
        console.log(error);
    }
}