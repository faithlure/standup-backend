import Show from "../models/ShowModel.js";

export const getShow = async(req, res) =>{
    try{
        const response = await Show.findAll();
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

export const getShowById = async(req, res) =>{
    try{
        const response = await Show.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

export const createShow = async(req, res) =>{
    try{
        await Show.create(req.body);
        res.status(201).json({msg:"Show Created"});
    } catch(error){
        console.log(error.message);
    }
}

export const updateShow = async(req, res) =>{
    try{
        await Show.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Show Updated"});
    } catch(error){
        console.log(error.message);
    }
}

export const deleteShow = async(req, res) =>{
    try{
        await Show.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Show Deleted"});
    } catch(error){
        console.log(error.message);
    }
}