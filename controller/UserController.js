import User from "../models/UserModel.js"
import FormBeli from "../models/FormPembelianModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//Initial endpoint
export const initialEnpoint = async (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Connected to Ticket-StandUp Backend!!",
    })
}


//Get User Data by id   
export const getUserById = async(req, res) =>{
    try{
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

//Buat tambah data user
export const Register = async(req, res) =>{
    try{
        const { email, password, nama, alamat, notelp, username } = req.body;
        const encryptPassword = await bcrypt.hash(password, 5);
        await User.create({
            email: email,
            password: encryptPassword,
            nama: nama,
            alamat: alamat,
            username: username,
            notelp: notelp,
        });
        res.status(201).json({msg:"Register Berhasil"});
    } catch(error){
        console.log(error.message);
    }
}

//Login Handler
export const loginhandler= async(req, res)=>{
    try{
        const{email, password} = req.body;
        const user = await User.findOne({
            where : {
                email: email
            }
        });

        if(user){
            const userPayload = {
                id: user.id,
                nama: user.nama,
                email: user.email,
                notelp: user.notelp,
                alamat: user.alamat,
                username: user.username
            };
            const decryptPassword = await bcrypt.compare(password, user.password);
            if(decryptPassword){
                const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn : '1d' 
                });
                const authToken = jwt.sign(userPayload, process.env.AUTH_TOKEN_SECRET, {
                    expiresIn : '1d' 
                });
                await User.update({auth_token:authToken},{
                    where:{
                        id:user.id
                    }
                });
                res.cookie('authToken', authToken,{
                    httpOnly : false,
                    sameSite : 'none',
                    maxAge  : 24*60*60*1000,
                    secure:true
                });

                res.status(200).json({
                    status: "Succes",
                    message: "Login Berhasil",
                    user,
                    accessToken 
                });
            }
            else{
                res.status(400).json({
                    status: "Failed",
                    message: "Paassword atau email salah",
                  
                });
            }
        } else{
            res.status(400).json({
                status: "Failed",
                message: "Paassword atau email salah",
            });
        }
    } catch(error){
        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message
        })
    }
}

export const logout = async(req,res)=>{
    const authToken = req.cookies.authToken;
    if(!authToken) return res.sendStatus(204);
    const user = await User.findOne({
        where:{
            auth_token:authToken
        }
    });
    if(!user.auth_token) return res.sendStatus(204);
    const userId = user.id;
    await User.update({auth_token:null},{
        where:{
            id:userId
        }
    });
    res.clearCookie('authToken');
    return res.sendStatus(200);
}

//Update user
export const updateUser = async(req, res) =>{
    try{

        const {  email, password, nama, alamat, notelp, username  } = req.body;
        let updatedData = {
            email,
            nama,   
            alamat,
            notelp,
            username: username
        };

        if (password) {
            const encryptPassword = await bcrypt.hash(password, 5);
            updatedData.password = encryptPassword;
        }

        const result = await User.update(updatedData, {
            where: {
                id: req.params.id
            }
        });

        // Periksa apakah ada baris yang terpengaruh (diupdate)
        if (result[0] === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found or no changes applied',
                updatedData: updatedData,
                result
            });
        }


        
        res.status(200).json({msg:"User Updated"});
    } catch(error){
        console.log(error.message);
    }
}

//Delete user
export const deleteUser = async(req, res) =>{
    try{
        await FormBeli.destroy({
            where:{
                id_user:req.params.id
            }
        });
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"User Deleted"});
    } catch(error){
        console.log(error.message);
    }
}

