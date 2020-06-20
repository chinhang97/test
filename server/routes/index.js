const express = require('express')
const db =require('../db');

const router =express.Router();

router.get('/', async (req,res,next)=>{
    
    try{
        res.sendStatus(200);
            
    }
    catch(e){
        console.log(e);
        res.status(409).send({
            message:"Unable to access.: " +e
        });
    }


});

router.post('/add', async (req,res,next)=>{
   
    try{
        res.status(200);
        let results =await db.add(req.body);
        res.json(results);
            
    }
    catch(e){
        console.log(e);
        res.status(409).send({
            message:"Unable to register products.:" +e
        });
    }


});

router.get('/list', async (req,res,next)=>{
   
    try{
        res.status(200);
        let results =await db.list(req.query);
        res.json(results);
            
    }
    catch(e){
        console.log(e);
        res.status(409).send({
            message:"Unable to list products.: "+e
        });
    }


});

router.post('/delete', async (req,res,next)=>{
   
    try{
        res.status(200);
        let results =await db.delete(req.body);
        res.json(results);
            
    }
    catch(e){
        console.log(e);
        res.status(409).send({
            message:"Unable to delete product."+ e
        });
    }


});

module.exports =router;