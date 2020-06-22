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
        
        var sql ="SELECT product as products from productlist join product_category using (productID) join categorylist using (categoryID) WHERE "
        var category =query.category;
        
        
        if (Array.isArray(category)){
        for (var i =0; i<category.length;i++){
            sql += "category = \""+category[i]+"\"";
            (i==category.length -1)?sql += "":sql += " OR ";
        }
        }
        else{
            sql += "category = \""+category+"\"";
        }
        sql+= "group by productID";

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



productdb.check_product_exist=(value)=>{
    return new Promise((resolve,reject)=>{
        var sql1="SELECT IF(EXISTS(SELECT productID from productlist WHERE product = ?),1,0) AS result "
        
        
        var product =value;

        pool.query(sql1,product,(err,results)=>{
            if (err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

productdb.check_category_exist=(value)=>{
    return new Promise((resolve,reject)=>{
        
        var sql="SELECT IF(EXISTS(SELECT categoryID from categorylist WHERE category = ?),1,0) AS result "
        
        var category= value;


        pool.query(sql,category,(err,results)=>{
            if (err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

productdb.check_product_ID=(value)=>{
    return new Promise((resolve,reject)=>{
        var sql= "SELECT productID from productlist WHERE product = ?"
        
        var product =value;


        pool.query(sql,product,(err,results)=>{
            if (err){
                return reject(err);
            }

            return resolve(results);
        })
    });
};

productdb.check_category_ID=(value)=>{
    return new Promise((resolve,reject)=>{
        var sql= "SELECT categoryID from categorylist WHERE category =? "
        
        var category= value;


        pool.query(sql,category,(err,results)=>{
            if (err){
                return reject(err);
            }
            
            return resolve(results);
        })
    });
};
productdb.add_product=(value)=>{
    return new Promise((resolve,reject)=>{
        var sql="INSERT INTO productlist (product) values (?)";

        var product =value;

                
        pool.query(sql,product,(err,results)=>{
            if (err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

productdb.add_category=(value)=>{
    return new Promise((resolve,reject)=>{

        var sql="INSERT INTO categorylist (category) values (?)";

        var category= value;    
        pool.query(sql,category,(err,results)=>{
            if (err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

productdb.add_product_category=(productID,categoryID)=>{
    return new Promise((resolve,reject)=>{
        var sql="INSERT INTO product_category (productID,categoryID) values (?,?) "
            
        pool.query(sql,[productID,categoryID],(err,results)=>{
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