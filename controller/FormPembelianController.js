import FormBeli from "../models/FormPembelianModel.js";
import User from"../models/UserModel.js";
import Show from"../models/ShowModel.js"

//Get all Form Pembelian User
export const getFormPembelian = async(req, res) =>{
    try{
        const response = await FormBeli.findAll({
            where:{
                id_user:req.params.id_user
                
            } ,
            include: [
                {
                    model: User,
                    attributes: ['nama', 'alamat', 'notelp']
                },
                {
                    model: Show,
                    attributes: ['judul','harga','tanggal']
                }
            ]
            
        });
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

export const getFormPembelianById = async(req, res)=>{
    try{
        const response = await FormBeli.findAll({
            where:{
                id:req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['nama', 'alamat', 'notelp']
                },
                {
                    model: Show,
                    attributes: ['judul','harga','tanggal']
                }
            ] 
        });
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
    
}

//Update data ticket
export const updateFormPembelian = async(req, res)=>{
    try{
        await FormBeli.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Ticket Updated"});
    } catch(error){
        console.log(error.message);
    }
}

//Buat data tiket baru
export const createFormPembelian = async(req, res) =>{
    try{
        await FormBeli.create(req.body);
        res.status(201).json({msg:"Tiket berhasil dibuat"});
    } catch(error){
        console.log(error.message);
    }
}

export const deleteFormPembelian = async(req, res) =>{
    try{
        await FormBeli.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"User Deleted"});
    } catch(error){
        console.log(error.message);
    }
}