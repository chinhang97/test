const express = require('express')
const db =require('../db');
const productdb = require('../db');

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
        //var pro_ID =await db.check_product_ID(req.body);
        //var cat_ID =await db.check_category_ID(req.body);
        //let pro_exist= await db.check_product_exist(req.body);
        //let cat_exist = await db.check_category_exist(req.body);
        var result ="";
        var cat_ID ="";
        //

        var product =req.body.product;
        var category =req.body.category;



        if (Array.isArray(product)){
            for (var i =0; i<product.length;i++){
                if (JSON.parse(JSON.stringify(await db.check_product_exist(product[i])))[0].result){
                    console.log(product[i]+" product have already registered. Please use other endpoint to change/add the category")
                }
                else{
                    console.log( product[i]+" does not exist. Proceed")
                    await db.add_product(product[i]);
                    if (Array.isArray(category)){
                        for (var j =0; j<category.length;j++){
                            if (JSON.parse(JSON.stringify(await db.check_category_exist(category[j])))[0].result ){
                                console.log( category[j]+" exist. Proceed to register product" +product[i] +"under category "+category[j]);
                            }
                            else{
                                console.log(category[j]+" does not exist. Creating new category...");
                                await db.add_category(category[j]);
                                console.log(category[j]+" category created. Proceed to register product" +product[i] +"under category "+category[j]);
                                
                            }
                            let cat_ID= JSON.parse(JSON.stringify(await db.check_category_ID(category[j])))[0].categoryID;
                            let pro_ID= JSON.parse(JSON.stringify(await db.check_product_ID (product[i])))[0].productID;
                            result= await db.add_product_category(pro_ID,cat_ID);
                        }
                        }
                    else{
                        if (JSON.parse(JSON.stringify(await db.check_category_exist(category)))[0].result){
                            console.log(category+" exist.Proceed to register product" +product[i] +"under category "+category)
                        }
                        else{
                            console.log(category+" does not exist. Creating new category...");
                            await db.add_category(category);
                            console.log(category[j]+" category created. Proceed to register product" +product[i] +"under category "+category);
                               
                        }
                        let cat_ID= JSON.parse(JSON.stringify(await db.check_category_ID(category)))[0].categoryID;
                        let pro_ID= JSON.parse(JSON.stringify(await db.check_product_ID (product[i])))[0].productID;
                        result= await db.add_product_category(pro_ID,cat_ID);
                    }
                }
            }
            }
        else{
            if (JSON.parse(JSON.stringify(await db.check_product_exist(product)))[0].result){
                console.log(product+" product have already registered. Please use other endpoint to change/add the category")
            }
            else{
                console.log(product+"product does not exist. Proceed")
                await db.add_product(product);
                if (Array.isArray(category)){
                    for (var j =0; j<category.length;j++){
                        if (JSON.parse(JSON.stringify(await db.check_category_exist(category[j])))[0].result ){
                            console.log( category[j]+" exist. Proceed to register product" +product +"under category "+category[j]);
                           
                        }
                        else{
                            console.log(category[j]+" does not exist. Creating new category...");
                            await db.add_category(category[j]);
                            console.log(category[j]+" category created. Proceed to register product" +product +"under category "+category[j]);
                            
                        }
                        let cat_ID= JSON.parse(JSON.stringify(await db.check_category_ID(category[j])))[0].categoryID;
                        let pro_ID= JSON.parse(JSON.stringify(await db.check_product_ID (product)))[0].productID;
                        result= await db.add_product_category(pro_ID,cat_ID);
                    }
                    }
                else{
                    if (JSON.parse(JSON.stringify(await db.check_category_exist(category)))[0].result){
                        console.log(category+" exist.Proceed to register product" +product +"under category "+category)
                      
                    }
                    else{
                        console.log(category+" does not exist. Creating new category...");
                        await db.add_category(category);
                        console.log(category+" category created. Proceed to register product" +product +"under category "+category);
                           
                        
                    }
                    let cat_ID= JSON.parse(JSON.stringify(await db.check_category_ID(category)))[0].categoryID;
                    let pro_ID= JSON.parse(JSON.stringify(await db.check_product_ID (product)))[0].productID;
                    result= await db.add_product_category(pro_ID,cat_ID);
                }
                
            }
        }


        //let results =await db.add(req.body);
        
        //console.log(cat_ID.length);
        
        res.json(result);
            
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