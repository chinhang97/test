const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

const pool =mysql.createPool({
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database: process.env.DB_DBNAME,
    multipleStatements:true,
    connectionLimit :20
});

pool.getConnection(function(err,conn){
    if (err){
        console.log("Database failed to connect")
    }
    else{
        console.log("Database is connected")
    }
})

let productdb ={};

productdb.all=()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM productlist',(err,results)=>{
            if (err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

productdb.list=(query)=>{
    return new Promise((resolve,reject)=>{
        
        var sql ="SELECT product as products from productlist WHERE "
        var category =query.category;
        
        
        if (Array.isArray(category)){
        for (var i =0; i<category.length;i++){
            sql += "category = \""+category[i]+"\"";
            (i==category.length -1)?sql += "":sql += " AND ";
        }
        }
        else{
            sql += "category = \""+category+"\"";
        }
        
        //console.log(sql)
        pool.query(sql,(err,results)=>{
            if (err){
                return reject(err);
            }

            var finalresult = results.reduce(function(r,e){
                return Object.keys(e).forEach(function(k){
                    if(!r[k]) r[k] =[].concat(e[k])
                    else r[k] =r[k].concat(e[k])
                }),r
            },{})
            
            return resolve(finalresult);
            
        })
    });
};

productdb.add=(value)=>{
    return new Promise((resolve,reject)=>{
        var sql="INSERT INTO productlist (product,category) values ";
        var finalsql ="";
        var product =value.product;
        var category= value.category;

        if (Array.isArray(product)){
            for (var i =0; i<product.length;i++){
                if (Array.isArray(category)){
                    for (var j=0;j<category.length;j++){
                        finalsql += sql+ "(\""+product[i]+"\",\""+category[j]+"\");";
                    }
                }      
                else{
                    finalsql = sql+ "(\""+product[i]+"\",\""+category+"\");";
                }
                
            }
        }
        else{
            if (Array.isArray(category)){
                for (var j=0;j<category.length;j++){
                    console.log(category.length);
                    finalsql += sql+ "(\""+product+"\",\""+category[j]+"\");";
                }
            }      
            else{
                finalsql = sql+ "(\""+product+"\",\""+category+"\");";
            }
            
        }

        //console.log(finalsql);        
        pool.query(finalsql,product,(err,results)=>{
            if (err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

productdb.delete=(value)=>{
    return new Promise((resolve,reject)=>{
        var sql = "DELETE FROM productlist WHERE ";
        var product =value.product;
        
        
        if (Array.isArray(product)){
        for (var i =0; i<product.length;i++){
            sql += "product = \""+product[i]+"\"";
            (i==product.length -1)?sql += "":sql += " OR ";
        }
        }
        else{
            sql += "product = \""+product+"\"";
        }

        pool.query(sql,(err,results)=>{
            if (err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

module.exports = productdb;