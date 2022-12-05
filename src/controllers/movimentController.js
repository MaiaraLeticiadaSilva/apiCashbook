const movimentoModel = require('../models/movimentModel');

exports.post=async(data,idUser)=>{
    return await movimentoModel.post(data, idUser);
}
exports.get=async()=>{
    return await movimentoModel.get();   
}

exports.getIOFilter=async(year,month)=>{
    return await movimentoModel.IOFilter(year,month);  
}

exports.put=async(req,res)=>{
    return await movimentoModel.put(data, idUser);
}
exports.delete=async(id)=>{
    return await movimentoModel.delete(id,idUser);
}