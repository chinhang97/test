const express =require('express');
const apiRouter =require('./routes');
const dotenv = require("dotenv");
dotenv.config();

const app =express();
const port =process.env.PORT || '3000';

app.use(express.json());
app.use('/api/product',apiRouter);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
} )