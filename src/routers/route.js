const express = require('express');
const userController=require("../controllers/userController");
const movimentoController=require("../controllers/movimentController");
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).send({"API":"CASHBOOK API"});
})

router.get('/user', async (req, res, next)=> {
    user= await userController.get();
    res.status(200).send(user);
});

router.post('/user/login', async (req, res, next)=> {
    user= await userController.login(req.body);
    res.status(200).send(user);
});

router.post('/user/logout', async (req, res, next)=> {
    user= await userController.login(req.headers['x-access-token']);
    res.status(200).send(user);
});

router.get('/moviments', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.get();
           resp = Object.assign({}, resp, auth);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})

router.get('/moviments/cashbalance', async (req, res, next)=>{
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser == auth.idUser){
            resp= await movimentoController.get();
            obj = {"saldo": 0, "entradas": 0, "saidas": 0};
            resp.forEach(element => {
                if (element.type == "input"){
                    obj.entradas += element.value;
                }else if (element.type == "output"){
                    obj.saidas += element.value;
                }
            });
            obj.saldo = obj.entradas - obj.saidas; 
            resp = {
                "saldo": obj.saldo.toFixed(2), 
                "saidas": obj.saidas.toFixed(2), 
                "entradas": obj.entradas.toFixed(2)
            }
        }else{ 
            resp= {"status": "null", auth}
        }
    }else{
        resp= {"status": "null", auth}
    }
    res.status(200).send(resp)
})

router.get('/moviments/io', async (req, res, next)=>{
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser == auth.idUser){
            resp= await movimentoController.get();
            resp = resp.sort((a,b) => { return a.date - b.date; })
            resp = Object.assign({}, resp);
        }else{ 
            resp= {"status": "null", auth}
        }
    }else{
        resp= {"status": "null", auth}
    }
    res.status(200).send(resp)
})

router.get('/moviments/io/:year/:month', async (req, res, next)=>{
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser == auth.idUser){
            let year = new Date().getFullYear();
            if ((req.params.year <= year) && (req.params.month <=12 && req.params.month > 0)){
                resp= await movimentoController.getIOFilter(req.params.year,req.params.month);
                resp = Object.assign({}, resp);
            }else{
                resp = {"status": "null", "message": "data incorreta"}
            }
        }else{ 
            resp= {"status": "null", auth}
        }
    }else{
        resp= {"status": "null", auth}
    }
    res.status(200).send(resp)
})

router.get('/moviments/io/:year/:month/:month:/:year', async (req, res, next)=>{
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser == auth.idUser){
            
        }else{ 
            resp= {"status": "null", auth}
        }
    }else{
        resp= {"status": "null", auth}
    }
    res.status(200).send(resp)
})

router.get('/moviments/:year/:month', async (req, res, next)=>{
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser == auth.idUser){
            let year = new Date().getFullYear();
            if ((req.params.year <= year) && (req.params.month <=12 && req.params.month > 0)){
                resp= await movimentoController.getIOFilter(req.params.year,req.params.month);
                resp = Object.assign({}, resp)
            }else{
                resp = {"status": "null", "message": "data incorreta"}
            }
        }else{ 
            resp= {"status": "null", auth}
        }
    }else{
        resp= {"status": "null", auth}
    }
    res.status(200).send(resp)
})

router.post('/mov',async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
            resp= await  movimentoController.post(req.body, req.headers.iduser);
            resp = Object.assign({}, resp, auth);
        }else{
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)   
})

router.put('/mov', async (req, res, next)=>{
    movimento=movimentoController.put(req.body, req.headers.idUser);
})

router.delete('/movimento', async (req, res, next)=>{
    movimento=movimentoController.delete(req.headers.idUser);
})

module.exports = router;
